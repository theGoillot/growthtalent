import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId } = await request.json();
  if (!jobId) {
    return NextResponse.json({ error: "jobId required" }, { status: 400 });
  }

  // Find candidate
  const candidate = await db.candidate.findUnique({
    where: { email: session.user.email },
  });
  if (!candidate) {
    return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
  }

  // Find job
  const job = await db.job.findUnique({
    where: { id: jobId },
    select: { id: true, applyUrl: true, title: true },
  });
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  // Create application (upsert to avoid duplicates)
  await db.application.upsert({
    where: { candidateId_jobId: { candidateId: candidate.id, jobId } },
    update: {},
    create: { candidateId: candidate.id, jobId },
  });

  return NextResponse.json({ ok: true, applyUrl: job.applyUrl });
}
