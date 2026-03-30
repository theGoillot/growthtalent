import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export const BOOST_PRICES = {
  USA: {
    priceId: process.env.STRIPE_PRICE_BOOST_USA!,
    amount: 399,
    currency: "USD",
    label: "$399",
  },
  FRANCE: {
    priceId: process.env.STRIPE_PRICE_BOOST_FRANCE!,
    amount: 299,
    currency: "EUR",
    label: "€299",
  },
  LATAM: {
    priceId: process.env.STRIPE_PRICE_BOOST_LATAM!,
    amount: 299,
    currency: "USD",
    label: "$299",
  },
} as const;

export type BoostMarket = keyof typeof BOOST_PRICES;

export async function createBoostCheckout(opts: {
  companyId: string;
  companyName: string;
  market: BoostMarket;
  successUrl: string;
  cancelUrl: string;
}) {
  const price = BOOST_PRICES[opts.market];

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: price.priceId, quantity: 1 }],
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    metadata: {
      companyId: opts.companyId,
      market: opts.market,
    },
    payment_intent_data: {
      metadata: {
        companyId: opts.companyId,
        market: opts.market,
      },
    },
  });

  return session;
}
