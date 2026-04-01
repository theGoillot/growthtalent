/** Related categories for internal linking on category pages */
export const RELATED_CATEGORIES: Record<string, string[]> = {
  "growth-marketing": ["performance-marketing", "demand-generation", "data-analytics", "head-of-growth", "growth-engineering"],
  "product-marketing": ["content-marketing", "brand-marketing", "demand-generation", "growth-marketing", "vp-marketing"],
  "demand-generation": ["performance-marketing", "marketing-ops", "crm-lifecycle", "growth-marketing", "content-marketing"],
  "growth-engineering": ["data-analytics", "growth-marketing", "seo", "marketing-ops", "head-of-growth"],
  "marketing-ops": ["crm-lifecycle", "demand-generation", "data-analytics", "growth-engineering", "performance-marketing"],
  "content-marketing": ["seo", "social-media", "brand-marketing", "product-marketing", "crm-lifecycle"],
  "performance-marketing": ["demand-generation", "growth-marketing", "data-analytics", "marketing-ops", "social-media"],
  "crm-lifecycle": ["marketing-ops", "demand-generation", "content-marketing", "data-analytics", "growth-marketing"],
  "seo": ["content-marketing", "growth-engineering", "data-analytics", "performance-marketing", "growth-marketing"],
  "data-analytics": ["marketing-ops", "growth-engineering", "performance-marketing", "seo", "growth-marketing"],
  "brand-marketing": ["social-media", "content-marketing", "product-marketing", "partnerships", "vp-marketing"],
  "social-media": ["content-marketing", "brand-marketing", "performance-marketing", "partnerships", "crm-lifecycle"],
  "partnerships": ["demand-generation", "brand-marketing", "social-media", "growth-marketing", "vp-marketing"],
  "head-of-growth": ["growth-marketing", "vp-marketing", "cmo", "demand-generation", "performance-marketing"],
  "vp-marketing": ["head-of-growth", "cmo", "brand-marketing", "demand-generation", "product-marketing"],
  "cmo": ["vp-marketing", "head-of-growth", "brand-marketing", "product-marketing", "growth-marketing"],
};
