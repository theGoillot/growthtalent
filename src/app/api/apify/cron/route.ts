import { NextRequest, NextResponse } from "next/server";
import { runLinkedInScraper, waitForRun, syncExistingRun } from "@/lib/apify";
import { ingestJob } from "@/lib/ingest";
import { SEARCH_CONFIGS } from "@/lib/apify-searches";

export const maxDuration = 300;

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel cron or manual trigger with API key)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // Also accept admin password for manual triggers
    const apiKey = request.nextUrl.searchParams.get("key");
    if (apiKey !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const results: Array<{
    query: string;
    location: string;
    market: string;
    created: number;
    duplicates: number;
    filtered: number;
    error?: string;
  }> = [];

  for (const config of SEARCH_CONFIGS) {
    try {
      console.log(`[Cron] Running: "${config.queries.join(", ")}" in "${config.location}" (${config.market})`);

      const runId = await runLinkedInScraper(config.queries, config.location, config.limit);
      const status = await waitForRun(runId, 180000); // 3 min max per search

      if (status === "FAILED") {
        results.push({
          query: config.queries.join(", "),
          location: config.location,
          market: config.market,
          created: 0,
          duplicates: 0,
          filtered: 0,
          error: "Apify run failed",
        });
        continue;
      }

      const { relevant, filtered, jobs } = await syncExistingRun(runId, config.market);
      const ingested = await Promise.all(jobs.map(ingestJob));

      results.push({
        query: config.queries.join(", "),
        location: config.location,
        market: config.market,
        created: ingested.filter((r) => r.status === "created").length,
        duplicates: ingested.filter((r) => r.status === "duplicate").length,
        filtered,
      });
    } catch (error) {
      results.push({
        query: config.queries.join(", "),
        location: config.location,
        market: config.market,
        created: 0,
        duplicates: 0,
        filtered: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  const totalCreated = results.reduce((sum, r) => sum + r.created, 0);
  const totalDuplicates = results.reduce((sum, r) => sum + r.duplicates, 0);

  console.log(`[Cron] Complete: ${totalCreated} created, ${totalDuplicates} duplicates`);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    totalCreated,
    totalDuplicates,
    searches: results,
  });
}
