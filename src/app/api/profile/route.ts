import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  await db.candidate.update({
    where: { email: session.user.email },
    data: {
      currentTitle: body.currentTitle || null,
      seniority: body.seniority || null,
      city: body.city || null,
      country: body.country || null,
      salaryMin: body.salaryMin || null,
      salaryMax: body.salaryMax || null,
      salaryCurrency: body.salaryCurrency || null,
      tools: body.tools ?? [],
      teamScope: body.teamScope || null,
      isProfileComplete: true,
    },
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const candidate = await db.candidate.findUnique({
    where: { email: session.user.email },
  });

  return NextResponse.json(candidate);
}
