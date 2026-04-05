import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, getRateLimitKey } from "@/lib/rate-limit";
import { isValidEmail } from "@/lib/sanitize";

export async function POST(request: NextRequest) {
  // Rate limit: 5 per minute per IP
  const { allowed } = rateLimit(getRateLimitKey(request, "subscribe"), 5, 60000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { email, market, source } = await request.json();
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await db.emailSubscriber.upsert({
      where: { email },
      update: {},
      create: { email, market, source },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
