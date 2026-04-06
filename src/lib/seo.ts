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

/** Normalize messy country field to ISO 3166-1 alpha-2 */
const US_STATES = new Set(["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"]);
function normalizeCountry(raw: string | null, market?: string): string {
  if (!raw) return market === "FRANCE" ? "FR" : market === "LATAM" ? "US" : "US";
  const upper = raw.toUpperCase().trim();
  if (US_STATES.has(upper)) return "US";
  if (["US", "USA", "UNITED STATES"].includes(upper)) return "US";
  if (["FR", "FRANCE"].includes(upper)) return "FR";
  if (["BR", "BRAZIL"].includes(upper)) return "BR";
  if (["MX", "MEXICO"].includes(upper)) return "MX";
  if (["CO", "COLOMBIA"].includes(upper)) return "CO";
  if (["CA", "CANADA"].includes(upper)) return "CA";
  if (["GB", "UK", "UNITED KINGDOM"].includes(upper)) return "GB";
  // If it looks like a metro area or city name, fall back to market
  if (raw.includes("Metropolitan") || raw.includes("Area") || raw.includes("Greater")) {
    return market === "FRANCE" ? "FR" : "US";
  }
  return raw.length === 2 ? raw : "US"; // trust 2-letter codes, else US
}

/** Map category slug → BLS occupational category */
const OCCUPATIONAL_CATEGORY: Record<string, string> = {
  "growth-marketing": "13-1161.00 Market Research Analysts and Marketing Specialists",
  "product-marketing": "11-2021.00 Marketing Managers",
  "demand-generation": "13-1161.00 Market Research Analysts and Marketing Specialists",
  "growth-engineering": "15-1252.00 Software Developers",
  "marketing-ops": "13-1161.00 Market Research Analysts and Marketing Specialists",
  "content-marketing": "27-3043.00 Writers and Authors",
  "performance-marketing": "13-1161.00 Market Research Analysts and Marketing Specialists",
  "crm-lifecycle": "13-1161.00 Market Research Analysts and Marketing Specialists",
  "seo": "15-1255.00 Web and Digital Interface Designers",
  "data-analytics": "15-2051.00 Data Scientists",
  "brand-marketing": "11-2021.00 Marketing Managers",
  "social-media": "27-3031.00 Public Relations Specialists",
  "partnerships": "11-2022.00 Sales Managers",
  "head-of-growth": "11-2021.00 Marketing Managers",
  "vp-marketing": "11-2021.00 Marketing Managers",
  "cmo": "11-1011.00 Chief Executives",
};

/** Google Jobs JSON-LD for a job posting */
export function jobJsonLd(job: {
  title: string;
  description: string | null;
  category: string;
  location: string | null;
  city: string | null;
  country: string | null;
  market: string;
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
    domain: string | null;
  };
}) {
  const isRemote = job.remote !== "ONSITE" && job.remote !== "HYBRID";
  const countryCode = normalizeCountry(job.country, job.market);
  const validThrough = job.expiresAt
    ? job.expiresAt.toISOString().split("T")[0]
    : new Date(job.postedAt.getTime() + 60 * 86400000).toISOString().split("T")[0]; // 60 days default

  const logoUrl = job.company.logoUrl
    || (job.company.domain ? `https://www.google.com/s2/favicons?domain=${job.company.domain}&sz=128` : undefined);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description ?? `${job.title} at ${job.company.name}`,
    datePosted: job.postedAt.toISOString().split("T")[0],
    validThrough,
    employmentType: EMPLOYMENT_TYPE[job.contractType ?? "FULL_TIME"] ?? "FULL_TIME",
    occupationalCategory: OCCUPATIONAL_CATEGORY[job.category],
    industry: job.company.website ? "Technology" : undefined,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name,
      ...(job.company.website && { sameAs: job.company.website }),
      ...(logoUrl && { logo: logoUrl }),
    },
    jobLocationType: isRemote ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: isRemote
      ? { "@type": "Country", name: countryCode }
      : undefined,
    jobLocation: !isRemote && job.city
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.city,
            addressCountry: countryCode,
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
