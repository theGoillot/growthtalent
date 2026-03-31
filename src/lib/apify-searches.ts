export interface SearchConfig {
  queries: string[];
  location: string;
  market: "usa" | "france" | "latam";
  limit: number;
}

export const SEARCH_CONFIGS: SearchConfig[] = [
  // USA
  { queries: ["Head of Growth"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Growth Marketing Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Performance Marketing Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Demand Generation Manager"], location: "United States", market: "usa", limit: 50 },
  { queries: ["SEO Manager startup"], location: "United States", market: "usa", limit: 50 },
  { queries: ["Growth Engineer"], location: "United States", market: "usa", limit: 50 },
  { queries: ["CRM Lifecycle Manager"], location: "United States", market: "usa", limit: 30 },
  { queries: ["Product Marketing Manager startup"], location: "United States", market: "usa", limit: 50 },

  // France
  { queries: ["Head of Growth"], location: "France", market: "france", limit: 50 },
  { queries: ["Growth Manager"], location: "France", market: "france", limit: 50 },
  { queries: ["Growth Marketing"], location: "Paris", market: "france", limit: 50 },
  { queries: ["Acquisition Manager"], location: "France", market: "france", limit: 50 },
  { queries: ["CRM Manager startup"], location: "France", market: "france", limit: 30 },
  { queries: ["SEO Manager"], location: "France", market: "france", limit: 30 },

  // LatAm
  { queries: ["Growth Marketing"], location: "Latin America", market: "latam", limit: 50 },
  { queries: ["Head of Growth"], location: "Mexico", market: "latam", limit: 50 },
  { queries: ["Growth Marketing"], location: "Colombia", market: "latam", limit: 30 },
  { queries: ["Growth Marketing"], location: "Brazil", market: "latam", limit: 30 },
];
