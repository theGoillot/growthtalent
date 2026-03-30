import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const companyId = session.metadata?.companyId;
    const market = session.metadata?.market;

    if (!companyId || !market) {
      console.error("Missing metadata in checkout session:", session.id);
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    // Create boost record
    await db.boost.create({
      data: {
        companyId,
        stripeSessionId: session.id,
        stripeCustomerId: session.customer as string | null,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        market: market as "USA" | "FRANCE" | "LATAM",
        isActive: true,
        startsAt: now,
        expiresAt,
      },
    });

    // Mark all company jobs in this market as boosted
    await db.job.updateMany({
      where: { companyId, market: market as "USA" | "FRANCE" | "LATAM", status: "APPROVED" },
      data: { isBoosted: true, boostExpiresAt: expiresAt },
    });

    console.log(`Boost activated for company ${companyId} in ${market} until ${expiresAt.toISOString()}`);
  }

  return NextResponse.json({ received: true });
}
