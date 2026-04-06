/**
 * Auto-enrich a company when it's first created.
 * Uses Exa for research, falls back to inference from name/domain.
 * Runs async — never blocks job ingestion.
 */

import { db } from "@/lib/db";

interface ExaResult {
  about?: string;
  companyType?: string;
  founded?: string;
  funding?: string;
  size?: string;
  industry?: string;
}

const EXA_API_KEY = "2faf9f07-1429-4a57-a25c-8bedbe1e0538";

function inferCompanyType(name: string): string {
  const n = name.toLowerCase();
  const agencyKeywords = ["agency", "studio", "creative", "consulting", "staffing", "recruiting", "recruitment", "search firm"];
  const corporateKeywords = ["inc", "corp", "group", "holdings", "international", "global"];

  if (agencyKeywords.some((k) => n.includes(k))) return "agency";
  if (corporateKeywords.some((k) => n.includes(k))) return "corporate";
  return "early-stage";
}

async function fetchFromExa(companyName: string): Promise<ExaResult | null> {
  try {
    const res = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: {
        "x-api-key": EXA_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `${companyName} company about funding employees`,
        numResults: 1,
        type: "neural",
        contents: { highlights: true },
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const result = data.results?.[0];
    if (!result) return null;

    const text = (result.highlights || []).join(" ");

    // Extract structured data from Exa highlights
    const founded = text.match(/founded (?:in )?(\d{4})/i)?.[1] ?? null;
    const employees = text.match(/(\d[\d,]+)\s*(?:people|employees)/i)?.[1] ?? null;
    const funding = text.match(/\$[\d.]+[BMK]?\s*(?:total funding|funding|raised|series [A-F])/i)?.[0] ?? null;

    // Infer size from employee count
    let size: string | undefined;
    if (employees) {
      const count = parseInt(employees.replace(",", ""));
      if (count <= 10) size = "1-10";
      else if (count <= 50) size = "11-50";
      else if (count <= 200) size = "51-200";
      else if (count <= 500) size = "201-500";
      else size = "500+";
    }

    // Infer type from funding/size
    let companyType = inferCompanyType(companyName);
    if (funding && funding.includes("Public")) companyType = "corporate";
    else if (size === "500+") companyType = "corporate";
    else if (funding) companyType = "scaleup";

    // Build about from highlights (first 300 chars of meaningful text)
    const aboutRaw = text
      .replace(/##.*?\n/g, "")
      .replace(/\n+/g, " ")
      .trim();
    const about = aboutRaw.length > 50 ? aboutRaw.slice(0, 300).replace(/\s\S*$/, "") + "." : null;

    return {
      about: about ?? undefined,
      companyType,
      founded: founded ?? undefined,
      funding: funding ?? undefined,
      size,
      industry: undefined, // Exa doesn't reliably return industry
    };
  } catch (error) {
    console.error(`[Exa] Company enrichment failed for ${companyName}:`, error);
    return null;
  }
}

/**
 * Enrich a company with data from Exa + inference.
 * Called async after company creation — never blocks.
 */
export async function enrichCompany(companyId: string): Promise<void> {
  try {
    const company = await db.company.findUnique({
      where: { id: companyId },
      select: { id: true, name: true, about: true, companyType: true },
    });

    if (!company) return;

    // Skip if already enriched
    if (company.about && company.companyType) return;

    // Try Exa first
    const exa = await fetchFromExa(company.name);

    // Build update data
    const updateData: Record<string, unknown> = {};

    if (!company.about) {
      updateData.about = exa?.about ?? `${company.name} is hiring growth professionals on Growth.Talent. Browse their open positions and learn about their team.`;
    }

    if (!company.companyType) {
      updateData.companyType = exa?.companyType ?? inferCompanyType(company.name);
    }

    if (exa?.founded) updateData.founded = exa.founded;
    if (exa?.funding) updateData.funding = exa.funding;
    if (exa?.size) updateData.size = exa.size;
    if (exa?.industry) updateData.industry = exa.industry;

    if (Object.keys(updateData).length > 0) {
      await db.company.update({
        where: { id: companyId },
        data: updateData,
      });
      console.log(`[Enrich] Company ${company.name}: enriched (${updateData.companyType ?? "existing type"})`);
    }
  } catch (error) {
    console.error(`[Enrich] Company enrichment error for ${companyId}:`, error);
    // Never throw — this is fire-and-forget
  }
}
