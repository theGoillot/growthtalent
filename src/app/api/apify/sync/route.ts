import { NextRequest, NextResponse } from "next/server";
import { runApifyActor, waitForRun, fetchRunResults } from "@/lib/apify";
import { ingestJob } from "@/lib/ingest";
import { linkedInSource } from "@/lib/scrapers/linkedin";
import { wttjSource } from "@/lib/scrapers/wttj";
import { wellfoundSource } from "@/lib/scrapers/wellfound";
import { zipRecruiterSource } from "@/lib/scrapers/ziprecruiter";

const SOURCES = {
  linkedin: linkedInSource,
  wttj: wttjSource,
  wellfound: wellfoundSource,
  ziprecruiter: zipRecruiterSource,
};

export const maxDuration = 300;

export async function POST(request: NextRequest) {
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
    const sourceName = (body.source as keyof typeof SOURCES) ?? "linkedin";
    const source = SOURCES[sourceName] ?? linkedInSource;

    if (!runId) {
      if (!query || !location) {
        return NextResponse.json(
          { error: "Provide either runId or query + location" },
          { status: 400 }
        );
      }

      const actorId = (body.actorId as string) ?? source.actorId;
      runId = await runApifyActor(actorId, [query], location, limit);

      const status = await waitForRun(runId);
      if (status === "FAILED") {
        return NextResponse.json({ error: "Apify run failed", runId }, { status: 500 });
      }
    }

    const items = await fetchRunResults(runId);
    let filtered = 0;
    let created = 0;
    let duplicates = 0;
    let errors = 0;

    for (const item of items) {
      const payload = source.transform(item, market);
      if (!payload) { filtered++; continue; }
      const result = await ingestJob(payload);
      if (result.status === "created") created++;
      else if (result.status === "duplicate") duplicates++;
      else errors++;
    }

    return NextResponse.json({
      runId,
      source: sourceName,
      market,
      apify: { total: items.length, relevant: items.length - filtered, filtered },
      ingested: { created, duplicates, errors },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 }
    );
  }
}
