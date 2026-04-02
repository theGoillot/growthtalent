/**
 * Rich job description format.
 * Stored as JSON in the `description` field, prefixed with <!--rich-->
 * The page component detects this and renders structured cards instead of raw HTML.
 */

export interface RichJob {
  /** Visual tag pills shown at top (e.g. "B2C", "Remote", "$75K-$100K") */
  tags: string[];

  /** The Challenge — narrative hook, 2-3 sentences max */
  challenge: string;

  /** What you'll do in the first 3 months */
  objectives3m: string[];

  /** What you'll do in the first 6 months */
  objectives6m: string[];

  /** KPIs you'll own — metric name + description */
  kpis: { metric: string; description: string }[];

  /** Tools & stack */
  tools: string[];

  /** Your team — who you'll work with */
  team: {
    manager: string;
    current: string;
    hiring?: string;
  };

  /** Compensation */
  compensation: {
    salary: string;
    variable?: string;
    equity?: string;
    remote: string;
  };

  /** Benefits list */
  benefits: string[];

  /** Company intelligence */
  company: {
    about: string;
    founded?: string;
    headcount?: string;
    funding?: string;
    customers?: string;
    culture?: string;
  };

  /** For You If — green flags */
  forYouIf: string[];

  /** Won't Work If — honest dealbreakers */
  wontWorkIf: string[];

  /** Interview process steps */
  interviewProcess: { step: string; detail: string }[];
}

const RICH_PREFIX = "<!--rich-->";

/** Parse a description field — returns RichJob if enriched, null if plain HTML */
export function parseRichJob(description: string | null): RichJob | null {
  if (!description || !description.startsWith(RICH_PREFIX)) return null;
  try {
    return JSON.parse(description.slice(RICH_PREFIX.length)) as RichJob;
  } catch {
    return null;
  }
}

/** Serialize a RichJob to store in the description field */
export function serializeRichJob(data: RichJob): string {
  return RICH_PREFIX + JSON.stringify(data);
}

/**
 * Generate a plain-text summary from RichJob for JSON-LD description
 * (Google Jobs needs text, not structured JSON)
 */
export function richJobToText(data: RichJob): string {
  const parts: string[] = [];
  parts.push(data.challenge);
  if (data.objectives3m.length) {
    parts.push("First 3 months: " + data.objectives3m.join(". ") + ".");
  }
  if (data.kpis.length) {
    parts.push("Key metrics: " + data.kpis.map((k) => k.metric).join(", ") + ".");
  }
  if (data.tools.length) {
    parts.push("Tools: " + data.tools.join(", ") + ".");
  }
  if (data.compensation.salary) {
    parts.push("Salary: " + data.compensation.salary + ".");
  }
  if (data.forYouIf.length) {
    parts.push("Ideal candidate: " + data.forYouIf.join(". ") + ".");
  }
  return parts.join(" ");
}
