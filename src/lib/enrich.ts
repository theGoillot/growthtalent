import Anthropic from "@anthropic-ai/sdk";
import { db } from "@/lib/db";
import type { Category } from "@/lib/categories";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const RICH_PREFIX = "<!--rich-->";

interface EnrichmentResult {
  isRelevant: boolean;
  richDescription: string;
  category: Category;
  seniority: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  oneLiner: string;
}

export async function enrichJob(jobId: string): Promise<EnrichmentResult | null> {
  const job = await db.job.findUnique({
    where: { id: jobId },
    include: { company: true },
  });

  if (!job) throw new Error(`Job not found: ${jobId}`);
  if (!process.env.ANTHROPIC_API_KEY) return null;

  const rawDesc = (job.description ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  const prompt = `You are the editorial AI for Growth.Talent, a premium growth marketing job board. Transform this raw job into rich structured JSON.

Return ONLY valid JSON. No markdown wrapping.

## Brand Voice
- Direct, punchy, no corporate fluff
- Address candidate as "you"
- Be specific: real tools, real metrics
- Estimate salary if not provided (realistic 2026 market)

## Job
Title: ${job.title}
Company: ${job.company.name}
Location: ${job.location ?? "Not specified"}
Remote: ${job.remote}
Contract: ${job.contractType}
Salary: ${job.salaryMin && job.salaryMax ? `${job.salaryMin}-${job.salaryMax} ${job.salaryCurrency}` : "None"}
Seniority: ${job.seniority}
Category: ${job.category}
Company size: ${job.company.size ?? "Unknown"}
Company industry: ${job.company.industry ?? "Unknown"}

Raw description:
${rawDesc.slice(0, 4000)}

## Return JSON:
{
  "isRelevant": true/false,
  "tags": ["5-8 visual pills"],
  "challenge": "2-4 sentence narrative hook",
  "objectives3m": ["4 concrete first 3 months items"],
  "objectives6m": ["4 concrete 6 month items"],
  "kpis": [{"metric": "Name", "description": "One sentence"}],
  "tools": ["max 8 tools"],
  "team": {"manager": "...", "current": "...", "hiring": "..."},
  "compensation": {"salary": "...", "variable": null, "equity": null, "remote": "..."},
  "benefits": ["4-6 benefits"],
  "company": {"about": "...", "founded": null, "headcount": null, "funding": null, "customers": null, "culture": null},
  "forYouIf": ["4-5 fit criteria"],
  "wontWorkIf": ["3-4 dealbreakers"],
  "interviewProcess": [{"step": "...", "detail": "..."}],
  "category": "growth-marketing|product-marketing|...",
  "seniority": "INTERN|JUNIOR|MID|SENIOR|LEAD|MANAGER|DIRECTOR|VP|C_LEVEL",
  "salaryMin": number_or_null,
  "salaryMax": number_or_null,
  "salaryCurrency": "USD"|"EUR"|"BRL"|null,
  "oneLiner": "One punchy sentence, max 140 chars"
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const result = JSON.parse(jsonMatch[0]);

    if (!result.isRelevant) {
      await db.job.update({
        where: { id: jobId },
        data: { status: "REJECTED", moderationNote: "AI enrichment: not a growth/marketing role" },
      });
      return { isRelevant: false, richDescription: "", category: job.category as Category, seniority: job.seniority, salaryMin: null, salaryMax: null, salaryCurrency: null, oneLiner: "" };
    }

    // Build rich description
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

    const richDescription = RICH_PREFIX + JSON.stringify(richData);

    await db.job.update({
      where: { id: jobId },
      data: {
        description: richDescription,
        category: result.category,
        seniority: result.seniority as "MID",
        ...(result.salaryMin && { salaryMin: result.salaryMin }),
        ...(result.salaryMax && { salaryMax: result.salaryMax }),
        ...(result.salaryCurrency && { salaryCurrency: result.salaryCurrency }),
        moderationNote: result.oneLiner,
        moderationScore: 10,
      },
    });

    return {
      isRelevant: true,
      richDescription,
      category: result.category,
      seniority: result.seniority,
      salaryMin: result.salaryMin,
      salaryMax: result.salaryMax,
      salaryCurrency: result.salaryCurrency,
      oneLiner: result.oneLiner,
    };
  } catch (error) {
    console.error(`Enrichment failed for job ${jobId}:`, error);
    return null;
  }
}

/** Enrich all unenriched jobs */
export async function enrichBatch(limit: number = 20): Promise<{
  total: number;
  enriched: number;
  rejected: number;
  errors: number;
}> {
  const jobs = await db.job.findMany({
    where: {
      source: "apify",
      status: "APPROVED",
      OR: [
        { description: null },
        { description: { not: { startsWith: RICH_PREFIX } } },
      ],
    },
    select: { id: true },
    take: limit,
  });

  let enriched = 0;
  let rejected = 0;
  let errors = 0;

  for (const job of jobs) {
    try {
      const result = await enrichJob(job.id);
      if (!result) {
        errors++;
      } else if (!result.isRelevant) {
        rejected++;
      } else {
        enriched++;
      }
    } catch {
      errors++;
    }
  }

  return { total: jobs.length, enriched, rejected, errors };
}
