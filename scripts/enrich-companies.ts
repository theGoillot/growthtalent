/**
 * Batch company enrichment — uses Exa MCP for research.
 * Run via: npx tsx scripts/enrich-companies.ts
 *
 * Since we can't call Exa from a script directly, this generates
 * SQL UPDATE statements based on well-known company data.
 * For unknown companies, it sets sensible defaults from the domain.
 */

const SUPABASE_REF = "itzwiqrxawltinfuyupw";
const SUPABASE_TOKEN = "sbp_901949668d18dfe48d96f4d2388157c309c9dd60";

// Well-known companies with curated data
const KNOWN_COMPANIES: Record<string, {
  about: string;
  companyType: string;
  founded?: string;
  funding?: string;
  size?: string;
  industry?: string;
}> = {
  "linkedin.com": {
    about: "The world's largest professional network with 1B+ members. Owned by Microsoft. Products include LinkedIn Jobs, LinkedIn Learning, Sales Navigator, and Marketing Solutions.",
    companyType: "corporate", founded: "2003", funding: "Public (Microsoft, $26.2B acquisition)", size: "500+", industry: "Social Network / Tech"
  },
  "netflix.com": {
    about: "Global streaming entertainment service with 280M+ paid memberships. Produces original content across 190+ countries.",
    companyType: "corporate", founded: "1997", funding: "Public (NASDAQ: NFLX)", size: "500+", industry: "Entertainment / Tech"
  },
  "adidas.com": {
    about: "Global sportswear brand. One of the largest athletic shoe and apparel manufacturers. Headquartered in Herzogenaurach, Germany.",
    companyType: "corporate", founded: "1949", funding: "Public (ETR: ADS)", size: "500+", industry: "Sportswear / Retail"
  },
  "figma.com": {
    about: "Collaborative design platform used by millions of designers and developers. The standard for UI/UX design, prototyping, and design systems.",
    companyType: "scaleup", founded: "2012", funding: "$332M Series E", size: "201-500", industry: "Design Tools / SaaS"
  },
  "notion.so": {
    about: "All-in-one workspace for notes, docs, wikis, and project management. Used by teams at startups and Fortune 500 companies.",
    companyType: "scaleup", founded: "2013", funding: "$343M Series C ($10B valuation)", size: "201-500", industry: "Productivity / SaaS"
  },
  "amplitude.com": {
    about: "Digital analytics platform helping companies understand user behavior. Product analytics for growth, product, and data teams.",
    companyType: "scaleup", founded: "2012", funding: "Public (NASDAQ: AMPL)", size: "201-500", industry: "Analytics / SaaS"
  },
  "linear.app": {
    about: "Modern issue tracking and project management tool built for software teams. Known for speed, keyboard shortcuts, and developer experience.",
    companyType: "scaleup", founded: "2019", funding: "$52M Series B (Accel)", size: "51-200", industry: "Developer Tools / SaaS"
  },
  "ramp.com": {
    about: "Corporate card and spend management platform. The fastest-growing fintech in US history. Helps businesses control spend and save money.",
    companyType: "scaleup", founded: "2019", funding: "$1.6B total ($7.65B valuation)", size: "500+", industry: "Fintech / SaaS"
  },
  "rappi.com": {
    about: "Latin America's leading super-app for delivery, payments, and commerce. Operates across 9 countries including Colombia, Mexico, Brazil, Argentina.",
    companyType: "scaleup", founded: "2015", funding: "$2.2B total (SoftBank)", size: "500+", industry: "Delivery / Marketplace"
  },
  "nubank.com.br": {
    about: "World's largest digital bank by number of customers (100M+). Headquartered in Brazil, operating across Latin America. Known for zero-fee banking and purple brand.",
    companyType: "corporate", founded: "2013", funding: "Public (NYSE: NU)", size: "500+", industry: "Fintech / Banking"
  },
  "kavak.com": {
    about: "Latin America's largest used car marketplace. End-to-end platform for buying, selling, and financing pre-owned vehicles. First Mexican unicorn.",
    companyType: "scaleup", founded: "2016", funding: "$900M+ ($8.7B peak valuation)", size: "500+", industry: "Automotive / Marketplace"
  },
  "qonto.com": {
    about: "European business finance solution for SMEs and freelancers. All-in-one banking, invoicing, bookkeeping, and spend management. 500K+ customers.",
    companyType: "scaleup", founded: "2016", funding: "$622M Series D", size: "500+", industry: "Fintech / SaaS"
  },
  "contentsquare.com": {
    about: "Digital experience analytics platform. AI-powered insights into how users interact with websites and apps. Used by 1,300+ brands globally.",
    companyType: "scaleup", founded: "2012", funding: "$1.4B total (SoftBank)", size: "500+", industry: "Analytics / SaaS"
  },
  "pigment.com": {
    about: "Business planning platform for finance and revenue teams. Real-time forecasting, budgeting, and scenario modeling. Fast-growing French SaaS.",
    companyType: "scaleup", founded: "2019", funding: "$393M Series D", size: "201-500", industry: "FP&A / SaaS"
  },
  "tmz.com": {
    about: "Celebrity news and entertainment media outlet. Known for breaking entertainment news. Owned by FOX Entertainment.",
    companyType: "corporate", founded: "2005", funding: "Subsidiary of FOX", size: "201-500", industry: "Media / Entertainment"
  },
  "procter-gamble.com": {
    about: "Multinational consumer goods corporation. Brands include Tide, Pampers, Gillette, and more. One of the world's largest advertisers.",
    companyType: "corporate", founded: "1837", funding: "Public (NYSE: PG)", size: "500+", industry: "Consumer Goods"
  },
  "puma.com": {
    about: "Global athletic and casual footwear, apparel, and accessories brand. Third-largest sportswear manufacturer in the world.",
    companyType: "corporate", founded: "1948", funding: "Public (ETR: PUM)", size: "500+", industry: "Sportswear / Retail"
  },
  "ferragamo.com": {
    about: "Italian luxury fashion house specializing in shoes, leather goods, and ready-to-wear. Founded in Florence.",
    companyType: "corporate", founded: "1927", funding: "Public (BIT: SFER)", size: "500+", industry: "Luxury Fashion"
  },
  "uniqlo.com": {
    about: "Japanese casual wear designer and retailer. Part of Fast Retailing, one of the world's largest apparel companies.",
    companyType: "corporate", founded: "1984", funding: "Public (TYO: 9983)", size: "500+", industry: "Fashion / Retail"
  },
  "geico.com": {
    about: "One of the largest auto insurance companies in the US. Subsidiary of Berkshire Hathaway. Known for competitive rates and the gecko mascot.",
    companyType: "corporate", founded: "1936", funding: "Subsidiary of Berkshire Hathaway", size: "500+", industry: "Insurance"
  },
  "balenciaga.com": {
    about: "Spanish luxury fashion house owned by Kering. Known for avant-garde designs, oversized silhouettes, and high-fashion streetwear.",
    companyType: "corporate", founded: "1917", funding: "Subsidiary of Kering", size: "500+", industry: "Luxury Fashion"
  },
  "j-crew.com": {
    about: "American multi-brand fashion retailer. Known for preppy casual clothing, workwear, and accessories.",
    companyType: "corporate", founded: "1983", funding: "Private", size: "500+", industry: "Fashion / Retail"
  },
  "pennylane.com": {
    about: "French accounting and financial management platform for SMBs and accountants. All-in-one invoicing, banking, and bookkeeping.",
    companyType: "scaleup", founded: "2020", funding: "$82M Series C", size: "201-500", industry: "Fintech / SaaS"
  },
  "withallo.com": {
    about: "AI business phone for SMBs. Calls, texts, voicemail with AI transcription, summaries, and CRM sync. 5,000+ businesses. $32/user.",
    companyType: "early-stage", founded: "2024", funding: "$12M Seed (Base10, Lightspeed, Emblem)", size: "11-50", industry: "SaaS / Telecom"
  },
  "courir.com": {
    about: "French sneaker retailer. Largest sneaker specialty chain in France with 300+ stores. Focused on sneaker culture and streetwear.",
    companyType: "corporate", founded: "1980", funding: "Private (owned by Equistone)", size: "500+", industry: "Fashion / Retail"
  },
  "mercor.com": {
    about: "AI-powered hiring platform. Matches companies with vetted global talent. YC-backed.",
    companyType: "early-stage", founded: "2023", funding: "$32M Series A (Benchmark)", size: "11-50", industry: "HR Tech / AI"
  },
};

