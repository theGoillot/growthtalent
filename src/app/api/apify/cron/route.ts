import { NextRequest, NextResponse } from "next/server";
import { runApifyActor, waitForRun, fetchRunResults } from "@/lib/apify";
import { ingestJob } from "@/lib/ingest";
import { ALL_SOURCES } from "@/lib/scrapers";

export const maxDuration = 300;

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel cron or manual trigger with API key)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    const apiKey = request.nextUrl.searchParams.get("key");
    if (apiKey !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Optional filters: run a specific source or market only
  const sourceFilter = request.nextUrl.searchParams.get("source");
  const marketFilter = request.nextUrl.searchParams.get("market");

  const results: Array<{
    source: string;
    query: string;
    location: string;
    market: string;
    created: number;
    duplicates: number;
    filtered: number;
    error?: string;
  }> = [];

  const sources = sourceFilter
    ? ALL_SOURCES.filter((s) => s.name.toLowerCase() === sourceFilter.toLowerCase())
    : ALL_SOURCES;

  for (const source of sources) {
    const configs = marketFilter
      ? source.configs.filter((c) => c.market === marketFilter)
      : source.configs;
    for (const config of configs) {
      try {
        console.log(`[Cron] ${source.name}: "${config.queries.join(", ")}" in "${config.location}" (${config.market})`);

        const runId = await runApifyActor(source.actorId, config.queries, config.location, config.limit);
        const status = await waitForRun(runId, 180000);

        if (status === "FAILED") {
          results.push({
            source: source.name,
            query: config.queries.join(", "),
            location: config.location,
            market: config.market,
            created: 0, duplicates: 0, filtered: 0,
            error: "Apify run failed",
          });
          continue;
        }

        const items = await fetchRunResults(runId);
        let filtered = 0;
        let created = 0;
        let duplicates = 0;

        for (const item of items) {
          const payload = source.transform(item, config.market);
          if (!payload) {
            filtered++;
            continue;
          }

          const result = await ingestJob(payload);
          if (result.status === "created") created++;
          if (result.status === "duplicate") duplicates++;
        }

        results.push({
          source: source.name,
          query: config.queries.join(", "),
          location: config.location,
          market: config.market,
          created,
          duplicates,
          filtered,
        });
      } catch (error) {
        results.push({
          source: source.name,
          query: config.queries.join(", "),
          location: config.location,
          market: config.market,
          created: 0, duplicates: 0, filtered: 0,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  }

  const totalCreated = results.reduce((sum, r) => sum + r.created, 0);
  const totalDuplicates = results.reduce((sum, r) => sum + r.duplicates, 0);

  console.log(`[Cron] Complete: ${totalCreated} created, ${totalDuplicates} duplicates across ${sources.length} sources`);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    totalCreated,
    totalDuplicates,
    sources: sources.map((s) => s.name),
    searches: results,
  });
}
