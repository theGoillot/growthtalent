import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { moderateJob } from "@/lib/moderate";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { title, companyName, category, seniority, remote, market, applyUrl, contactEmail } = body;
    if (!title || !companyName || !category || !applyUrl || !contactEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find or create company
    const companySlug = slugify(companyName);
    const domain = body.companyWebsite ? new URL(body.companyWebsite).hostname.replace(/^www\./, "") : undefined;

    let company = await db.company.findUnique({ where: { slug: companySlug } });
    if (!company) {
      company = await db.company.create({
        data: {
          name: companyName,
          slug: companySlug,
          website: body.companyWebsite || null,
          domain: domain || null,
          market: market ?? "USA",
        },
      });
    }

    // Create job
    const jobSlug = slugify(`${title}-${companyName}`).slice(0, 80);
    const location = [body.city, body.country].filter(Boolean).join(", ") || null;

    const job = await db.job.create({
      data: {
        title,
        slug: jobSlug,
        description: body.description || null,
        category,
        seniority: seniority ?? "MID",
        contractType: "FULL_TIME",
        remote: remote ?? "REMOTE",
        city: body.city || null,
        country: body.country || null,
        location,
        salaryMin: body.salaryMin || null,
        salaryMax: body.salaryMax || null,
        salaryCurrency: body.salaryCurrency || null,
        applyUrl,
        source: "manual",
        market: market ?? "USA",
        status: "PENDING_REVIEW",
        companyId: company.id,
      },
    });

    // AI moderation (async, don't block)
    moderateJob(job.id).catch((err) => {
      console.error("Post-job moderation failed:", err);
    });

    return NextResponse.json({ ok: true, jobId: job.id });
  } catch (error) {
    console.error("Post job error:", error);
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}
