import { PrismaClient } from "../src/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_DATABASE_URL! });
const db = new PrismaClient({ adapter });

const COMPANIES = [
  // USA
  { name: "Amplitude", slug: "amplitude", domain: "amplitude.com", website: "https://amplitude.com", market: "USA" as const, size: "201-500", industry: "Analytics" },
  { name: "Notion", slug: "notion", domain: "notion.so", website: "https://notion.so", market: "USA" as const, size: "501-1000", industry: "SaaS" },
  { name: "Figma", slug: "figma", domain: "figma.com", website: "https://figma.com", market: "USA" as const, size: "501-1000", industry: "Design" },
  { name: "Ramp", slug: "ramp", domain: "ramp.com", website: "https://ramp.com", market: "USA" as const, size: "201-500", industry: "Fintech" },
  { name: "Linear", slug: "linear", domain: "linear.app", website: "https://linear.app", market: "USA" as const, size: "51-200", industry: "SaaS" },
  // France
  { name: "Qonto", slug: "qonto", domain: "qonto.com", website: "https://qonto.com", market: "FRANCE" as const, size: "501-1000", industry: "Fintech" },
  { name: "Pennylane", slug: "pennylane", domain: "pennylane.com", website: "https://pennylane.com", market: "FRANCE" as const, size: "201-500", industry: "Fintech" },
  { name: "Contentsquare", slug: "contentsquare", domain: "contentsquare.com", website: "https://contentsquare.com", market: "FRANCE" as const, size: "1001-5000", industry: "Analytics" },
  { name: "Pigment", slug: "pigment", domain: "pigment.com", website: "https://pigment.com", market: "FRANCE" as const, size: "201-500", industry: "SaaS" },
  { name: "Alan", slug: "alan", domain: "alan.com", website: "https://alan.com", market: "FRANCE" as const, size: "501-1000", industry: "Insurtech" },
  // LatAm
  { name: "Rappi", slug: "rappi", domain: "rappi.com", website: "https://rappi.com", market: "LATAM" as const, size: "5000+", industry: "Marketplace" },
  { name: "Kavak", slug: "kavak", domain: "kavak.com", website: "https://kavak.com", market: "LATAM" as const, size: "1001-5000", industry: "Marketplace" },
  { name: "Nubank", slug: "nubank", domain: "nubank.com.br", website: "https://nubank.com.br", market: "LATAM" as const, size: "5000+", industry: "Fintech" },
];

