import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { companySlug, email } = await request.json();
    if (!companySlug || !email) {
      return NextResponse.json({ error: "companySlug and email required" }, { status: 400 });
    }

    // Find company
    const company = await db.company.findUnique({ where: { slug: companySlug } });
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Verify email domain matches company domain
    const emailDomain = email.split("@")[1]?.toLowerCase();
    if (company.domain && emailDomain !== company.domain.toLowerCase()) {
      return NextResponse.json(
        { error: `Email must be from @${company.domain}` },
        { status: 400 }
      );
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");

    // Create claim
    await db.companyClaim.create({
      data: {
        companyId: company.id,
        email,
        token,
      },
    });

    // Send verification email (if Resend is configured)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const verifyUrl = `${request.nextUrl.origin}/claim/verify?token=${token}`;

      await resend.emails.send({
        from: "Growth.Talent <noreply@growthtalent.org>",
        to: email,
        subject: `Verify your claim for ${company.name} on Growth.Talent`,
        html: `
          <h2>Claim your company page</h2>
          <p>Click the link below to verify that you work at ${company.name} and claim your company page on Growth.Talent.</p>
          <p><a href="${verifyUrl}" style="display:inline-block;background:#000;color:#fff;padding:12px 24px;border-radius:100px;text-decoration:none;font-weight:600;">Verify & Claim</a></p>
          <p style="color:#666;font-size:13px;">If you didn't request this, you can ignore this email.</p>
        `,
      });
    } else {
      // Dev mode: log the verify URL
      console.log(`[DEV] Claim verify URL: ${request.nextUrl.origin}/claim/verify?token=${token}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Claim request error:", error);
    return NextResponse.json({ error: "Failed to process claim" }, { status: 500 });
  }
}
