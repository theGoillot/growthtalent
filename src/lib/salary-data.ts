/**
 * Salary data by role, seniority, and city.
 * Based on 2026 US market data from job listings + industry benchmarks.
 */

export interface SalaryRange {
  min: number;
  max: number;
  median: number;
}

export interface RoleSalaryData {
  slug: string;
  title: string;
  category: string;
  description: string;
  bySeniority: Record<string, SalaryRange>;
  byCity: Record<string, SalaryRange>;
  topSkills: string[];
  relatedRoles: string[];
}

export const SALARY_DATA: RoleSalaryData[] = [
  {
    slug: "growth-marketing-manager",
    title: "Growth Marketing Manager",
    category: "growth-marketing",
    description: "Growth Marketing Managers own the full funnel \u2014 from acquisition to retention. They run experiments, analyze data, and scale what works across paid, organic, and product channels.",
    bySeniority: {
      "Junior (0-2 yrs)": { min: 55000, max: 80000, median: 67000 },
      "Mid (2-5 yrs)": { min: 80000, max: 120000, median: 100000 },
      "Senior (5-8 yrs)": { min: 120000, max: 170000, median: 145000 },
      "Lead/Director": { min: 150000, max: 220000, median: 185000 },
      "VP/Head of": { min: 180000, max: 280000, median: 230000 },
    },
    byCity: {
      "New York": { min: 90000, max: 180000, median: 130000 },
      "San Francisco": { min: 100000, max: 200000, median: 145000 },
      "Austin": { min: 75000, max: 150000, median: 110000 },
      "Chicago": { min: 70000, max: 140000, median: 105000 },
      "Remote (US)": { min: 80000, max: 170000, median: 120000 },
    },
    topSkills: ["A/B Testing", "SQL", "Google Analytics", "Paid Acquisition", "Funnel Optimization"],
    relatedRoles: ["head-of-growth", "performance-marketing-manager", "product-marketing-manager"],
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    category: "social-media",
    description: "Social Media Managers build and manage a brand\u2019s presence across Instagram, TikTok, LinkedIn, and other platforms. They create content, manage communities, and drive engagement.",
    bySeniority: {
      "Junior (0-2 yrs)": { min: 40000, max: 60000, median: 50000 },
      "Mid (2-5 yrs)": { min: 60000, max: 90000, median: 75000 },
      "Senior (5-8 yrs)": { min: 85000, max: 130000, median: 105000 },
      "Lead/Director": { min: 110000, max: 160000, median: 135000 },
    },
    byCity: {
      "New York": { min: 55000, max: 130000, median: 85000 },
      "San Francisco": { min: 60000, max: 140000, median: 90000 },
      "Los Angeles": { min: 50000, max: 120000, median: 80000 },
      "Chicago": { min: 45000, max: 100000, median: 70000 },
      "Remote (US)": { min: 50000, max: 110000, median: 75000 },
    },
    topSkills: ["Content Creation", "TikTok", "Instagram", "Community Management", "Analytics"],
    relatedRoles: ["content-marketing-manager", "brand-marketing-manager"],
  },
  {
    slug: "head-of-growth",
    title: "Head of Growth",
    category: "head-of-growth",
    description: "Heads of Growth own the company\u2019s growth strategy end-to-end. They lead teams across acquisition, activation, retention, and monetization, and are accountable for the revenue number.",
    bySeniority: {
      "Head of Growth": { min: 140000, max: 220000, median: 180000 },
      "VP Growth": { min: 180000, max: 280000, median: 230000 },
      "C-Level (CMO/CGO)": { min: 220000, max: 400000, median: 300000 },
    },
    byCity: {
      "New York": { min: 160000, max: 280000, median: 210000 },
      "San Francisco": { min: 170000, max: 300000, median: 230000 },
      "Austin": { min: 130000, max: 220000, median: 170000 },
      "Remote (US)": { min: 140000, max: 250000, median: 190000 },
    },
    topSkills: ["Growth Strategy", "Team Leadership", "P&L Ownership", "Experimentation", "Cross-functional Management"],
    relatedRoles: ["growth-marketing-manager", "vp-marketing", "cmo"],
  },
  {
    slug: "seo-manager",
    title: "SEO Manager",
    category: "seo",
    description: "SEO Managers drive organic traffic by optimizing website content, technical infrastructure, and link-building strategy. They combine technical skills with content strategy to rank for high-intent keywords.",
    bySeniority: {
      "Junior (0-2 yrs)": { min: 45000, max: 65000, median: 55000 },
      "Mid (2-5 yrs)": { min: 65000, max: 100000, median: 82000 },
      "Senior (5-8 yrs)": { min: 95000, max: 145000, median: 120000 },
      "Lead/Director": { min: 130000, max: 180000, median: 155000 },
    },
    byCity: {
      "New York": { min: 70000, max: 160000, median: 110000 },
      "San Francisco": { min: 75000, max: 170000, median: 120000 },
      "Austin": { min: 60000, max: 130000, median: 90000 },
      "Remote (US)": { min: 65000, max: 150000, median: 100000 },
    },
    topSkills: ["Technical SEO", "Keyword Research", "Content Strategy", "Link Building", "Google Search Console"],
    relatedRoles: ["content-marketing-manager", "growth-marketing-manager"],
  },
  {
    slug: "performance-marketing-manager",
    title: "Performance Marketing Manager",
    category: "performance-marketing",
    description: "Performance Marketing Managers manage paid acquisition across Google, Meta, LinkedIn, TikTok, and other channels. They optimize ad spend for ROI, run creative tests, and build attribution models.",
    bySeniority: {
      "Junior (0-2 yrs)": { min: 50000, max: 75000, median: 62000 },
      "Mid (2-5 yrs)": { min: 75000, max: 120000, median: 95000 },
      "Senior (5-8 yrs)": { min: 110000, max: 165000, median: 135000 },
      "Lead/Director": { min: 140000, max: 200000, median: 170000 },
    },
    byCity: {
      "New York": { min: 80000, max: 175000, median: 125000 },
      "San Francisco": { min: 85000, max: 185000, median: 130000 },
      "Austin": { min: 65000, max: 140000, median: 100000 },
      "Remote (US)": { min: 70000, max: 160000, median: 110000 },
    },
    topSkills: ["Google Ads", "Meta Ads", "Campaign Optimization", "Attribution", "Creative Testing"],
    relatedRoles: ["growth-marketing-manager", "demand-generation-manager"],
  },
  {
    slug: "product-marketing-manager",
    title: "Product Marketing Manager",
    category: "product-marketing",
    description: "Product Marketing Managers are the bridge between product and market. They own positioning, messaging, go-to-market launches, competitive intelligence, and sales enablement.",
    bySeniority: {
      "Junior (0-2 yrs)": { min: 60000, max: 85000, median: 72000 },
      "Mid (2-5 yrs)": { min: 85000, max: 130000, median: 105000 },
      "Senior (5-8 yrs)": { min: 125000, max: 180000, median: 150000 },
      "Lead/Director": { min: 160000, max: 230000, median: 195000 },
    },
    byCity: {
      "New York": { min: 90000, max: 195000, median: 140000 },
      "San Francisco": { min: 100000, max: 210000, median: 150000 },
      "Austin": { min: 75000, max: 155000, median: 110000 },
      "Remote (US)": { min: 80000, max: 175000, median: 125000 },
    },
    topSkills: ["Positioning", "Go-to-Market", "Competitive Analysis", "Sales Enablement", "Customer Research"],
    relatedRoles: ["growth-marketing-manager", "content-marketing-manager", "brand-marketing-manager"],
  },
  {
    slug: "content-marketing-manager",
    title: "Content Marketing Manager",
    category: "content-marketing",
    description: "Content Marketing Managers create the articles, guides, videos, and thought leadership that attract and educate potential customers. They think like publishers, building audiences through valuable content.",
    bySeniority: {
      "Junior (0-2 yrs)": { min: 45000, max: 65000, median: 55000 },
      "Mid (2-5 yrs)": { min: 65000, max: 100000, median: 80000 },
      "Senior (5-8 yrs)": { min: 95000, max: 140000, median: 115000 },
      "Lead/Director": { min: 120000, max: 170000, median: 145000 },
    },
    byCity: {
      "New York": { min: 65000, max: 150000, median: 100000 },
      "San Francisco": { min: 70000, max: 160000, median: 110000 },
      "Remote (US)": { min: 55000, max: 130000, median: 90000 },
    },
    topSkills: ["SEO Writing", "Editorial Strategy", "Content Distribution", "Analytics", "Storytelling"],
    relatedRoles: ["seo-manager", "social-media-manager", "brand-marketing-manager"],
  },
  {
    slug: "demand-generation-manager",
    title: "Demand Generation Manager",
    category: "demand-generation",
    description: "Demand Generation Managers build and optimize the pipeline engine. They design campaigns that generate qualified leads, nurture prospects, and partner with sales to hit revenue targets.",
    bySeniority: {
      "Junior (0-2 yrs)": { min: 55000, max: 80000, median: 67000 },
      "Mid (2-5 yrs)": { min: 80000, max: 125000, median: 100000 },
      "Senior (5-8 yrs)": { min: 115000, max: 165000, median: 140000 },
      "Lead/Director": { min: 145000, max: 210000, median: 175000 },
    },
    byCity: {
      "New York": { min: 85000, max: 175000, median: 125000 },
      "San Francisco": { min: 90000, max: 185000, median: 135000 },
      "Remote (US)": { min: 75000, max: 160000, median: 110000 },
    },
    topSkills: ["Marketing Automation", "ABM", "Lead Scoring", "Campaign Management", "Revenue Attribution"],
    relatedRoles: ["performance-marketing-manager", "marketing-ops-manager", "growth-marketing-manager"],
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    category: "growth-marketing",
    description: "Marketing Managers oversee marketing campaigns, coordinate teams, and drive business objectives through strategic marketing initiatives. A broad role that spans multiple disciplines.",
    bySeniority: {
      "Junior (0-2 yrs)": { min: 50000, max: 70000, median: 60000 },
      "Mid (2-5 yrs)": { min: 70000, max: 110000, median: 90000 },
      "Senior (5-8 yrs)": { min: 100000, max: 155000, median: 125000 },
      "Director": { min: 130000, max: 200000, median: 165000 },
      "VP": { min: 170000, max: 280000, median: 220000 },
    },
    byCity: {
      "New York": { min: 75000, max: 200000, median: 130000 },
      "San Francisco": { min: 80000, max: 210000, median: 140000 },
      "Austin": { min: 60000, max: 150000, median: 100000 },
      "Chicago": { min: 60000, max: 145000, median: 95000 },
      "Remote (US)": { min: 65000, max: 170000, median: 110000 },
    },
    topSkills: ["Campaign Management", "Analytics", "Team Leadership", "Budget Management", "Cross-functional Coordination"],
    relatedRoles: ["growth-marketing-manager", "product-marketing-manager", "demand-generation-manager"],
  },
  {
    slug: "digital-marketing-manager",
    title: "Digital Marketing Manager",
    category: "growth-marketing",
    description: "Digital Marketing Managers oversee online marketing channels including paid search, social, email, and content. They drive digital strategy and measure ROI across all digital touchpoints.",
    bySeniority: {
      "Junior (0-2 yrs)": { min: 48000, max: 68000, median: 58000 },
      "Mid (2-5 yrs)": { min: 68000, max: 105000, median: 85000 },
      "Senior (5-8 yrs)": { min: 100000, max: 150000, median: 122000 },
      "Director": { min: 130000, max: 195000, median: 160000 },
    },
    byCity: {
      "New York": { min: 70000, max: 170000, median: 115000 },
      "San Francisco": { min: 75000, max: 180000, median: 125000 },
      "Remote (US)": { min: 60000, max: 150000, median: 100000 },
    },
    topSkills: ["Digital Strategy", "Paid Media", "SEO/SEM", "Email Marketing", "Analytics"],
    relatedRoles: ["growth-marketing-manager", "performance-marketing-manager", "seo-manager"],
  },
];

export function getSalaryData(slug: string): RoleSalaryData | undefined {
  return SALARY_DATA.find((s) => s.slug === slug);
}

export function getAllSalarySlugs(): string[] {
  return SALARY_DATA.map((s) => s.slug);
}
