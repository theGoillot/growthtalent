export const CATEGORIES = [
  "growth-marketing",
  "product-marketing",
  "demand-generation",
  "growth-engineering",
  "marketing-ops",
  "content-marketing",
  "performance-marketing",
  "crm-lifecycle",
  "seo",
  "data-analytics",
  "brand-marketing",
  "social-media",
  "partnerships",
  "head-of-growth",
  "vp-marketing",
  "cmo",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Keywords that map job titles to categories */
export const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  "growth-marketing": ["growth", "growth marketing", "growth hacker", "growth manager"],
  "product-marketing": ["product marketing", "pmm", "go-to-market", "gtm"],
  "demand-generation": ["demand gen", "demand generation", "lead gen", "pipeline"],
  "growth-engineering": ["growth engineer", "growth engineering", "experimentation"],
  "marketing-ops": ["marketing ops", "martech", "marketing operations", "revops"],
  "content-marketing": ["content", "content marketing", "copywriter", "editor"],
  "performance-marketing": ["performance", "paid", "acquisition", "ppc", "paid media", "media buyer"],
  "crm-lifecycle": ["crm", "lifecycle", "retention", "email marketing", "engagement"],
  "seo": ["seo", "search engine", "organic"],
  "data-analytics": ["data", "analytics", "analyst", "bi", "insights"],
  "brand-marketing": ["brand", "branding", "creative"],
  "social-media": ["social media", "community", "social"],
  "partnerships": ["partnerships", "partner", "affiliate", "business development"],
  "head-of-growth": ["head of growth", "growth lead", "director of growth"],
  "vp-marketing": ["vp marketing", "vp of marketing", "vice president marketing"],
  "cmo": ["cmo", "chief marketing"],
};

/** Classify a job title into a category */
export function classifyCategory(title: string): Category {
  const lower = title.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return category as Category;
      }
    }
  }
  return "growth-marketing"; // default
}
