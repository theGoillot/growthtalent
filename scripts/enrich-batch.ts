/**
 * Batch enrichment script — run via: npx tsx scripts/enrich-batch.ts
 *
 * Rewrites all scraped jobs into the rich <!--rich--> JSON format.
 * Uses Sonnet 4 for quality narratives.
 *
 * Uses the Supabase Management API (no direct DB connection needed).
 */

const SUPABASE_REF = "itzwiqrxawltinfuyupw";
const SUPABASE_TOKEN = "sbp_fcb03fba5f7b4f586911aed8b199d0392f9bb0ed";
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY!;

if (!ANTHROPIC_KEY) {
  console.error("Missing ANTHROPIC_API_KEY env var");
  process.exit(1);
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string | null;
  city: string | null;
  country: string | null;
  category: string;
  seniority: string;
  remote: string;
  contractType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  companyWebsite: string | null;
  companySize: string | null;
  companyIndustry: string | null;
  desc_clean: string;
}

const RICH_PREFIX = "<!--rich-->";

async function query(sql: string) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${SUPABASE_REF}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SUPABASE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  return res.json();
}

async function enrichWithClaude(job: Job): Promise<Record<string, unknown> | null> {
  const prompt = `You are the editorial AI for Growth.Talent, a premium growth marketing job board. Your job is to transform raw scraped job descriptions into rich, structured content that helps candidates make fast decisions.

## Your Output Format
Return ONLY valid JSON matching this exact structure. No markdown wrapping.

## Brand Voice
- Direct, punchy, no corporate fluff. Sound like a founder, not an HR department.
- Address the candidate as "you"
- Be specific: real tools, real metrics, real team structure
- If info is missing from the description, make educated inferences based on company size, industry, and role level — but don't fabricate names
- Estimate salary if not provided (be realistic for 2026 market)

## The Job
Title: ${job.title}
Company: ${job.company}
Location: ${job.location ?? "Not specified"}
City: ${job.city ?? "Unknown"}
Country: ${job.country ?? "Unknown"}
Remote: ${job.remote}
Contract: ${job.contractType}
Current salary: ${job.salaryMin && job.salaryMax ? `${job.salaryMin}-${job.salaryMax} ${job.salaryCurrency}` : "None"}
Current seniority: ${job.seniority}
Current category: ${job.category}
Company website: ${job.companyWebsite ?? "Unknown"}
Company size: ${job.companySize ?? "Unknown"}
Company industry: ${job.companyIndustry ?? "Unknown"}

Raw description (first 4000 chars):
${job.desc_clean.slice(0, 4000)}

## Return this JSON:
{
  "isRelevant": true or false (is this ACTUALLY a growth/marketing role? Recruiting, HR, pure engineering, finance, design, admin = false),
  "tags": ["5-8 visual pills, e.g. B2C, Remote, $75K-$100K, SaaS, Series B, etc."],
  "challenge": "2-4 sentence narrative hook. What's the company, what's the opportunity, what makes this role interesting. Be specific and direct.",
  "objectives3m": ["4 concrete things this person would do in their first 3 months"],
  "objectives6m": ["4 concrete things this person would accomplish by 6 months"],
  "kpis": [{"metric": "Name", "description": "One sentence explaining this KPI"}],
  "tools": ["List of tools mentioned or implied, max 8"],
  "team": {
    "manager": "Who they'd report to — infer from seniority if not stated",
    "current": "Team composition — infer reasonable structure if not stated",
    "hiring": "Optional — mention if this is a new role, backfill, or team expansion"
  },
  "compensation": {
    "salary": "$XXK-$XXXK base (estimate if not provided, based on title/location/seniority)",
    "variable": "Bonus/commission info or null",
    "equity": "Equity info or null",
    "remote": "On-site/Hybrid/Remote + location details"
  },
  "benefits": ["4-6 benefits, infer standard ones for this company type if not listed"],
  "company": {
    "about": "2-3 sentences about the company. Extract from description or infer.",
    "founded": "Year if mentioned, null otherwise",
    "headcount": "Size if mentioned, null otherwise",
    "funding": "Stage/amount if mentioned, null otherwise",
    "customers": "Target market if inferable, null otherwise",
    "culture": "Culture notes if mentioned, null otherwise"
  },
  "forYouIf": ["4-5 honest criteria — what makes someone a great fit"],
  "wontWorkIf": ["3-4 honest dealbreakers — what would make someone NOT fit"],
  "interviewProcess": [{"step": "Step name", "detail": "Brief description"}],
  "category": "one of: growth-marketing, product-marketing, demand-generation, growth-engineering, marketing-ops, content-marketing, performance-marketing, crm-lifecycle, seo, data-analytics, brand-marketing, social-media, partnerships, head-of-growth, vp-marketing, cmo",
  "seniority": "one of: INTERN, JUNIOR, MID, SENIOR, LEAD, MANAGER, DIRECTOR, VP, C_LEVEL",
  "salaryMin": number or null,
  "salaryMax": number or null,
  "salaryCurrency": "USD" or "EUR" or "BRL" or null,
  "oneLiner": "One punchy sentence that sells this role. Max 140 chars."
}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`  API ${res.status}: ${errText.slice(0, 200)}`);
      return null;
    }

    const data = await res.json();
    const text = data.content?.[0]?.text ?? "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error(`  No JSON found in response`);
      return null;
    }
    return JSON.parse(match[0]);
  } catch (e) {
    console.error(`  Claude error:`, e);
    return null;
  }
}

async function main() {
  // Get all approved scraped jobs that haven't been enriched to rich format
  const jobs: Job[] = await query(`
    SELECT j.id, j.title, j.location, j.city, j.country, j.category, j.seniority,
           j.remote, j."contractType",
           j."salaryMin", j."salaryMax", j."salaryCurrency",
           c.name as company, c.website as "companyWebsite",
           c.size as "companySize", c.industry as "companyIndustry",
           REGEXP_REPLACE(j.description, E'<[^>]+>', ' ', 'g') as desc_clean
    FROM "Job" j
    JOIN "Company" c ON j."companyId" = c.id
    WHERE j.source = 'apify'
      AND j.status = 'APPROVED'
      AND (j.description IS NULL OR j.description NOT LIKE '<!--rich-->%')
    ORDER BY j."createdAt" DESC
  `);

  console.log(`\nEnriching ${jobs.length} jobs to rich format...\n`);

  let enriched = 0, rejected = 0, errors = 0;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    process.stdout.write(`[${i + 1}/${jobs.length}] ${job.title} @ ${job.company}...`);

    const result = await enrichWithClaude(job);

    if (!result) {
      errors++;
      console.log(" error");
      continue;
    }

    if (!result.isRelevant) {
      await query(`UPDATE "Job" SET status = 'REJECTED', "moderationNote" = 'AI enrichment: not a growth/marketing role' WHERE id = '${job.id}'`);
      rejected++;
      console.log(" rejected (not growth)");
      continue;
    }

    // Build the rich description JSON
    const richData = {
      tags: result.tags,
      challenge: result.challenge,
      objectives3m: result.objectives3m,
      objectives6m: result.objectives6m,
      kpis: result.kpis,
      tools: result.tools,
      team: result.team,
      compensation: result.compensation,
      benefits: result.benefits,
      company: result.company,
      forYouIf: result.forYouIf,
      wontWorkIf: result.wontWorkIf,
      interviewProcess: result.interviewProcess,
    };

    const richDesc = RICH_PREFIX + JSON.stringify(richData);

    // Escape for SQL
    const descSql = richDesc.replace(/'/g, "''");
    const oneLiner = ((result.oneLiner as string) ?? "").replace(/'/g, "''");

    const salaryMin = result.salaryMin ?? "NULL";
    const salaryMax = result.salaryMax ?? "NULL";
    const currency = result.salaryCurrency ? `'${result.salaryCurrency}'` : "NULL";

    await query(`
      UPDATE "Job" SET
        description = '${descSql}',
        category = '${result.category}',
        seniority = '${result.seniority}',
        "salaryMin" = ${salaryMin},
        "salaryMax" = ${salaryMax},
        "salaryCurrency" = ${currency},
        "moderationNote" = '${oneLiner}',
        "moderationScore" = 10
      WHERE id = '${job.id}'
    `);

    enriched++;
    const salaryStr = result.salaryMin ? `$${((result.salaryMin as number)/1000).toFixed(0)}K-$${((result.salaryMax as number)/1000).toFixed(0)}K` : "no salary";
    console.log(` ${result.category} | ${result.seniority} | ${salaryStr}`);

    // Small delay to avoid rate limits
    if (i % 10 === 9) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log(`\nDone: ${enriched} enriched, ${rejected} rejected, ${errors} errors`);
}

main().catch(console.error);
