/**
 * Wellfound (AngelList) scraper transform.
 * Actor: orgupdate/wellfound-jobs-scraper
 */

import type { IngestPayload } from "@/lib/ingest";
import { isAgency, isRelevantGrowthRole, type ScraperSource, type ScraperSearchConfig } from "./types";

interface WellfoundJob {
  title?: string;
  jobTitle?: string;
  company_name?: string;
  companyName?: string;
  company_url?: string;
  companyUrl?: string;
  location?: string;
  salary_range?: string;
  salaryRange?: string;
  salary?: string;
  remote?: boolean | string;
  job_type?: string;
  jobType?: string;
  experience?: string;
  experienceLevel?: string;
  description?: string;
  url?: string;
  link?: string;
  skills?: string[];
}

function parseSalaryRange(range: string): { min?: number; max?: number } {
  // Formats: "$150k – $200k", "$120,000 - $160,000", "150000-200000"
  const numbers = range.match(/[\d]+[.,]?[\d]*/g);
  if (!numbers || numbers.length === 0) return {};
  const parsed = numbers.map((n) => {
    const clean = parseFloat(n.replace(",", ""));
    return clean < 1000 ? clean * 1000 : clean;
  });
  return { min: Math.min(...parsed), max: parsed.length > 1 ? Math.max(...parsed) : undefined };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transform(item: any, market: "usa" | "france" | "latam"): IngestPayload | null {
  const job = item as WellfoundJob;
  const title = job.title || job.jobTitle || "";
  const companyName = job.company_name || job.companyName || "";

  if (!title || !companyName) return null;
  if (isAgency(companyName)) return null;
  if (!isRelevantGrowthRole(title)) return null;

  const url = job.url || job.link || "";
  if (!url) return null;

  const salaryStr = job.salary_range || job.salaryRange || job.salary || "";
  const salary = parseSalaryRange(salaryStr);

  const remoteVal = job.remote;
  const isRemote = remoteVal === true || remoteVal === "true" || (typeof remoteVal === "string" && remoteVal.toLowerCase().includes("remote"));

  const location = job.location || "";

  return {
    title,
    company_name: companyName,
    company_website: job.company_url || job.companyUrl,
    description: job.description,
    location,
    city: location.split(",")[0]?.trim() || undefined,
    country: location.split(",")[1]?.trim() || undefined,
    remote: isRemote,
    salary_min: salary.min,
    salary_max: salary.max,
    salary_currency: "USD",
    seniority: (job.experience || job.experienceLevel || "").toLowerCase().includes("senior") ? "senior" : undefined,
    url,
    apply_url: url,
    source: "wellfound",
    market,
  };
}

const configs: ScraperSearchConfig[] = [
  // US startup growth roles
  { queries: ["Head of Growth"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Growth Marketing Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Growth Marketing"], location: "San Francisco", market: "usa", limit: 50 },
  { queries: ["Growth Marketing"], location: "New York", market: "usa", limit: 50 },
  { queries: ["Performance Marketing"], location: "United States", market: "usa", limit: 30 },
  { queries: ["SEO Manager"], location: "United States", market: "usa", limit: 30 },
  { queries: ["Product Marketing Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Demand Generation"], location: "United States", market: "usa", limit: 30 },
];

export const wellfoundSource: ScraperSource = {
  name: "Wellfound",
  actorId: "orgupdate/wellfound-jobs-scraper",
  configs,
  transform,
};