const JOBS = [
  // USA
  { title: "Head of Growth", company: "amplitude", category: "head-of-growth", seniority: "VP" as const, city: "San Francisco", country: "US", remote: "HYBRID" as const, salaryMin: 180000, salaryMax: 250000, currency: "USD", market: "USA" as const },
  { title: "Senior Growth Marketing Manager", company: "notion", category: "growth-marketing", seniority: "SENIOR" as const, city: "New York", country: "US", remote: "HYBRID" as const, salaryMin: 140000, salaryMax: 180000, currency: "USD", market: "USA" as const },
  { title: "Growth Product Manager", company: "figma", category: "product-marketing", seniority: "SENIOR" as const, city: "San Francisco", country: "US", remote: "REMOTE" as const, salaryMin: 160000, salaryMax: 210000, currency: "USD", market: "USA" as const },
  { title: "Performance Marketing Lead", company: "ramp", category: "performance-marketing", seniority: "LEAD" as const, city: "New York", country: "US", remote: "HYBRID" as const, salaryMin: 150000, salaryMax: 190000, currency: "USD", market: "USA" as const },
  { title: "SEO Manager", company: "linear", category: "seo", seniority: "MID" as const, city: null, country: "US", remote: "REMOTE_WORLD" as const, salaryMin: 100000, salaryMax: 140000, currency: "USD", market: "USA" as const },
  { title: "Demand Generation Manager", company: "amplitude", category: "demand-generation", seniority: "MID" as const, city: "San Francisco", country: "US", remote: "HYBRID" as const, salaryMin: 110000, salaryMax: 150000, currency: "USD", market: "USA" as const },
  { title: "Growth Engineer", company: "notion", category: "growth-engineering", seniority: "SENIOR" as const, city: "San Francisco", country: "US", remote: "REMOTE" as const, salaryMin: 170000, salaryMax: 220000, currency: "USD", market: "USA" as const },
  { title: "CRM & Lifecycle Manager", company: "ramp", category: "crm-lifecycle", seniority: "MID" as const, city: "New York", country: "US", remote: "HYBRID" as const, salaryMin: 95000, salaryMax: 130000, currency: "USD", market: "USA" as const },
  { title: "Content Marketing Manager", company: "linear", category: "content-marketing", seniority: "MID" as const, city: null, country: "US", remote: "REMOTE_WORLD" as const, salaryMin: 90000, salaryMax: 125000, currency: "USD", market: "USA" as const },
  { title: "Marketing Analytics Lead", company: "figma", category: "data-analytics", seniority: "LEAD" as const, city: "San Francisco", country: "US", remote: "HYBRID" as const, salaryMin: 145000, salaryMax: 185000, currency: "USD", market: "USA" as const },
  // France
  { title: "Head of Growth", company: "qonto", category: "head-of-growth", seniority: "VP" as const, city: "Paris", country: "FR", remote: "HYBRID" as const, salaryMin: 85000, salaryMax: 120000, currency: "EUR", market: "FRANCE" as const },
  { title: "Growth Manager", company: "pennylane", category: "growth-marketing", seniority: "MID" as const, city: "Paris", country: "FR", remote: "HYBRID" as const, salaryMin: 55000, salaryMax: 70000, currency: "EUR", market: "FRANCE" as const },
  { title: "Senior SEO Manager", company: "contentsquare", category: "seo", seniority: "SENIOR" as const, city: "Paris", country: "FR", remote: "REMOTE_FRANCE" as const, salaryMin: 65000, salaryMax: 85000, currency: "EUR", market: "FRANCE" as const },
  { title: "Performance Marketing Manager", company: "pigment", category: "performance-marketing", seniority: "MID" as const, city: "Paris", country: "FR", remote: "HYBRID" as const, salaryMin: 50000, salaryMax: 65000, currency: "EUR", market: "FRANCE" as const },
  { title: "Product Marketing Manager", company: "alan", category: "product-marketing", seniority: "MID" as const, city: "Paris", country: "FR", remote: "REMOTE_EU" as const, salaryMin: 58000, salaryMax: 75000, currency: "EUR", market: "FRANCE" as const },
  { title: "Growth Engineer", company: "qonto", category: "growth-engineering", seniority: "SENIOR" as const, city: "Paris", country: "FR", remote: "HYBRID" as const, salaryMin: 70000, salaryMax: 90000, currency: "EUR", market: "FRANCE" as const },
  { title: "CRM Manager", company: "pennylane", category: "crm-lifecycle", seniority: "MID" as const, city: "Paris", country: "FR", remote: "HYBRID" as const, salaryMin: 48000, salaryMax: 60000, currency: "EUR", market: "FRANCE" as const },
  { title: "Demand Gen Lead", company: "contentsquare", category: "demand-generation", seniority: "LEAD" as const, city: "Paris", country: "FR", remote: "HYBRID" as const, salaryMin: 70000, salaryMax: 90000, currency: "EUR", market: "FRANCE" as const },
  { title: "Brand Marketing Manager", company: "alan", category: "brand-marketing", seniority: "MID" as const, city: "Paris", country: "FR", remote: "HYBRID" as const, salaryMin: 52000, salaryMax: 68000, currency: "EUR", market: "FRANCE" as const },
  { title: "Marketing Ops Manager", company: "pigment", category: "marketing-ops", seniority: "MID" as const, city: "Paris", country: "FR", remote: "REMOTE_EU" as const, salaryMin: 55000, salaryMax: 72000, currency: "EUR", market: "FRANCE" as const },
  // LatAm
  { title: "Growth Marketing Manager", company: "rappi", category: "growth-marketing", seniority: "MID" as const, city: "Bogota", country: "CO", remote: "HYBRID" as const, salaryMin: 35000, salaryMax: 50000, currency: "USD", market: "LATAM" as const },
  { title: "Head of Growth", company: "kavak", category: "head-of-growth", seniority: "VP" as const, city: "Mexico City", country: "MX", remote: "ONSITE" as const, salaryMin: 60000, salaryMax: 90000, currency: "USD", market: "LATAM" as const },
  { title: "Performance Marketing Analyst", company: "nubank", category: "performance-marketing", seniority: "JUNIOR" as const, city: "Sao Paulo", country: "BR", remote: "HYBRID" as const, salaryMin: 25000, salaryMax: 40000, currency: "USD", market: "LATAM" as const },
  { title: "SEO Specialist", company: "rappi", category: "seo", seniority: "MID" as const, city: "Bogota", country: "CO", remote: "REMOTE" as const, salaryMin: 30000, salaryMax: 45000, currency: "USD", market: "LATAM" as const },
  { title: "Content Marketing Lead", company: "kavak", category: "content-marketing", seniority: "LEAD" as const, city: "Mexico City", country: "MX", remote: "HYBRID" as const, salaryMin: 40000, salaryMax: 60000, currency: "USD", market: "LATAM" as const },
  { title: "Growth Data Analyst", company: "nubank", category: "data-analytics", seniority: "MID" as const, city: "Sao Paulo", country: "BR", remote: "REMOTE" as const, salaryMin: 35000, salaryMax: 55000, currency: "USD", market: "LATAM" as const },
  { title: "CRM Lifecycle Manager", company: "rappi", category: "crm-lifecycle", seniority: "SENIOR" as const, city: "Bogota", country: "CO", remote: "HYBRID" as const, salaryMin: 40000, salaryMax: 55000, currency: "USD", market: "LATAM" as const },
  { title: "Social Media Manager", company: "kavak", category: "social-media", seniority: "JUNIOR" as const, city: "Mexico City", country: "MX", remote: "ONSITE" as const, salaryMin: 20000, salaryMax: 30000, currency: "USD", market: "LATAM" as const },
  { title: "Growth Engineer", company: "nubank", category: "growth-engineering", seniority: "SENIOR" as const, city: "Sao Paulo", country: "BR", remote: "REMOTE" as const, salaryMin: 50000, salaryMax: 75000, currency: "USD", market: "LATAM" as const },
  { title: "Partnerships Manager", company: "rappi", category: "partnerships", seniority: "MID" as const, city: "Bogota", country: "CO", remote: "HYBRID" as const, salaryMin: 32000, salaryMax: 48000, currency: "USD", market: "LATAM" as const },
];

