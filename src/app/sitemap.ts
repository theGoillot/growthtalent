import type { MetadataRoute } from "next";
import { getAllJobSlugs, getAllCompanySlugs, getCitiesWithCount } from "@/lib/queries";
import { CATEGORIES } from "@/lib/categories";
import { CONTENT_SLUGS } from "@/lib/content";
import { getAllSalarySlugs } from "@/lib/salary-data";

export const dynamic = "force-dynamic";

const BASE = "https://www.growthtalent.org";

const LOCALE_JOBS: Record<string, string> = {
  USA: "jobs",
  FRANCE: "emplois",
  LATAM: "empleos",
};

const LOCALE_COMPANIES: Record<string, string> = {
  USA: "companies",
  FRANCE: "entreprises",
  LATAM: "empresas",
};

function cityToSlug(city: string) {
  return city.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [jobs, companies, usCities] = await Promise.all([
    getAllJobSlugs(),
    getAllCompanySlugs(),
    getCitiesWithCount("en"),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({ url: BASE, changeFrequency: "daily", priority: 1 });

  // Static market homepages
  for (const path of ["jobs", "emplois", "empleos", "empregos"]) {
    entries.push({ url: `${BASE}/${path}`, changeFrequency: "daily", priority: 0.9 });
  }

  // Category pages per locale
  for (const jobsPath of ["jobs", "emplois", "empleos", "empregos"]) {
    for (const cat of CATEGORIES) {
      entries.push({ url: `${BASE}/${jobsPath}/${cat}`, changeFrequency: "daily", priority: 0.8 });
    }
  }

  // Remote job pages
  entries.push({ url: `${BASE}/jobs/remote`, changeFrequency: "daily", priority: 0.85 });
  for (const cat of CATEGORIES) {
    entries.push({ url: `${BASE}/jobs/remote/${cat}`, changeFrequency: "daily", priority: 0.8 });
  }

  // Salary pages
  entries.push({ url: `${BASE}/salaries`, changeFrequency: "weekly", priority: 0.85 });
  for (const slug of getAllSalarySlugs()) {
    entries.push({ url: `${BASE}/salaries/${slug}`, changeFrequency: "weekly", priority: 0.8 });
  }

  // City landing pages (category + city combos for top US cities)
  const topCities = usCities.filter((c) => !["United States", "United Kingdom", "Brazil", "France", "Colombia"].includes(c.city));
  for (const tc of topCities.slice(0, 15)) {
    for (const cat of CATEGORIES) {
      entries.push({
        url: `${BASE}/jobs/${cat}/in/${cityToSlug(tc.city)}`,
        changeFrequency: "weekly",
        priority: 0.75,
      });
    }
  }

  // Job detail pages
  for (const job of jobs) {
    const jobsPath = LOCALE_JOBS[job.market] ?? "jobs";
    entries.push({
      url: `${BASE}/${jobsPath}/${job.category}/${job.company.slug}/${job.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Ressources / content pages (high SEO value)
  for (const slug of CONTENT_SLUGS) {
    entries.push({ url: `${BASE}/ressources/${slug}`, changeFrequency: "monthly", priority: 0.8 });
  }

  // Company pages
  for (const company of companies) {
    const companiesPath = LOCALE_COMPANIES[company.market] ?? "companies";
    entries.push({
      url: `${BASE}/${companiesPath}/${company.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return entries;
}
