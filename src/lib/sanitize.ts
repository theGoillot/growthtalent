/**
 * Input sanitization utilities for user-submitted content.
 */

/** Strip HTML tags from a string */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/** Truncate string to max length */
export function truncate(input: string, max: number): string {
  return input.length > max ? input.slice(0, max) : input;
}

/** Sanitize a text field: strip HTML, trim, truncate */
export function sanitizeText(input: unknown, maxLength: number = 500): string | null {
  if (typeof input !== "string") return null;
  const cleaned = stripHtml(input).trim();
  return cleaned ? truncate(cleaned, maxLength) : null;
}

/** Validate LinkedIn profile URL */
export function isValidLinkedInUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[\w-]+\/?$/.test(url);
}

/** Validate email format */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

/** Check for spam patterns in text */
export function hasSpamPatterns(text: string): boolean {
  const patterns = [
    /https?:\/\/\S+/gi,           // URLs in bio
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,  // phone numbers
    /[A-Z]{5,}/,                   // excessive caps
    /(.)\1{4,}/,                   // repeated characters
    /\b(buy|sell|earn|free money|click here|act now)\b/i,  // spam phrases
    /\$\d+.*per (hour|day|week)/i, // money spam
  ];
  return patterns.some((p) => p.test(text));
}

/** Generate a URL-safe slug from a name */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}
