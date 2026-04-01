import { NextRequest, NextResponse } from "next/server";
import { enrichJob, enrichBatch } from "@/lib/enrich";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.INGEST_API_KEY && apiKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Single job enrichment
    if (body.jobId) {
      const result = await enrichJob(body.jobId);
      return NextResponse.json({ jobId: body.jobId, result });
    }

    // Batch enrichment
    const limit = body.limit ?? 20;
    const result = await enrichBatch(limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Enrich error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Enrichment failed" },
      { status: 500 }
    );
  }
}
