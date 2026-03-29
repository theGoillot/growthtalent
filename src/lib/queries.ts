import { db } from "@/lib/db";
import type { Locale } from "@/dictionaries";

const MARKET_FOR_LOCALE: Record<string, "USA" | "FRANCE" | "LATAM"> = {
  en: "USA",
  fr: "FRANCE",
  es: "LATAM",
  pt: "LATAM",
};

export function marketForLocale(locale: Locale) {
  return MARKET_FOR_LOCALE[locale] ?? "USA";
}

export async function getJobs(opts: {
  locale: Locale;
  category?: string;
  city?: string;
  seniority?: string;
  remote?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  boostedFirst?: boolean;
}) {
  const { locale, category, city, seniority, remote, search, page = 1, limit = 30, boostedFirst = true } = opts;
  const market = marketForLocale(locale);

  const where = {
    market,
    status: "APPROVED" as const,
    ...(category && { category }),
    ...(city && { city: { contains: city, mode: "insensitive" as const } }),
    ...(seniority && { seniority: seniority as "MID" }),
    ...(remote && { remote: { not: "ONSITE" as const } }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { company: { name: { contains: search, mode: "insensitive" as const } } },
      ],
    }),
  };

  const [jobs, total] = await Promise.all([
    db.job.findMany({
      where,
      include: { company: { select: { name: true, slug: true, logoUrl: true, domain: true } } },
      orderBy: boostedFirst
        ? [{ isBoosted: "desc" }, { postedAt: "desc" }]
        : [{ postedAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
  ]);

  return { jobs, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getJobBySlug(slug: string, companySlug: string) {
  const company = await db.company.findUnique({ where: { slug: companySlug } });
  if (!company) return null;

  return db.job.findFirst({
    where: { slug, companyId: company.id, status: "APPROVED" },
    include: { company: true },
  });
}

export async function getJobById(id: string) {
  return db.job.findUnique({
    where: { id },
    include: { company: true },
  });
}

export async function getSimilarJobs(jobId: string, category: string, market: string, limit = 4) {
  return db.job.findMany({
    where: {
      category,
      market: market as "USA",
      status: "APPROVED",
      id: { not: jobId },
    },
    include: { company: { select: { name: true, slug: true, logoUrl: true } } },
    orderBy: { postedAt: "desc" },
    take: limit,
  });
}

export async function getCompanyBySlug(slug: string) {
  return db.company.findUnique({
    where: { slug },
    include: {
      jobs: {
        where: { status: "APPROVED" },
        orderBy: { postedAt: "desc" },
      },
    },
  });
}

export async function getCompanies(locale: Locale, page = 1, limit = 30) {
  const market = marketForLocale(locale);
  const [companies, total] = await Promise.all([
    db.company.findMany({
      where: { market },
      include: { _count: { select: { jobs: { where: { status: "APPROVED" } } } } },
      orderBy: { name: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.company.count({ where: { market } }),
  ]);
  return { companies, total, page, limit };
}

export async function getStats(locale: Locale) {
  const market = marketForLocale(locale);
  const [jobCount, companyCount] = await Promise.all([
    db.job.count({ where: { market, status: "APPROVED" } }),
    db.company.count({ where: { market } }),
  ]);
  return { jobCount, companyCount };
}

export async function getAllStats() {
  const [jobCount, companyCount, candidateCount] = await Promise.all([
    db.job.count({ where: { status: "APPROVED" } }),
    db.company.count(),
    db.candidate.count(),
  ]);
  return { jobCount, companyCount, candidateCount };
}

export async function getCategoriesWithCount(locale: Locale) {
  const market = marketForLocale(locale);
  const jobs = await db.job.groupBy({
    by: ["category"],
    where: { market, status: "APPROVED" },
    _count: true,
    orderBy: { _count: { category: "desc" } },
  });
  return jobs.map((j) => ({ category: j.category, count: j._count }));
}

export async function getCitiesWithCount(locale: Locale) {
  const market = marketForLocale(locale);
  const jobs = await db.job.groupBy({
    by: ["city"],
    where: { market, status: "APPROVED", city: { not: null } },
    _count: true,
    orderBy: { _count: { city: "desc" } },
  });
  return jobs
    .filter((j) => j.city)
    .map((j) => ({ city: j.city!, count: j._count }));
}

/** Get all approved job slugs for sitemap / generateStaticParams */
export async function getAllJobSlugs() {
  return db.job.findMany({
    where: { status: "APPROVED" },
    select: { slug: true, category: true, city: true, market: true, company: { select: { slug: true } } },
    orderBy: { postedAt: "desc" },
    take: 500,
  });
}

export async function getAllCompanySlugs() {
  return db.company.findMany({
    select: { slug: true, market: true },
    orderBy: { name: "asc" },
  });
}
