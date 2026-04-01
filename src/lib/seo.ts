import type { Locale } from "@/dictionaries";

const BASE_URL = "https://www.growthtalent.org";

const JOBS_PATH: Record<Locale, string> = {
  en: "jobs",
  fr: "emplois",
  es: "empleos",
  pt: "empregos",
};

const COMPANIES_PATH: Record<Locale, string> = {
  en: "companies",
  fr: "entreprises",
  es: "empresas",
  pt: "empresas",
};

const LOCALE_LANG: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  es: "es",
  pt: "pt-BR",
};

/** Generate hreflang alternate links for a page */
export function hreflangLinks(path: string, currentLocale: Locale) {
  // path should be the locale-agnostic portion: e.g. "growth-marketing/san-francisco/head-of-growth-amplitude"
  const alternates: Record<string, string> = {};
  for (const locale of ["en", "fr", "es", "pt"] as Locale[]) {
    alternates[LOCALE_LANG[locale]] = `${BASE_URL}/${JOBS_PATH[locale]}/${path}`;
  }
  alternates["x-default"] = `${BASE_URL}/${JOBS_PATH.en}/${path}`;
  return alternates;
}

export function jobUrl(locale: Locale, category: string, companySlug: string, jobSlug: string) {
  return `${BASE_URL}/${JOBS_PATH[locale]}/${category}/${companySlug}/${jobSlug}`;
}

export function categoryUrl(locale: Locale, category: string) {
  return `${BASE_URL}/${JOBS_PATH[locale]}/${category}`;
}

export function companyUrl(locale: Locale, companySlug: string) {
  return `${BASE_URL}/${COMPANIES_PATH[locale]}/${companySlug}`;
}

/** Map Prisma Contract enum → schema.org employmentType */
const EMPLOYMENT_TYPE: Record<string, string> = {
  FULL_TIME: "FULL_TIME",
  PART_TIME: "PART_TIME",
  CONTRACT: "CONTRACTOR",
  FREELANCE: "CONTRACTOR",
  INTERNSHIP: "INTERN",
};

/** Google Jobs JSON-LD for a job posting */
export function jobJsonLd(job: {
  title: string;
  description: string | null;
  location: string | null;
  city: string | null;
  country: string | null;
  remote: string;
  contractType: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  postedAt: Date;
  expiresAt: Date | null;
  applyUrl: string | null;
  company: {
    name: string;
    website: string | null;
    logoUrl: string | null;
  };
}) {
  const isRemote = job.remote !== "ONSITE" && job.remote !== "HYBRID";
  const validThrough = job.expiresAt
    ? job.expiresAt.toISOString().split("T")[0]
    : new Date(job.postedAt.getTime() + 60 * 86400000).toISOString().split("T")[0]; // 60 days default

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description ?? `${job.title} at ${job.company.name}`,
    datePosted: job.postedAt.toISOString().split("T")[0],
    validThrough,
    employmentType: EMPLOYMENT_TYPE[job.contractType ?? "FULL_TIME"] ?? "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name,
      ...(job.company.website && { sameAs: job.company.website }),
      ...(job.company.logoUrl && { logo: job.company.logoUrl }),
    },
    jobLocationType: isRemote ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: isRemote
      ? { "@type": "Country", name: job.country ?? "US" }
      : undefined,
    jobLocation: !isRemote && job.city
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.city,
            addressCountry: job.country,
          },
        }
      : undefined,
  };

  if (job.salaryMin && job.salaryMax && job.salaryCurrency) {
    jsonLd.baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.salaryCurrency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: "YEAR",
      },
    };
  }

  if (job.applyUrl) {
    jsonLd.directApply = true;
  }

  // Remove undefined values
  return JSON.stringify(jsonLd, (_, v) => (v === undefined ? undefined : v));
}

/** BreadcrumbList JSON-LD */
export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

/** FAQPage JSON-LD for category pages */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  });
}

/** ItemList JSON-LD for category/listing pages */
export function jobListJsonLd(
  jobs: { title: string; category: string; slug: string; company: { slug: string } }[],
  locale: Locale
) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: jobs.slice(0, 20).map((job, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: jobUrl(locale, job.category, job.company.slug, job.slug),
    })),
  });
}
