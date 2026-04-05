/**
 * Shared types and filters for all job scrapers.
 * Every scraper module imports from here to reuse relevance checks.
 */

import type { IngestPayload } from "@/lib/ingest";

// ── Agency detection ────────────────────────────────────

const AGENCY_KEYWORDS = [
  "staffing", "recruiting", "recruitment", "talent acquisition",
  "headhunting", "placement", "search firm", "consulting group",
  "personnel", "manpower", "adecco", "randstad", "hays",
  "michael page", "robert half", "kforce", "insight global",
];

export function isAgency(companyName: string): boolean {
  const lower = companyName.toLowerCase();
  return AGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

// ── Relevance check ─────────────────────────────────────

const TITLE_KEYWORDS = [
  // English
  "growth", "marketing", "seo", "acquisition", "demand gen",
  "performance market", "paid media", "paid acquisition",
  "crm", "lifecycle", "retention", "content market",
  "brand market", "product market", "outbound", "inbound",
  "head of digital", "head of dtc", "social media",
  "community manager", "partnerships", "revenue market",
  "go-to-market", "gtm", "analytics market",
  // French
  "responsable growth", "responsable acquisition", "responsable crm",
  "responsable marketing", "responsable seo", "chef de projet marketing",
  "directeur marketing", "directeur acquisition",
  // Spanish
  "gerente de growth", "gerente de marketing", "jefe de marketing",
  "marketing de performance", "gerente de marketing digital",
  // Portuguese
  "gestor de marketing",
];

const EXCLUDE_TITLES = [
  // Engineering / Design / Data
  "software engineer", "data scientist", "ux designer", "ui designer",
  // HR / Recruiting
  "recruiter", "hr ", "human resource", "talent acquisition",
  // Admin / Support
  "administrative", "receptionist", "office manager", "executive assistant",
  "customer success", "customer support", "customer service",
  // Sales (non-marketing)
  "sales representative", "account executive", "business development rep",
  "sdr", "sales engineer",
  // Finance / Legal / Ops
  "accountant", "financial analyst", "business analyst", "lawyer",
  "attorney", "project manager", "program manager",
  // Events (non-digital)
  "event coordinator", "event planner", "event marketing",
  // Trades / Other
  "nurse", "teacher", "mechanic", "chef", "nanny", "sitter",
  "physiotherapist", "coach", "principal", "assistant professor",
  "gallery assistant", "park naturalist", "security", "porter",
  "casting", "buyer", "economist", "warehouse", "driver",
];

export function isRelevantGrowthRole(title: string): boolean {
  const titleLower = title.toLowerCase();
  if (EXCLUDE_TITLES.some((ex) => titleLower.includes(ex))) return false;
  return TITLE_KEYWORDS.some((kw) => titleLower.includes(kw));
}

// ── Search config type ──────────────────────────────────

export interface ScraperSource {
  name: string;
  actorId: string;
  configs: ScraperSearchConfig[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (item: any, market: "usa" | "france" | "latam") => IngestPayload | null;
}

export interface ScraperSearchConfig {
  queries: string[];
  location: string;
  market: "usa" | "france" | "latam";
  limit: number;
}
