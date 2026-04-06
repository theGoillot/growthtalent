/**
 * Direct DB enrichment script — uses pg directly (no Supabase Management API)
 * Run: npx tsx scripts/enrich-direct.ts
 */

import pg from "pg";

const DATABASE_URL = process.env.DATABASE_URL!;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY!;
const RICH_PREFIX = "<!--rich-->";

if (!ANTHROPIC_KEY) { console.error("Missing ANTHROPIC_API_KEY"); process.exit(1); }
if (!DATABASE_URL) { console.error("Missing DATABASE_URL"); process.exit(1); }

const pool = new pg.Pool({ connectionString: DATABASE_URL });

interface Job {
  id: string;
  title: string;
  company: string;
  location: string | null;
  remote: string;
  contracttype: string;
  seniority: string;
  category: string;
  salarymin: number | null;
  salarymax: number | null;
  salarycurrency: string | null;
  companysize: string | null;
  companyindustry: string | null;
  desc_clean: string;
}

async function enrichOne(job: Job) {
  const prompt = `You are the editorial AI for Growth.Talent, a premium growth marketing job board. Transform this raw job into rich structured JSON.

Return ONLY valid JSON. No markdown wrapping, no backticks, no explanation text.

Brand Voice: Direct, punchy, no corporate fluff. Address candidate as "you". Be specific: real tools, real metrics. Estimate salary if not provided (realistic for 2026 market).

## The Job
Title: ${job.title}
Company: ${job.company}
Location: ${job.location ?? "Not specified"}
Remote: ${job.remote} | Contract: ${job.contracttype} | Seniority: ${job.seniority}
Current salary: ${job.salarymin && job.salarymax ? `${job.salarymin}-${job.salarymax} ${job.salarycurrency}` : "None"}
Category: ${job.category}
Company size: ${job.companysize ?? "Unknown"} | Industry: ${job.companyindustry ?? "Unknown"}

Raw description (first 3500 chars):
${job.desc_clean.slice(0, 3500)}

## Return this exact JSON:
{
  "isRelevant": true,
  "tags": ["5-7 visual tag pills, e.g. B2C, Remote, $75K-$100K, SaaS"],
  "challenge": "2-3 sentence narrative hook about the company and opportunity",
  "objectives3m": ["4 concrete first 3 months objectives"],
  "objectives6m": ["4 concrete 6 month objectives"],
  "kpis": [{"metric": "Metric Name", "description": "One sentence about this KPI"}],
  "tools": ["list of tools mentioned or implied, max 8"],
  "team": {"manager": "Who they report to", "current": "Team composition", "hiring": "New role or backfill?"},
  "compensation": {"salary": "$XXK-$XXXK base", "variable": null, "equity": null, "remote": "On-site/Hybrid/Remote details"},
  "benefits": ["4-6 benefits"],
  "company": {"about": "2-3 sentences about company", "founded": null, "headcount": null, "funding": null, "customers": null, "culture": null},
  "forYouIf": ["4-5 honest fit criteria"],
  "wontWorkIf": ["3-4 honest dealbreakers"],
  "interviewProcess": [{"step": "Step name", "detail": "Brief description"}],
  "category": "growth-marketing",
  "seniority": "MID",
  "salaryMin": null,
  "salaryMax": null,
  "salaryCurrency": null,
  "oneLiner": "One punchy sentence, max 140 chars"
}

If this is NOT a growth/marketing role (recruiting, HR, engineering, finance, admin, design), return: {"isRelevant": false}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text ?? "";
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON in response");
  return JSON.parse(match[0]);
}

async function main() {
  const { rows: jobs } = await pool.query<Job>(`
    SELECT j.id, j.title, j.location, j.city, j.country, j.category, j.seniority,
           j.remote, j."contractType" as contracttype,
           j."salaryMin" as salarymin, j."salaryMax" as salarymax, j."salaryCurrency" as salarycurrency,
           c.name as company, c.website as companywebsite,
           c.size as companysize, c.industry as companyindustry,
           REGEXP_REPLACE(COALESCE(j.description, ''), E'<[^>]+>', ' ', 'g') as desc_clean
    FROM "Job" j JOIN "Company" c ON j."companyId" = c.id
    WHERE j.status = 'APPROVED'
      AND (j.description IS NULL OR j.description NOT LIKE '<!--rich-->%')
    ORDER BY j."createdAt" DESC
  `);

  console.log(`\nEnriching ${jobs.length} jobs with Haiku (~$${(jobs.length * 0.005).toFixed(2)} estimated cost)...\n`);

  let enriched = 0, rejected = 0, errors = 0;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const label = `[${i + 1}/${jobs.length}]`;
    process.stdout.write(`${label} ${job.title.substring(0, 45)} @ ${job.company.substring(0, 20)}... `);

    try {
      const r = await enrichOne(job);

      if (!r.isRelevant) {
        await pool.query(
          `UPDATE "Job" SET status = 'REJECTED', "moderationNote" = $1 WHERE id = $2`,
          ["AI: not a growth/marketing role", job.id]
        );
        rejected++;
        console.log("REJECTED");
        continue;
      }

      // Build rich description
      const richData = {
        tags: r.tags ?? [],
        challenge: r.challenge ?? "",
        objectives3m: r.objectives3m ?? [],
        objectives6m: r.objectives6m ?? [],
        kpis: r.kpis ?? [],
        tools: r.tools ?? [],
        team: r.team ?? { manager: "", current: "", hiring: "" },
        compensation: r.compensation ?? { salary: "", remote: "" },
        benefits: r.benefits ?? [],
        company: r.company ?? { about: "" },
        forYouIf: r.forYouIf ?? [],
        wontWorkIf: r.wontWorkIf ?? [],
        interviewProcess: r.interviewProcess ?? [],
      };

      const richDesc = RICH_PREFIX + JSON.stringify(richData);

      await pool.query(
        `UPDATE "Job" SET
          description = $1, category = $2, seniority = $3,
          "salaryMin" = $4, "salaryMax" = $5, "salaryCurrency" = $6,
          "moderationNote" = $7, "moderationScore" = 10
        WHERE id = $8`,
        [
          richDesc,
          r.category ?? job.category,
          r.seniority ?? job.seniority,
          r.salaryMin ?? null,
          r.salaryMax ?? null,
          r.salaryCurrency ?? null,
          r.oneLiner ?? "",
          job.id,
        ]
      );

      enriched++;
      const sal = r.salaryMin
        ? `${(r.salaryMin / 1000).toFixed(0)}K-${(r.salaryMax / 1000).toFixed(0)}K`
        : "no sal";
      console.log(`${r.category} | ${r.seniority} | ${sal}`);
    } catch (e: unknown) {
      errors++;
      console.log(`ERR: ${e instanceof Error ? e.message : "unknown"}`);
    }

    // Pause every 10 jobs to avoid rate limits
    if (i % 10 === 9) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.log(`\nDone: ${enriched} enriched, ${rejected} rejected, ${errors} errors`);
  console.log(`Estimated cost: ~$${(enriched * 0.005).toFixed(2)}`);

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  pool.end();
  process.exit(1);
});
