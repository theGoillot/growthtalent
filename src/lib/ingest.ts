import { db } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { classifyCategory } from "@/lib/categories";
import { moderateJob } from "@/lib/moderate";
import { enrichCompany } from "@/lib/enrich-company";

export interface IngestPayload {
  title: string;
  company_name: string;
  company_domain?: string;
  company_logo?: string;
  company_website?: string;
  description?: string;
  location?: string;
  city?: string;
  country?: string;
  remote?: boolean;
  salary_range?: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  seniority?: string;
  url: string; // original job posting URL (dedup key)
  apply_url?: string;
  source: string; // "mantiks" | "apify" | "manual"
  market: "usa" | "france" | "latam";
}

export interface IngestResult {
  status: "created" | "duplicate" | "error";
  jobId?: string;
  message?: string;
}

const MARKET_MAP = {
  usa: "USA" as const,
  france: "FRANCE" as const,
  latam: "LATAM" as const,
};

const SENIORITY_MAP: Record<string, "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "LEAD" | "MANAGER" | "DIRECTOR" | "VP" | "C_LEVEL"> = {
  intern: "INTERN",
  junior: "JUNIOR",
  mid: "MID",
  "mid-level": "MID",
  senior: "SENIOR",
  lead: "LEAD",
  manager: "MANAGER",
  director: "DIRECTOR",
  vp: "VP",
  "c-level": "C_LEVEL",
  cmo: "C_LEVEL",
  cto: "C_LEVEL",
};

export async function ingestJob(payload: IngestPayload): Promise<IngestResult> {
  try {
    // 1a. Dedup by source URL
    if (payload.url) {
      const existing = await db.job.findUnique({
        where: { sourceUrl: payload.url },
      });
      if (existing) {
        return { status: "duplicate", jobId: existing.id, message: "Job already exists (same URL)" };
      }
    }

    // 1b. Cross-source dedup: same company + very similar title + same city
    const companySlug = slugify(payload.company_name);
    const titleSlug = slugify(payload.title);
    const crossDupe = await db.job.findFirst({
      where: {
        slug: { startsWith: titleSlug.slice(0, 30) },
        company: { slug: companySlug },
        status: { not: "REJECTED" },
      },
    });
    if (crossDupe) {
      return { status: "duplicate", jobId: crossDupe.id, message: "Job already exists (cross-source)" };
    }

    // 2. Find or create company
    const company = await findOrCreateCompany(payload);

    // 3. Parse salary
    const salary = parseSalary(payload);

    // 4. Classify category
    const category = classifyCategory(payload.title);

    // 5. Parse seniority
    const seniority = payload.seniority
      ? SENIORITY_MAP[payload.seniority.toLowerCase()] ?? "MID"
      : inferSeniority(payload.title);

    // 6. Parse location
    const remote = payload.remote ? "REMOTE" : "ONSITE";
    const location = payload.location ?? ([payload.city, payload.country].filter(Boolean).join(", ") || null);

    // 7. Generate slug
    const baseSlug = slugify(`${payload.title}-${payload.company_name}`);
    const slug = baseSlug.slice(0, 80);

    // 8. Create job
    const market = MARKET_MAP[payload.market] ?? "USA";
    const job = await db.job.create({
      data: {
        title: payload.title,
        slug,
        description: payload.description,
        category,
        seniority,
        remote,
        city: payload.city,
        country: payload.country,
        location,
        salaryMin: salary.min,
        salaryMax: salary.max,
        salaryCurrency: salary.currency,
        applyUrl: payload.apply_url ?? payload.url,
        sourceUrl: payload.url,
        source: payload.source,
        market,
        status: "PENDING_REVIEW",
        companyId: company.id,
      },
    });

    // 9. AI moderation (fire and forget — don't block ingest)
    moderateJob(job.id).catch((err) => {
      console.error(`Moderation failed for job ${job.id}:`, err);
    });

    // 10. Auto-enrich company if new (fire and forget)
    enrichCompany(company.id).catch((err) => {
      console.error(`Company enrichment failed for ${company.id}:`, err);
    });

    return { status: "created", jobId: job.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Ingest error:", message);
    return { status: "error", message };
  }
}

async function findOrCreateCompany(payload: IngestPayload) {
  const domain = payload.company_domain ?? extractDomain(payload.company_website);

  // Try find by domain first
  if (domain) {
    const existing = await db.company.findUnique({ where: { domain } });
    if (existing) return existing;
  }

  // Try find by slug
  const slug = slugify(payload.company_name);
  const existingBySlug = await db.company.findUnique({ where: { slug } });
  if (existingBySlug) return existingBySlug;

  // Create new company
  const market = MARKET_MAP[payload.market] ?? "USA";
  return db.company.create({
    data: {
      name: payload.company_name,
      slug,
      domain,
      website: payload.company_website,
      logoUrl: payload.company_logo,
      market,
    },
  });
}

function extractDomain(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

interface ParsedSalary {
  min: number | null;
  max: number | null;
  currency: string | null;
}

function parseSalary(payload: IngestPayload): ParsedSalary {
  if (payload.salary_min && payload.salary_max) {
    return {
      min: payload.salary_min,
      max: payload.salary_max,
      currency: payload.salary_currency ?? guessCurrency(payload.market),
    };
  }

  if (!payload.salary_range) {
    return { min: null, max: null, currency: null };
  }

  const text = payload.salary_range;

  // Detect currency
  let currency = guessCurrency(payload.market);
  if (text.includes("$") || text.toLowerCase().includes("usd")) currency = "USD";
  if (text.includes("\u20ac") || text.toLowerCase().includes("eur")) currency = "EUR";
  if (text.toLowerCase().includes("brl") || text.toLowerCase().includes("r$")) currency = "BRL";

  // Extract numbers
  const numbers = text.match(/[\d]+[.,]?[\d]*/g);
  if (!numbers || numbers.length === 0) {
    return { min: null, max: null, currency: null };
  }

  const parsed = numbers.map((n) => {
    const clean = parseFloat(n.replace(",", ""));
    // If number looks like "55" or "120", assume it's in thousands
    return clean < 1000 ? clean * 1000 : clean;
  });

  return {
    min: Math.min(...parsed),
    max: parsed.length > 1 ? Math.max(...parsed) : Math.min(...parsed),
    currency,
  };
}

function guessCurrency(market: string): string {
  switch (market) {
    case "france": return "EUR";
    case "latam": return "USD";
    default: return "USD";
  }
}

function inferSeniority(title: string): "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "LEAD" | "MANAGER" | "DIRECTOR" | "VP" | "C_LEVEL" {
  const lower = title.toLowerCase();
  if (lower.includes("intern") || lower.includes("stage") || lower.includes("stagiaire")) return "INTERN";
  if (lower.includes("junior") || lower.includes("jr")) return "JUNIOR";
  if (lower.includes("senior") || lower.includes("sr") || lower.includes("confirmé")) return "SENIOR";
  if (lower.includes("lead")) return "LEAD";
  if (lower.includes("manager")) return "MANAGER";
  if (lower.includes("director") || lower.includes("directeur")) return "DIRECTOR";
  if (lower.includes("head of") || lower.includes("vp") || lower.includes("vice president")) return "VP";
  if (lower.includes("cmo") || lower.includes("chief")) return "C_LEVEL";
  return "MID";
}
