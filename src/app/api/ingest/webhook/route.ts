import { NextRequest, NextResponse } from "next/server";
import { ingestJob, type IngestPayload } from "@/lib/ingest";

export async function POST(request: NextRequest) {
  // Verify API key
  const apiKey = request.headers.get("x-api-key") ?? request.headers.get("authorization")?.replace("Bearer ", "");
  if (apiKey !== process.env.INGEST_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Support both single job and batch
    const jobs: IngestPayload[] = Array.isArray(body) ? body : [body];

    if (jobs.length === 0) {
      return NextResponse.json({ error: "No jobs provided" }, { status: 400 });
    }

    if (jobs.length > 100) {
      return NextResponse.json({ error: "Max 100 jobs per batch" }, { status: 400 });
    }

    // Validate required fields
    for (const job of jobs) {
      if (!job.title || !job.company_name || !job.url || !job.market) {
        return NextResponse.json(
          { error: "Missing required fields: title, company_name, url, market" },
          { status: 400 }
        );
      }
    }

    const results = await Promise.all(jobs.map(ingestJob));

    const created = results.filter((r) => r.status === "created").length;
    const duplicates = results.filter((r) => r.status === "duplicate").length;
    const errors = results.filter((r) => r.status === "error").length;

    return NextResponse.json({
      total: jobs.length,
      created,
      duplicates,
      errors,
      results,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
