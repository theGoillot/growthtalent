import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

function isAdmin(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  if (!isAdmin(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") ?? undefined;
  const market = searchParams.get("market") ?? undefined;
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100);

  const where = {
    ...(status && { status: status as "PENDING_REVIEW" | "APPROVED" | "FLAGGED" | "REJECTED" | "EXPIRED" }),
    ...(market && { market: market as "USA" | "FRANCE" | "LATAM" }),
  };

  const [jobs, total] = await Promise.all([
    db.job.findMany({
      where,
      include: { company: { select: { name: true, slug: true, logoUrl: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
  ]);

  return NextResponse.json({ jobs, total, page, limit });
}

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();
  if (!isAdmin(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { jobId, status } = body;

  if (!jobId || !status) {
    return NextResponse.json({ error: "jobId and status required" }, { status: 400 });
  }

  const validStatuses = ["APPROVED", "FLAGGED", "REJECTED", "EXPIRED"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }, { status: 400 });
  }

  const job = await db.job.update({
    where: { id: jobId },
    data: { status },
  });

  return NextResponse.json({ job });
}
