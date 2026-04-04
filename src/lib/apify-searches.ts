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

  // France — English titles
  { queries: ["Head of Growth"], location: "France", market: "france", limit: 50 },
  { queries: ["Growth Manager"], location: "France", market: "france", limit: 50 },
  { queries: ["Growth Marketing"], location: "Paris", market: "france", limit: 50 },
  { queries: ["Acquisition Manager"], location: "France", market: "france", limit: 50 },
  { queries: ["CRM Manager startup"], location: "France", market: "france", limit: 30 },
  { queries: ["SEO Manager"], location: "France", market: "france", limit: 30 },
  { queries: ["Performance Marketing Manager"], location: "France", market: "france", limit: 30 },
  { queries: ["Product Marketing Manager"], location: "France", market: "france", limit: 30 },
  // France — French titles
  { queries: ["Responsable Growth"], location: "France", market: "france", limit: 50 },
  { queries: ["Responsable Acquisition"], location: "France", market: "france", limit: 50 },
  { queries: ["Responsable CRM"], location: "France", market: "france", limit: 30 },
  { queries: ["Growth Marketing"], location: "Lyon", market: "france", limit: 30 },

  // LatAm — English
  { queries: ["Growth Marketing"], location: "Latin America", market: "latam", limit: 50 },
  { queries: ["Head of Growth"], location: "Mexico", market: "latam", limit: 50 },
  { queries: ["Growth Marketing"], location: "Colombia", market: "latam", limit: 30 },
  { queries: ["Growth Marketing"], location: "Brazil", market: "latam", limit: 30 },
  // LatAm — expanded
  { queries: ["Growth Marketing Manager"], location: "Brazil", market: "latam", limit: 50 },
  { queries: ["Head of Growth"], location: "Colombia", market: "latam", limit: 30 },
  { queries: ["Head of Growth"], location: "Argentina", market: "latam", limit: 30 },
  // LatAm — local language titles
  { queries: ["Gerente de Growth"], location: "Mexico", market: "latam", limit: 30 },
  { queries: ["Marketing de Performance"], location: "Brazil", market: "latam", limit: 30 },
];
