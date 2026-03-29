import Anthropic from "@anthropic-ai/sdk";
import { db } from "@/lib/db";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface ModerationResult {
  score: number; // 1-10
  flags: string[];
  reasoning: string;
}

export async function moderateJob(jobId: string): Promise<ModerationResult> {
  const job = await db.job.findUnique({
    where: { id: jobId },
    include: { company: true },
  });

  if (!job) throw new Error(`Job not found: ${jobId}`);

  // Skip moderation if no API key (dev mode)
  if (!process.env.ANTHROPIC_API_KEY) {
    await db.job.update({
      where: { id: jobId },
      data: { status: "APPROVED", moderationScore: 10, moderationNote: "Auto-approved (no API key)" },
    });
    return { score: 10, flags: [], reasoning: "Auto-approved (dev mode)" };
  }

  const prompt = `You are a job posting moderator for Growth.Talent, a growth marketing job board.

Review this job posting and return a JSON response with:
- score: 1-10 (10 = perfect legitimate job, 1 = obvious spam/scam)
- flags: array of red flag strings (empty if none)
- reasoning: one sentence explaining your assessment

Red flags to check for:
- Spam or scam indicators (too-good-to-be-true salary, vague description, suspicious company)
- Adult content, gambling, crypto scams
- Missing critical info (no real job described)
- Fake company or suspicious domain
- MLM, pyramid schemes
- Not actually a growth/marketing role

Job posting:
Title: ${job.title}
Company: ${job.company.name} (${job.company.website ?? "no website"})
Description: ${(job.description ?? "No description provided").slice(0, 2000)}
Location: ${job.location ?? "Not specified"}
Salary: ${job.salaryMin && job.salaryMax ? `${job.salaryMin}-${job.salaryMax} ${job.salaryCurrency}` : "Not specified"}
Source: ${job.source ?? "unknown"}

Respond ONLY with valid JSON, no other text.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const result: ModerationResult = JSON.parse(text);

    // Determine status based on score
    let status: "APPROVED" | "FLAGGED" | "REJECTED";
    if (result.score >= 7 && result.flags.length === 0) {
      status = "APPROVED";
    } else if (result.score >= 4) {
      status = "FLAGGED";
    } else {
      status = "REJECTED";
    }

    await db.job.update({
      where: { id: jobId },
      data: {
        status,
        moderationScore: result.score,
        moderationFlags: result.flags,
        moderationNote: result.reasoning,
      },
    });

    return result;
  } catch (error) {
    console.error("Moderation API error:", error);
    // On API failure, flag for manual review
    await db.job.update({
      where: { id: jobId },
      data: { status: "FLAGGED", moderationNote: "Moderation API failed — manual review needed" },
    });
    return { score: 5, flags: ["api_error"], reasoning: "Moderation API failed" };
  }
}
