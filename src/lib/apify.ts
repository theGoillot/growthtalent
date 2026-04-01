import type { IngestPayload } from "./ingest";

const APIFY_TOKEN = process.env.APIFY_TOKEN!;
const LINKEDIN_ACTOR_ID = "BHzefUZlZRKWxkTck";
const APIFY_BASE = "https://api.apify.com/v2";

// ── LinkedIn scraper output type ────────────────────────

interface LinkedInJob {
  id: string;
  title: string;
  companyName: string;
  companyUrl: string;
  location: string;
  salary: string;
  description: string;
  descriptionHtml: string;
  contractType: string;
  experienceLevel: string;
  workType: string;
  sector: string;
  jobUrl: string;
  applyUrl: string;
  publishedAt: string;
  applicationsCount: string;
  posterFullName: string;
  companyId: string;
}

// ── Agency detection ────────────────────────────────────

const AGENCY_KEYWORDS = [
  "staffing", "recruiting", "recruitment", "talent acquisition",
  "headhunting", "placement", "search firm", "consulting group",
  "personnel", "manpower", "adecco", "randstad", "hays",
  "michael page", "robert half", "kforce", "insight global",
];

function isAgency(companyName: string): boolean {
  const lower = companyName.toLowerCase();
  return AGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

// ── Relevance check ─────────────────────────────────────

// Title MUST contain one of these keywords (strict — description alone is not enough)
const TITLE_KEYWORDS = [
  "growth", "marketing", "seo", "acquisition", "demand gen",
  "performance market", "paid media", "paid acquisition",
  "crm", "lifecycle", "retention", "content market",
  "brand market", "product market", "outbound", "inbound",
  "head of digital", "head of dtc", "social media",
  "community manager", "partnerships", "revenue market",
  "go-to-market", "gtm", "analytics market",
];

// These titles are NEVER growth roles even if keyword matches
const EXCLUDE_TITLES = [
  "software engineer", "data scientist", "ux designer", "ui designer",
  "recruiter", "hr ", "human resource", "nurse", "teacher", "lawyer",
  "attorney", "accountant", "mechanic", "chef", "nanny", "sitter",
  "physiotherapist", "coach", "principal", "assistant professor",
  "gallery assistant", "park naturalist", "security", "porter",
  "casting", "buyer", "economist", "warehouse", "driver",
];

function isRelevantGrowthRole(title: string, _description: string): boolean {
  const titleLower = title.toLowerCase();
  // Exclude obvious non-growth roles first
  if (EXCLUDE_TITLES.some((ex) => titleLower.includes(ex))) return false;
  // Title must contain a growth keyword
  return TITLE_KEYWORDS.some((kw) => titleLower.includes(kw));
}

// ── Transform LinkedIn → IngestPayload ──────────────────

function parseLinkedInLocation(location: string): { city: string | undefined; country: string | undefined; remote: boolean } {
  const remote = location.toLowerCase().includes("remote");
  const parts = location.replace(/\(.*?\)/g, "").split(",").map((s) => s.trim()).filter(Boolean);
  return {
    city: parts[0] || undefined,
    country: parts[1] || parts[0] || undefined,
    remote,
  };
}

function mapExperienceLevel(level: string): string | undefined {
  const map: Record<string, string> = {
    "Internship": "intern",
    "Entry level": "junior",
    "Associate": "mid",
    "Mid-Senior level": "senior",
    "Director": "director",
    "Executive": "c-level",
  };
  return map[level];
}

export function transformLinkedInJob(item: LinkedInJob, market: "usa" | "france" | "latam"): IngestPayload | null {
  // Filter out agencies
  if (isAgency(item.companyName)) return null;

  // Filter out non-growth roles
  if (!isRelevantGrowthRole(item.title, item.description)) return null;

  const loc = parseLinkedInLocation(item.location);
  const companyDomain = item.companyUrl
    ? new URL(item.companyUrl).pathname.replace("/company/", "").replace(/\//g, "")
    : undefined;

  return {
    title: item.title,
    company_name: item.companyName,
    company_domain: companyDomain ? `${companyDomain}.com` : undefined,
    company_website: item.companyUrl,
    description: item.descriptionHtml || item.description,
    location: item.location,
    city: loc.city,
    country: loc.country,
    remote: loc.remote,
    salary_range: item.salary || undefined,
    seniority: mapExperienceLevel(item.experienceLevel),
    url: item.jobUrl,
    apply_url: item.applyUrl || item.jobUrl,
    source: "apify",
    market,
  };
}

// ── Apify API functions ─────────────────────────────────

export async function runLinkedInScraper(
  searchQueries: string[],
  location: string,
  limit: number = 50
): Promise<string> {
  const res = await fetch(`${APIFY_BASE}/acts/${LINKEDIN_ACTOR_ID}/runs?token=${APIFY_TOKEN}`, {
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

export async function waitForRun(runId: string, maxWaitMs: number = 300000): Promise<"SUCCEEDED" | "FAILED"> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const res = await fetch(`${APIFY_BASE}/actor-runs/${runId}?token=${APIFY_TOKEN}`);
    const data = await res.json();
    const status = data.data?.status ?? data.status;

    if (status === "SUCCEEDED") return "SUCCEEDED";
    if (status === "FAILED" || status === "ABORTED" || status === "TIMED-OUT") return "FAILED";

    // Wait 5 seconds before next poll
    await new Promise((r) => setTimeout(r, 5000));
  }
  return "FAILED";
}

export async function fetchRunResults(runId: string): Promise<LinkedInJob[]> {
  const res = await fetch(
    `${APIFY_BASE}/actor-runs/${runId}/dataset/items?token=${APIFY_TOKEN}&limit=500`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch results: ${res.status}`);
  }

  return res.json();
}

export async function syncExistingRun(runId: string, market: "usa" | "france" | "latam"): Promise<{
  total: number;
  relevant: number;
  filtered: number;
  jobs: IngestPayload[];
}> {
  const items = await fetchRunResults(runId);

  const jobs: IngestPayload[] = [];
  let filtered = 0;

  for (const item of items) {
    const payload = transformLinkedInJob(item, market);
    if (payload) {
      jobs.push(payload);
    } else {
      filtered++;
    }
  }

  return {
    total: items.length,
    relevant: jobs.length,
    filtered,
    jobs,
  };
}
