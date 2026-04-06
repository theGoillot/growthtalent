/**
 * Welcome to the Jungle scraper transform.
 * Actor: clearpath~welcome-to-the-jungle-jobs-api
 */

import type { IngestPayload } from "@/lib/ingest";
import { isAgency, isRelevantGrowthRole, type ScraperSource, type ScraperSearchConfig } from "./types";

const CONTRACT_MAP: Record<string, string> = {
  "full_time": "FULL_TIME",
  "CDI": "FULL_TIME",
  "part_time": "PART_TIME",
  "CDD": "CONTRACT",
  "internship": "INTERNSHIP",
  "Stage": "INTERNSHIP",
  "INTERNSHIP": "INTERNSHIP",
  "apprenticeship": "INTERNSHIP",
  "Alternance": "INTERNSHIP",
  "freelance": "FREELANCE",
  "Freelance": "FREELANCE",
  "VIE": "CONTRACT",
  "temporary": "CONTRACT",
};

const EXPERIENCE_MAP: Record<string, string> = {
  "junior": "junior",
  "0_to_1_years": "junior",
  "1_to_3_years": "junior",
  "3_to_5_years": "mid",
  "5_to_10_years": "senior",
  "more_than_10_years": "senior",
  "senior": "senior",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transform(item: any, market: "usa" | "france" | "latam"): IngestPayload | null {
  const title = item.name || "";
  const companyName = item.organizationName || "";

  if (!title || !companyName) return null;
  if (isAgency(companyName)) return null;
  if (!isRelevantGrowthRole(title)) return null;

  const url = item.url || item.applyUrl || "";
  if (!url) return null;

  // Parse location from offices array
  const offices = item.offices || [];
  const office = offices[0] || {};
  const city = office.city || office.name || item.organizationHeadquarter || "";
  const country = office.country || (market === "france" ? "FR" : "");
  const location = [city, country].filter(Boolean).join(", ");

  // Parse remote
  const remoteStr = (item.remote || "").toLowerCase();
  const isRemote = remoteStr === "fulltime" || remoteStr === "full" || remoteStr === "true";

  // Salary from structured fields
  const salaryMin = item.salaryMin ?? undefined;
  const salaryMax = item.salaryMax ?? undefined;
  const salaryCurrency = item.salaryCurrency || (market === "france" ? "EUR" : "USD");

  // Experience level
  const exp = (item.experienceLevel || "").toLowerCase();
  const seniority = EXPERIENCE_MAP[exp] || undefined;

  // Build description from WTTJ's rich fields
  const descParts: string[] = [];
  if (item.summary) descParts.push(`<p>${item.summary}</p>`);
  if (item.keyMissions) descParts.push(`<h3>Key Missions</h3>${item.keyMissions}`);
  if (item.profile) descParts.push(`<h3>Profile</h3>${item.profile}`);
  if (item.recruitmentProcess) descParts.push(`<h3>Recruitment Process</h3>${item.recruitmentProcess}`);
  if (item.description) descParts.push(item.description);
  if (item.companySummary) descParts.push(`<h3>About ${companyName}</h3><p>${item.companySummary}</p>`);
  const description = descParts.join("\n") || item.description || "";

  // Company domain from website
  const website = item.organizationWebsite || "";
  let domain: string | undefined;
  if (website) {
    try { domain = new URL(website.startsWith("http") ? website : `https://${website}`).hostname.replace("www.", ""); } catch {}
  }

  return {
    title,
    company_name: companyName,
    company_domain: domain,
    company_logo: item.organizationLogo || undefined,
    company_website: website || item.organizationLinkedin || undefined,
    description,
    location,
    city: city || undefined,
    country: country || undefined,
    remote: isRemote,
    salary_min: salaryMin,
    salary_max: salaryMax,
    salary_currency: salaryCurrency,
    seniority,
    url,
    apply_url: item.applyUrl || url,
    source: "wttj",
    market,
  };
}

const configs: ScraperSearchConfig[] = [
  // Growth roles in France
  { queries: ["growth"], location: "Paris", market: "france", limit: 50 },
  { queries: ["head of growth"], location: "France", market: "france", limit: 50 },
  { queries: ["marketing"], location: "Paris", market: "france", limit: 50 },
  { queries: ["acquisition"], location: "France", market: "france", limit: 50 },
  { queries: ["crm"], location: "France", market: "france", limit: 30 },
  { queries: ["seo"], location: "France", market: "france", limit: 30 },
  { queries: ["product marketing"], location: "France", market: "france", limit: 30 },
  { queries: ["performance marketing"], location: "France", market: "france", limit: 30 },
  { queries: ["social media"], location: "France", market: "france", limit: 30 },
  { queries: ["content marketing"], location: "France", market: "france", limit: 30 },
];

export const wttjSource: ScraperSource = {
  name: "Welcome to the Jungle",
  actorId: "clearpath~welcome-to-the-jungle-jobs-api",
  configs,
  transform,
};
