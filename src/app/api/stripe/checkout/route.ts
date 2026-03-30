import { NextRequest, NextResponse } from "next/server";
import { createBoostCheckout, type BoostMarket } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { companyId, market, email } = await request.json();

    if (!companyId || !market) {
      return NextResponse.json({ error: "companyId and market required" }, { status: 400 });
    }

    const validMarkets = ["USA", "FRANCE", "LATAM"];
    if (!validMarkets.includes(market)) {
      return NextResponse.json({ error: "Invalid market" }, { status: 400 });
    }

    // Verify company exists
    const company = await db.company.findUnique({ where: { id: companyId } });
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const origin = request.nextUrl.origin;
    const session = await createBoostCheckout({
      companyId,
      companyName: company.name,
      market: market as BoostMarket,
      successUrl: `${origin}/boost/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/boost?company=${company.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
