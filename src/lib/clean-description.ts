/**
 * Clean raw scraped job descriptions into readable HTML.
 * Handles common issues from LinkedIn/ATS scraping.
 */
export function cleanDescription(html: string): string {
  let clean = html;

  // Remove excessive <br> chains (3+ in a row → single paragraph break)
  clean = clean.replace(/(<br\s*\/?>[\s\n]*){3,}/gi, "</p><p>");
  // Replace double <br> with paragraph breaks
  clean = clean.replace(/(<br\s*\/?>[\s\n]*){2}/gi, "</p><p>");

  // Remove empty <strong></strong> and <strong><br></strong>
  clean = clean.replace(/<strong>\s*(<br\s*\/?>)?\s*<\/strong>/gi, "");

  // Remove empty paragraphs
  clean = clean.replace(/<p>\s*<\/p>/gi, "");

  // Convert standalone <strong>Section Title</strong> followed by <br> into <h3>
  clean = clean.replace(
    /<strong>([^<]{3,60})<\/strong>\s*(<br\s*\/?>)*/gi,
    (_, title: string) => {
      const trimmed = title.trim();
      // If it looks like a section header (short, no punctuation ending)
      if (trimmed.length < 60 && !trimmed.endsWith(".") && !trimmed.endsWith(",")) {
        return `<h3>${trimmed}</h3>`;
      }
      return `<strong>${trimmed}</strong>`;
    }
  );

  // Clean up orphaned <br> at start/end of list items
  clean = clean.replace(/<li>\s*<br\s*\/?>\s*/gi, "<li>");
  clean = clean.replace(/\s*<br\s*\/?>\s*<\/li>/gi, "</li>");

  // Remove the typical "About Company" boilerplate at the top if it's more than 200 chars
  // before the actual job description starts (common with FOX, etc.)
  // We detect this by looking for a long non-list block followed by job description headers
  // (This is a heuristic — enriched jobs don't need this)

  // Ensure single remaining <br> become proper spacing
  clean = clean.replace(/<br\s*\/?>/gi, "<br />");

  // Remove leading/trailing whitespace in block elements
  clean = clean.replace(/<(p|li|h[1-6])>\s+/gi, "<$1>");
  clean = clean.replace(/\s+<\/(p|li|h[1-6])>/gi, "</$1>");

  // Wrap bare text that isn't in a tag (common in scraped content)
  // This is light-touch — only wraps if content starts with bare text
  if (clean.trim() && !clean.trim().startsWith("<")) {
    clean = `<p>${clean}</p>`;
  }

  return clean;
}
