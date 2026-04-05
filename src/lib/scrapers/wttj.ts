/**
 * Welcome to the Jungle scraper transform.
 * Actor: shahidirfan/Jungle-Job-Scraper
 */

import type { IngestPayload } from "@/lib/ingest";
import { isAgency, isRelevantGrowthRole, type ScraperSource, type ScraperSearchConfig } from "./types";

interface WTTJJob {
  name?: string;
  title?: string;
  office?: string;
  location?: string;
  contract_type?: string;
  contractType?: string;
  salary?: { min?: number; max?: number; currency?: string } | string;
  remote?: string;
  experience?: string;
  experienceLevel?: string;
  company_name?: string;
  companyName?: string;
  description?: string;
  url?: string;
  link?: string;
  published_at?: string;
  postedAt?: string;
}

const CONTRACT_MAP: Record<string, string> = {
  "CDI": "FULL_TIME",
  "CDD": "CONTRACT",
  "Stage": "INTERNSHIP",
  "Alternance": "INTERNSHIP",
  "Freelance": "FREELANCE",
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  "Internship": "INTERNSHIP",
};

const EXPERIENCE_MAP: Record<string, string> = {
  "junior": "junior",
  "0-2 years": "junior",
  "1-3 years": "junior",
  "3-5 years": "mid",
  "5-10 years": "senior",
  "> 10 years": "senior",
  "senior": "senior",
  "manager": "manager",
  "director": "director",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transform(item: any, market: "usa" | "france" | "latam"): IngestPayload | null {
  const job = item as WTTJJob;
  const title = job.name || job.title || "";
  const companyName = job.company_name || job.companyName || "";

  if (!title || !companyName) return null;
  if (isAgency(companyName)) return null;
  if (!isRelevantGrowthRole(title)) return null;

  const location = job.office || job.location || "";
  const url = job.url || job.link || "";
  if (!url) return null;

  // Parse salary
  let salaryMin: number | undefined;
  let salaryMax: number | undefined;
  let salaryCurrency: string | undefined;
  if (typeof job.salary === "object" && job.salary) {
    salaryMin = job.salary.min ?? undefined;
    salaryMax = job.salary.max ?? undefined;
    salaryCurrency = job.salary.currency ?? "EUR";
  }

  // Parse remote
  const remoteStr = (job.remote || "").toLowerCase();
  const isRemote = remoteStr.includes("full") || remoteStr === "true" || remoteStr === "yes";

  // Parse experience
  const exp = (job.experience || job.experienceLevel || "").toLowerCase();
  const seniority = EXPERIENCE_MAP[exp] || undefined;

  return {
    title,
    company_name: companyName,
    description: job.description,
    location,
    city: location.split(",")[0]?.trim() || undefined,
    country: market === "france" ? "FR" : undefined,
    remote: isRemote,
    salary_min: salaryMin,
    salary_max: salaryMax,
    salary_currency: salaryCurrency,
    seniority,
    url,
    apply_url: url,
    source: "wttj",
    market,
  };
}

const configs: ScraperSearchConfig[] = [
  // Growth roles in France
  { queries: ["Growth"], location: "France", market: "france", limit: 50 },
  { queries: ["Growth Marketing"], location: "Paris", market: "france", limit: 50 },
  { queries: ["Head of Growth"], location: "France", market: "france", limit: 50 },
  { queries: ["Acquisition"], location: "France", market: "france", limit: 50 },
  { queries: ["CRM"], location: "France", market: "france", limit: 30 },
  { queries: ["SEO"], location: "France", market: "france", limit: 30 },
  { queries: ["Product Marketing"], location: "France", market: "france", limit: 30 },
  { queries: ["Performance Marketing"], location: "France", market: "france", limit: 30 },
  { queries: ["Social Media Manager"], location: "France", market: "france", limit: 30 },
  { queries: ["Content Marketing"], location: "France", market: "france", limit: 30 },
];

export const wttjSource: ScraperSource = {
  name: "Welcome to the Jungle",
  actorId: "shahidirfan/Jungle-Job-Scraper",
  configs,
  transform,
};
