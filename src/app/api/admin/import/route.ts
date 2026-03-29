import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ingestJob, type IngestPayload } from "@/lib/ingest";

function isAdmin(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  if (!isAdmin(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const market = (formData.get("market") as string) ?? "usa";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split("\n").filter((l) => l.trim());

    if (lines.length < 2) {
      return NextResponse.json({ error: "CSV must have a header row + at least one data row" }, { status: 400 });
    }

    // Parse CSV (simple — handles comma-separated, no quotes handling for now)
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const rows = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      const row: Record<string, string> = {};
      headers.forEach((h, i) => {
        row[h] = values[i] ?? "";
      });
      return row;
    });

    // Map CSV rows to IngestPayload
    const payloads: IngestPayload[] = rows
      .filter((row) => row.title && row.company_name && row.url)
      .map((row) => ({
        title: row.title,
        company_name: row.company_name ?? row.company,
        company_website: row.company_website ?? row.website,
        company_domain: row.company_domain ?? row.domain,
        description: row.description,
        location: row.location,
        city: row.city,
        country: row.country,
        salary_range: row.salary_range ?? row.salary,
        url: row.url ?? row.source_url,
        apply_url: row.apply_url,
        source: "manual",
        market: market as "usa" | "france" | "latam",
      }));

    const results = await Promise.all(payloads.map(ingestJob));

    const created = results.filter((r) => r.status === "created").length;
    const duplicates = results.filter((r) => r.status === "duplicate").length;
    const errors = results.filter((r) => r.status === "error").length;

    return NextResponse.json({ total: payloads.length, created, duplicates, errors });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
