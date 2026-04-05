/**
 * ZipRecruiter scraper transform.
 * Actor: shahidirfan/Ziprecuriter-Job-Scraper
 */

import type { IngestPayload } from "@/lib/ingest";
import { isAgency, isRelevantGrowthRole, type ScraperSource, type ScraperSearchConfig } from "./types";

interface ZipRecruiterJob {
  title?: string;
  jobTitle?: string;
  company?: string;
  companyName?: string;
  location?: string;
  salary?: string;
  salaryRange?: string;
  employmentType?: string;
  jobType?: string;
  description?: string;
  url?: string;
  link?: string;
  postedDate?: string;
  applyUrl?: string;
}

function parseSalary(salaryStr: string): { min?: number; max?: number } {
  // Formats: "$120,000 - $160,000 a year", "$50 - $70 an hour", "$80K-$120K"
  const numbers = salaryStr.match(/[\d]+[.,]?[\d]*/g);
  if (!numbers || numbers.length === 0) return {};
  const parsed = numbers.map((n) => {
    const clean = parseFloat(n.replace(",", ""));
    return clean < 1000 ? clean * 1000 : clean;
  });
  // If "hour" is mentioned, convert to annual (assume 2080 hours/year)
  const isHourly = salaryStr.toLowerCase().includes("hour");
  const multiplier = isHourly ? 2080 : 1;
  return {
    min: Math.round(Math.min(...parsed) * multiplier),
    max: parsed.length > 1 ? Math.round(Math.max(...parsed) * multiplier) : undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transform(item: any, market: "usa" | "france" | "latam"): IngestPayload | null {
  const job = item as ZipRecruiterJob;
  const title = job.title || job.jobTitle || "";
  const companyName = job.company || job.companyName || "";

  if (!title || !companyName) return null;
  if (isAgency(companyName)) return null;
  if (!isRelevantGrowthRole(title)) return null;

  const url = job.url || job.link || "";
  if (!url) return null;

  const salaryStr = job.salary || job.salaryRange || "";
  const salary = parseSalary(salaryStr);

  const location = job.location || "";
  const isRemote = location.toLowerCase().includes("remote");

  return {
    title,
    company_name: companyName,
    description: job.description,
    location,
    city: location.split(",")[0]?.trim() || undefined,
    country: location.split(",")[1]?.trim() || undefined,
    remote: isRemote,
    salary_min: salary.min,
    salary_max: salary.max,
    salary_currency: "USD",
    seniority: undefined,
    url,
    apply_url: job.applyUrl || url,
    source: "ziprecruiter",
    market,
  };
}

const configs: ScraperSearchConfig[] = [
  // US growth roles
  { queries: ["Head of Growth"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Growth Marketing Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Performance Marketing Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Demand Generation Manager"], location: "United States", market: "usa", limit: 30 },
  { queries: ["SEO Manager"], location: "United States", market: "usa", limit: 30 },
  { queries: ["Product Marketing Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Growth Engineer"], location: "United States", market: "usa", limit: 30 },
  { queries: ["Social Media Manager"], location: "United States", market: "usa", limit: 30 },
];

export const zipRecruiterSource: ScraperSource = {
  name: "ZipRecruiter",
  actorId: "shahidirfan/Ziprecuriter-Job-Scraper",
  configs,
  transform,
};
