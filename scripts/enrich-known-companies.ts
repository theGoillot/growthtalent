import { Client } from "pg";
const DB_URL = process.argv[2];

const ENRICHMENTS: Record<string, { about: string; companyType: string; founded?: string; funding?: string; size?: string; industry?: string }> = {
  "conde-nast": { about: "Global media company. Home to Vogue, GQ, Vanity Fair, The New Yorker, WIRED, and more. One of the most influential media brands in fashion, culture, and lifestyle.", companyType: "corporate", founded: "1909", size: "500+", industry: "Media / Publishing" },
  "dialpad": { about: "AI-powered business communications platform. Cloud phone, video, messaging, and contact center. 1,100+ employees. $450M total funding. Used by Netflix, T-Mobile, Nasdaq.", companyType: "scaleup", founded: "2011", funding: "$450M Series F", size: "500+", industry: "SaaS / Telecom" },
  "mrbeast": { about: "The world largest YouTube creator (475M subscribers). Beast Industries builds content, consumer brands (Feastables), and media. 355 employees. $300M funding.", companyType: "scaleup", founded: "2012", funding: "$300M PE Round", size: "201-500", industry: "Media / Entertainment" },
  "cresta": { about: "Enterprise AI platform for contact centers. Real-time agent coaching, AI agents, and conversation intelligence. Used by Alaska Airlines, Cox, Intuit. 440 employees.", companyType: "scaleup", founded: "2017", funding: "$276M total", size: "201-500", industry: "AI / SaaS" },
  "procter-gamble": { about: "One of the world largest consumer goods companies. Brands include Tide, Pampers, Gillette, Head & Shoulders, Oral-B. 59,000+ employees. $85B annual revenue.", companyType: "corporate", founded: "1837", funding: "Public (NYSE: PG)", size: "500+", industry: "Consumer Goods" },
  "paula-s-choice-skincare": { about: "Research-based skincare brand. Fragrance-free, science-driven products. 413 employees, $250M revenue. Acquired by Unilever in 2021. DTC-first with 75% online sales.", companyType: "corporate", founded: "1995", funding: "Acquired by Unilever", size: "201-500", industry: "Beauty / DTC" },
  "starwood-hotels": { about: "Collection of luxury lifestyle hotel brands: Baccarat Hotels, 1 Hotels, and Treehouse Hotels. Design-forward, sustainability-driven hospitality. Backed by Starwood Capital Group ($115B AUM).", companyType: "corporate", founded: "2015", funding: "Starwood Capital Group", size: "500+", industry: "Luxury Hospitality" },
  "acqua-di-parma": { about: "Italian luxury fragrance and lifestyle brand. Part of LVMH. Known for Colonia fragrances, leather goods, and home collection. Founded in Parma, Italy.", companyType: "corporate", founded: "1916", funding: "Subsidiary of LVMH", size: "201-500", industry: "Luxury / Fragrance" },
  "airbus-helicopters": { about: "World leading helicopter manufacturer. Division of Airbus. Designs and produces civil and military rotorcraft. 20,000+ employees. Headquartered in Marignane, France.", companyType: "corporate", founded: "1992", funding: "Subsidiary of Airbus", size: "500+", industry: "Aerospace / Defense" },
  "samsung-electronics-mexico": { about: "Mexican division of Samsung Electronics. Consumer electronics, smartphones, home appliances, and semiconductors. Part of the Samsung Group ($230B+ revenue).", companyType: "corporate", founded: "1969", funding: "Public (KRX: 005930)", size: "500+", industry: "Electronics / Tech" },
  "80twenty": { about: "Top-rated staffing agency for marketing, creative, and sales talent. Connects high-growth companies with proven performers. 100% contingency, US-based. 300K+ LinkedIn followers.", companyType: "agency", founded: "2011", size: "11-50", industry: "Recruiting / Staffing" },
  "aquent": { about: "Global work solutions company specializing in marketing, creative, and digital talent. Staffing, managed services, and employer of record. 30+ years in business.", companyType: "agency", founded: "1986", size: "500+", industry: "Recruiting / Staffing" },
  "vml": { about: "Global marketing agency (part of WPP). Full-service: creative, media, commerce, technology, and data. Formed from the merger of VMLY&R and Wunderman Thompson.", companyType: "agency", founded: "2023", funding: "Subsidiary of WPP", size: "500+", industry: "Marketing Agency" },
  "harvey-nash": { about: "Global technology recruitment group. Executive search, interim management, and IT outsourcing across 40+ offices worldwide.", companyType: "agency", founded: "1988", size: "500+", industry: "Recruiting / Tech" },
  "bolt": { about: "European super-app for ride-hailing, food delivery, groceries, and scooters. 200M+ customers in 45+ countries. Headquartered in Tallinn, Estonia.", companyType: "scaleup", founded: "2013", funding: "$2.3B total", size: "500+", industry: "Mobility / Marketplace" },
  "mercor": { about: "AI-powered hiring platform. Matches companies with vetted global talent. YC-backed. Uses AI to screen, interview, and match candidates at scale.", companyType: "early-stage", founded: "2023", funding: "$32M Series A (Benchmark)", size: "11-50", industry: "HR Tech / AI" },
  "nango": { about: "Open-source unified API for integrations. Helps SaaS companies build product integrations 10x faster. YC-backed.", companyType: "early-stage", founded: "2022", funding: "$4.5M Seed", size: "1-10", industry: "Developer Tools / SaaS" },
  "who-gives-a-crap": { about: "Sustainable toilet paper and household products company. B Corp. Donates 50% of profits to improve sanitation in developing countries. DTC subscription model.", companyType: "scaleup", founded: "2012", funding: "$41.5M Series B", size: "51-200", industry: "Consumer Goods / DTC" },
  "four-hands": { about: "Austin-based furniture design and wholesale company. Inc. 5000 honoree. 800+ employees. B2B + DTC. Recognized as a Top Workplace multiple years running.", companyType: "corporate", founded: "1996", size: "500+", industry: "Furniture / Design" },
  "kate-spade-new-york": { about: "American luxury fashion brand known for handbags, clothing, jewelry, and home. Part of Tapestry Inc. (also owns Coach). Global retail presence.", companyType: "corporate", founded: "1993", funding: "Subsidiary of Tapestry", size: "500+", industry: "Luxury Fashion" },
  "veronica-beard": { about: "American contemporary fashion brand founded by sisters-in-law Veronica Miele Beard and Veronica Swanson Beard. Known for the Dickey Jacket.", companyType: "corporate", founded: "2010", size: "201-500", industry: "Fashion" },
  "puig": { about: "Spanish multinational fashion and fragrance company. Owns Carolina Herrera, Jean Paul Gaultier, Paco Rabanne, Charlotte Tilbury. $4B+ revenue.", companyType: "corporate", founded: "1914", funding: "Public (BME: PUIG)", size: "500+", industry: "Luxury / Fashion" },
  "tito-s-handmade-vodka": { about: "America number 1 selling vodka. Handmade in Austin, Texas since 1997. Independent, family-owned. Known for philanthropy and grassroots marketing.", companyType: "corporate", founded: "1997", size: "201-500", industry: "Spirits / Beverage" },
  "gossip-genie": { about: "Boutique social media agency in Chicago. Specializes in lifestyle, hospitality, and consumer brands. Strategy to daily posting to event content capture.", companyType: "agency", size: "1-10", industry: "Social Media Agency" },
  "milani-cosmetics": { about: "Affordable luxury cosmetics brand. Cruelty-free, high-quality makeup accessible to all. Strong DTC and retail presence (Target, Walmart, CVS).", companyType: "corporate", founded: "2001", size: "51-200", industry: "Beauty / Cosmetics" },
  "ilia-beauty": { about: "Clean beauty brand. Skin-centric makeup with active ingredients. B Corp certified. Sold at Sephora globally. Strong DTC + retail presence.", companyType: "scaleup", founded: "2011", size: "51-200", industry: "Clean Beauty / DTC" },
  "moroccanoil": { about: "Premium hair and body care brand. Known for the original argan oil treatment. Sold in 70+ countries at salons and retailers.", companyType: "corporate", founded: "2006", size: "201-500", industry: "Beauty / Haircare" },
  "netflix": { about: "Global streaming entertainment service with 280M+ paid memberships in 190+ countries. World largest content producer. Original series, films, and games.", companyType: "corporate", founded: "1997", funding: "Public (NASDAQ: NFLX)", size: "500+", industry: "Entertainment / Tech" },
  "peet-s-coffee": { about: "Specialty coffee roaster and retailer. Founded in Berkeley, CA. Known as the original craft coffee brand. Owned by JDE Peets (Euronext). 200+ stores.", companyType: "corporate", founded: "1966", funding: "Subsidiary of JDE Peets", size: "500+", industry: "Coffee / F&B" },
  "gotham-fc": { about: "Professional women soccer team in the NWSL. Based in New Jersey/New York. One of the original NWSL franchises.", companyType: "corporate", founded: "2007", size: "51-200", industry: "Professional Sports" },
  "creative-people": { about: "Creative staffing agency placing social media, design, and marketing talent at top brands. Contract and full-time placements.", companyType: "agency", size: "11-50", industry: "Creative Staffing" },
  "comity": { about: "Growth advisory and fractional growth leadership for B2B SaaS companies. Helps startups build and scale growth teams.", companyType: "agency", size: "1-10", industry: "Growth Consulting" },
  "opendorse": { about: "NIL (Name, Image, Likeness) marketplace connecting athletes with brands. The leading platform for athlete endorsement deals.", companyType: "scaleup", founded: "2012", funding: "$16M Series B", size: "51-200", industry: "Sports Tech" },
  "skinspirit": { about: "Medical aesthetics clinic chain. Botox, fillers, laser treatments, facials. 30+ locations across the US. Premium, results-driven approach.", companyType: "scaleup", founded: "2003", size: "201-500", industry: "Medical Aesthetics" },
};

async function main() {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
  
  let updated = 0;
  for (const [slug, data] of Object.entries(ENRICHMENTS)) {
    const sets: string[] = [`about = $1`, `"companyType" = $2`, `"updatedAt" = NOW()`];
    const vals: (string | null)[] = [data.about, data.companyType];
    let i = 3;
    
    if (data.founded) { sets.push(`founded = $${i}`); vals.push(data.founded); i++; }
    if (data.funding) { sets.push(`funding = $${i}`); vals.push(data.funding); i++; }
    if (data.size) { sets.push(`size = $${i}`); vals.push(data.size); i++; }
    if (data.industry) { sets.push(`industry = $${i}`); vals.push(data.industry); i++; }
    
    vals.push(slug);
    const result = await client.query(
      `UPDATE "Company" SET ${sets.join(", ")} WHERE slug = $${i}`,
      vals
    );
    
    if (result.rowCount && result.rowCount > 0) {
      console.log(`  ${slug}: updated`);
      updated++;
    } else {
      console.log(`  ${slug}: NOT FOUND`);
    }
  }
  
  console.log(`\nDone: ${updated} companies enriched with real data`);
  await client.end();
}

main().catch(console.error);
