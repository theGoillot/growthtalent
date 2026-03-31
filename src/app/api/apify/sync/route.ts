import { NextRequest, NextResponse } from "next/server";
import { syncExistingRun, runLinkedInScraper, waitForRun } from "@/lib/apify";
import { ingestJob } from "@/lib/ingest";

export const maxDuration = 300; // 5 min max for Vercel

export async function POST(request: NextRequest) {
  // Auth: admin password or ingest API key
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.INGEST_API_KEY && apiKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    let runId = body.runId as string | undefined;
    const market = (body.market as "usa" | "france" | "latam") ?? "usa";
    const query = body.query as string | undefined;
    const location = body.location as string | undefined;
    const limit = (body.limit as number) ?? 50;

    // Either use existing runId or start a new run
    if (!runId) {
      if (!query || !location) {
        return NextResponse.json(
          { error: "Provide either runId (existing run) or query + location (new run)" },
          { status: 400 }
        );
      }

      console.log(`Starting Apify run: "${query}" in "${location}" (limit: ${limit})`);
      runId = await runLinkedInScraper([query], location, limit);
      console.log(`Run started: ${runId}`);

      const status = await waitForRun(runId);
      if (status === "FAILED") {
        return NextResponse.json({ error: "Apify run failed", runId }, { status: 500 });
      }
    }

    // Fetch and transform results
    console.log(`Syncing run ${runId} for market ${market}`);
    const { total, relevant, filtered, jobs } = await syncExistingRun(runId, market);

    // Ingest all relevant jobs
    const results = await Promise.all(jobs.map(ingestJob));
    const created = results.filter((r) => r.status === "created").length;
    const duplicates = results.filter((r) => r.status === "duplicate").length;
    const errors = results.filter((r) => r.status === "error").length;

    return NextResponse.json({
      runId,
      market,
      apify: { total, relevant, filtered },
      ingested: { created, duplicates, errors },
    });
  } catch (error) {
    console.error("Apify sync error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 }
    );
  }
}