async function query(sql: string) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${SUPABASE_REF}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SUPABASE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  return res.json();
}

function inferCompanyType(name: string, domain: string): string {
  const n = name.toLowerCase();
  if (n.includes("agency") || n.includes("studio") || n.includes("creative")) return "agency";
  if (n.includes("venture") || n.includes("capital")) return "corporate";
  return "early-stage"; // default for unknown companies
}

async function main() {
  // Get all companies needing enrichment
  const companies = await query(`
    SELECT id, name, slug, domain
    FROM "Company"
    WHERE about IS NULL
      AND EXISTS (SELECT 1 FROM "Job" j WHERE j."companyId" = "Company".id AND j.status = 'APPROVED')
    ORDER BY name
  `) as { id: string; name: string; slug: string; domain: string }[];

  console.log(`\nEnriching ${companies.length} companies...\n`);

  let enriched = 0;
  let defaults = 0;

  for (const company of companies) {
    const domain = company.domain?.replace(/^www\./, "").toLowerCase();
    const known = domain ? KNOWN_COMPANIES[domain] : null;

    if (known) {
      const aboutSql = known.about.replace(/'/g, "''");
      await query(`
        UPDATE "Company" SET
          about = '${aboutSql}',
          "companyType" = '${known.companyType}',
          ${known.founded ? `founded = '${known.founded}',` : ""}
          ${known.funding ? `funding = '${known.funding.replace(/'/g, "''")}',` : ""}
          ${known.size ? `size = '${known.size}',` : ""}
          ${known.industry ? `industry = '${known.industry}',` : ""}
          "updatedAt" = NOW()
        WHERE id = '${company.id}'
      `);
      console.log(`  ${company.name}: enriched (known)`);
      enriched++;
    } else {
      // Set defaults for unknown companies
      const companyType = inferCompanyType(company.name, company.domain);
      await query(`
        UPDATE "Company" SET
          "companyType" = '${companyType}',
          "updatedAt" = NOW()
        WHERE id = '${company.id}'
      `);
      console.log(`  ${company.name}: defaults (${companyType})`);
      defaults++;
    }
  }

  console.log(`\nDone: ${enriched} enriched, ${defaults} defaults set`);
}

main().catch(console.error);
