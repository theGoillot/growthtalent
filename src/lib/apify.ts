/**
 * Generic Apify API functions — work with any actor.
 * Source-specific transforms live in src/lib/scrapers/*.ts
 */

const APIFY_TOKEN = process.env.APIFY_TOKEN!;
const APIFY_BASE = "https://api.apify.com/v2";

/** Run any Apify actor with search queries */
export async function runApifyActor(
  actorId: string,
  searchQueries: string[],
  location: string,
  limit: number = 50
): Promise<string> {
  const res = await fetch(`${APIFY_BASE}/acts/${actorId}/runs?token=${APIFY_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      searchQueries,
      location,
      maxResults: limit,
      proxy: { useApifyProxy: true },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Apify run failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.data.id as string;
}

/** Wait for an Apify run to complete */
export async function waitForRun(runId: string, maxWaitMs: number = 300000): Promise<"SUCCEEDED" | "FAILED"> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const res = await fetch(`${APIFY_BASE}/actor-runs/${runId}?token=${APIFY_TOKEN}`);
    const data = await res.json();
    const status = data.data?.status ?? data.status;

    if (status === "SUCCEEDED") return "SUCCEEDED";
    if (status === "FAILED" || status === "ABORTED" || status === "TIMED-OUT") return "FAILED";

    await new Promise((r) => setTimeout(r, 5000));
  }
  return "FAILED";
}

/** Fetch results from a completed Apify run */
export async function fetchRunResults(runId: string): Promise<Record<string, unknown>[]> {
  const res = await fetch(
    `${APIFY_BASE}/actor-runs/${runId}/dataset/items?token=${APIFY_TOKEN}&limit=500`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch results: ${res.status}`);
  }

  return res.json();
}
