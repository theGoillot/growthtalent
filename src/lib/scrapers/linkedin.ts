/**
 * LinkedIn Jobs scraper transform.
 * Actor: BHzefUZlZRKWxkTck (curious_coder/linkedin-jobs-scraper)
 */

import type { IngestPayload } from "@/lib/ingest";
import { isAgency, isRelevantGrowthRole, type ScraperSource, type ScraperSearchConfig } from "./types";

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
}

function parseLocation(location: string): { city: string | undefined; country: string | undefined; remote: boolean } {
  const remote = location.toLowerCase().includes("remote");
  const parts = location.replace(/\(.*?\)/g, "").split(",").map((s) => s.trim()).filter(Boolean);
  return { city: parts[0] || undefined, country: parts[1] || parts[0] || undefined, remote };
}

const EXPERIENCE_MAP: Record<string, string> = {
  "Internship": "intern",
  "Entry level": "junior",
  "Associate": "mid",
  "Mid-Senior level": "senior",
  "Director": "director",
  "Executive": "c-level",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transform(item: any, market: "usa" | "france" | "latam"): IngestPayload | null {
  const job = item as LinkedInJob;
  if (isAgency(job.companyName)) return null;
  if (!isRelevantGrowthRole(job.title)) return null;

  const loc = parseLocation(job.location ?? "");
  const companyDomain = job.companyUrl
    ? (() => { try { return new URL(job.companyUrl).pathname.replace("/company/", "").replace(/\//g, ""); } catch { return undefined; } })()
    : undefined;

  return {
    title: job.title,
    company_name: job.companyName,
    company_domain: companyDomain ? `${companyDomain}.com` : undefined,
    company_website: job.companyUrl,
    description: job.descriptionHtml || job.description,
    location: job.location,
    city: loc.city,
    country: loc.country,
    remote: loc.remote,
    salary_range: job.salary || undefined,
    seniority: EXPERIENCE_MAP[job.experienceLevel],
    url: job.jobUrl,
    apply_url: job.applyUrl || job.jobUrl,
    source: "apify",
    market,
  };
}

const configs: ScraperSearchConfig[] = [
  // USA
  { queries: ["Head of Growth"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Growth Marketing Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Performance Marketing Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Demand Generation Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["SEO Manager startup"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Growth Engineer"], location: "United States", market: "usa", limit: 50 },
  { queries: ["CRM Lifecycle Manager"], location: "United States", market: "usa", limit: 30 },
  { queries: ["Product Marketing Manager startup"], location: "United States", market: "usa", limit: 50 },
  // France
  { queries: ["Head of Growth"], location: "France", market: "france", limit: 50 },
  { queries: ["Growth Manager"], location: "France", market: "france", limit: 50 },
  { queries: ["Growth Marketing"], location: "Paris", market: "france", limit: 50 },
  { queries: ["Acquisition Manager"], location: "France", market: "france", limit: 50 },
  { queries: ["CRM Manager startup"], location: "France", market: "france", limit: 30 },
  { queries: ["SEO Manager"], location: "France", market: "france", limit: 30 },
  { queries: ["Responsable Growth"], location: "France", market: "france", limit: 50 },
  { queries: ["Responsable Acquisition"], location: "France", market: "france", limit: 50 },
  // LatAm
  { queries: ["Growth Marketing"], location: "Latin America", market: "latam", limit: 50 },
  { queries: ["Head of Growth"], location: "Mexico", market: "latam", limit: 50 },
  { queries: ["Growth Marketing"], location: "Colombia", market: "latam", limit: 30 },
  { queries: ["Growth Marketing"], location: "Brazil", market: "latam", limit: 30 },
  { queries: ["Head of Growth"], location: "Argentina", market: "latam", limit: 30 },
];

export const linkedInSource: ScraperSource = {
  name: "LinkedIn",
  actorId: "curious_coder~linkedin-jobs-scraper",
  configs,
  transform,
};