async function seed() {
  console.log("Seeding database...");

  // Create companies
  const companyMap: Record<string, string> = {};
  for (const c of COMPANIES) {
    const company = await db.company.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    companyMap[c.slug] = company.id;
    console.log(`  Company: ${c.name} (${c.market})`);
  }

  // Create jobs
  let count = 0;
  for (const j of JOBS) {
    const companyId = companyMap[j.company];
    if (!companyId) {
      console.error(`  Company not found: ${j.company}`);
      continue;
    }

    const slug = j.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + j.company;
    const location = [j.city, j.country].filter(Boolean).join(", ");

    await db.job.upsert({
      where: { slug_companyId: { slug, companyId } },
      update: {},
      create: {
        title: j.title,
        slug,
        category: j.category,
        seniority: j.seniority,
        remote: j.remote,
        city: j.city,
        country: j.country,
        location: location || null,
        salaryMin: j.salaryMin,
        salaryMax: j.salaryMax,
        salaryCurrency: j.currency,
        market: j.market,
        status: "APPROVED",
        source: "seed",
        companyId,
        description: `Join ${COMPANIES.find((c) => c.slug === j.company)?.name} as a ${j.title}. This is a great opportunity to work with a leading ${COMPANIES.find((c) => c.slug === j.company)?.industry} company.`,
        applyUrl: `https://${j.company}.com/careers`,
      },
    });
    count++;
  }

  console.log(`\nSeeded ${COMPANIES.length} companies and ${count} jobs.`);
  console.log("Done!");
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect());
