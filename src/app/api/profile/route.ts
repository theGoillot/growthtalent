import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { rateLimit, getRateLimitKey } from "@/lib/rate-limit";
import { sanitizeText, isValidLinkedInUrl, hasSpamPatterns, nameToSlug } from "@/lib/sanitize";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 5 profile updates per hour
  const { allowed } = rateLimit(getRateLimitKey(request, "profile"), 5, 3600000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many updates. Try again later." }, { status: 429 });
  }

  const body = await request.json();

  // Sanitize inputs
  const headline = sanitizeText(body.headline, 120);
  const bio = sanitizeText(body.bio, 500);
  const currentTitle = sanitizeText(body.currentTitle, 100);
  const city = sanitizeText(body.city, 50);
  const country = sanitizeText(body.country, 50);
  const reportsTo = sanitizeText(body.reportsTo, 50);

  // Check for spam in bio
  if (bio && hasSpamPatterns(bio)) {
    return NextResponse.json({ error: "Profile contains suspicious content" }, { status: 400 });
  }

  // Validate LinkedIn URL if provided
  const linkedinUrl = body.linkedinUrl?.trim() || null;
  if (linkedinUrl && !isValidLinkedInUrl(linkedinUrl)) {
    return NextResponse.json({ error: "Invalid LinkedIn URL format" }, { status: 400 });
  }

  // Generate slug from name if not exists
  const candidate = await db.candidate.findUnique({ where: { email: session.user.email }, select: { slug: true, name: true } });
  let slug = candidate?.slug;
  if (!slug && candidate?.name) {
    slug = nameToSlug(candidate.name);
    // Check uniqueness, add random suffix if needed
    const existing = await db.candidate.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    }
  }

  await db.candidate.update({
    where: { email: session.user.email },
    data: {
      currentTitle,
      headline,
      bio,
      linkedinUrl,
      seniority: body.seniority || null,
      city,
      country,
      salaryMin: body.salaryMin ? parseInt(body.salaryMin) : null,
      salaryMax: body.salaryMax ? parseInt(body.salaryMax) : null,
      salaryCurrency: body.salaryCurrency || null,
      tools: body.tools ?? [],
      teamScope: body.teamScope || null,
      reportsTo,
      isInGrowthTeam: body.isInGrowthTeam ?? false,
      companyId: body.companyId || null,
      photoUrl: body.photoUrl || null,
      slug,
      isProfileComplete: true,
      profileVisibility: body.profileVisibility ?? "PUBLIC",
    },
  });

  return NextResponse.json({ ok: true, slug });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const candidate = await db.candidate.findUnique({
    where: { email: session.user.email },
    include: { company: { select: { id: true, name: true, slug: true, logoUrl: true, domain: true } } },
  });

  if (!candidate) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Never expose salary data in GET — only the user sees it client-side
  return NextResponse.json({
    ...candidate,
    // Redact sensitive fields
    email: undefined,
    salaryMin: candidate.salaryMin,
    salaryMax: candidate.salaryMax,
  });
}
