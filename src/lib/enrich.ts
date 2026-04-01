import Anthropic from "@anthropic-ai/sdk";
import { db } from "@/lib/db";
import { classifyCategory, type Category } from "@/lib/categories";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface EnrichmentResult {
  description: string;
  category: Category;
  seniority: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  tools: string[];
  isRelevant: boolean;
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

  const prompt = `You are the editorial AI for Growth.Talent, a growth marketing job board. Your job is to rewrite job listings in a distinctive, high-quality format that helps candidates make fast decisions.

## Brand Voice Rules
- Direct, punchy, no corporate fluff
- Use "you" to address the candidate
- Short sentences. Short paragraphs.
- Lead with what matters: scope, impact, team, compensation
- Feature hidden information: extract tools, team size, budget, growth stage from the original description
- If salary is mentioned anywhere in the text, extract it
- Estimate salary range if not mentioned (based on title, location, seniority — be realistic for 2026 US/EU market)
- Classify the role accurately

## Your Task

Rewrite this job posting AND extract structured data. Return ONLY valid JSON.

### Original Job:
Title: ${job.title}
Company: ${job.company.name}
Location: ${job.location ?? "Not specified"}
Current salary data: ${job.salaryMin && job.salaryMax ? `${job.salaryMin}-${job.salaryMax} ${job.salaryCurrency}` : "None"}
Current category: ${job.category}
Current seniority: ${job.seniority}

Raw description (first 4000 chars):
${rawDesc.slice(0, 4000)}

### Return this exact JSON structure:
{
  "isRelevant": true/false (is this ACTUALLY a growth/marketing role? Be strict. Recruiting, HR, pure engineering, finance, design = NOT relevant),
  "oneLiner": "One punchy sentence that sells this role. Max 150 chars. Format: [Key fact] + [Impact] + [What makes it special]",
  "description": "Rewritten HTML description in Growth.Talent style. Use <h3>, <p>, <ul>, <li>, <strong>. Structure: 1) The Role (2-3 sentences, what you'll own), 2) What You'll Do (5-7 bullet points, concrete), 3) What You Bring (5-7 bullets, skills+experience), 4) The Package (salary, equity, perks — estimate if not provided), 5) About [Company] (2-3 sentences). Total 1500-2500 chars.",
  "category": "one of: growth-marketing, product-marketing, demand-generation, growth-engineering, marketing-ops, content-marketing, performance-marketing, crm-lifecycle, seo, data-analytics, brand-marketing, social-media, partnerships, head-of-growth, vp-marketing, cmo",
  "seniority": "one of: INTERN, JUNIOR, MID, SENIOR, LEAD, MANAGER, DIRECTOR, VP, C_LEVEL",
  "salaryMin": number or null (annual, in the job's local currency),
  "salaryMax": number or null,
  "salaryCurrency": "USD" or "EUR" or "BRL" or null,
  "tools": ["list", "of", "tools", "mentioned", "or", "implied"] (max 8, e.g. "Google Ads", "HubSpot", "Mixpanel")
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    // Extract JSON from response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const result: EnrichmentResult = JSON.parse(jsonMatch[0]);

    // If not relevant, reject it
    if (!result.isRelevant) {
      await db.job.update({
        where: { id: jobId },
        data: { status: "REJECTED", moderationNote: "AI enrichment: not a growth/marketing role" },
      });
      return result;
    }

    // Update the job with enriched data
    await db.job.update({
      where: { id: jobId },
      data: {
        description: result.description,
        category: result.category,
        seniority: result.seniority as "MID",
        ...(result.salaryMin && { salaryMin: result.salaryMin }),
        ...(result.salaryMax && { salaryMax: result.salaryMax }),
        ...(result.salaryCurrency && { salaryCurrency: result.salaryCurrency }),
        moderationNote: result.oneLiner,
        moderationScore: 10,
      },
    });

    return result;
  } catch (error) {
    console.error(`Enrichment failed for job ${jobId}:`, error);
    return null;
  }
}

/** Enrich all unenriched jobs (moderationScore is null or < 10) */
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
      moderationScore: null, // not yet enriched
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
