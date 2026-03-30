"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PLANS = [
  {
    market: "USA",
    flag: "\ud83c\uddfa\ud83c\uddf8",
    price: "$399",
    currency: "USD",
    features: [
      "Featured placement for 30 days",
      "Top 3 position on category pages",
      "Included in weekly newsletter",
      "Unlock all candidate profiles",
      "Analytics dashboard",
    ],
  },
  {
    market: "FRANCE",
    flag: "\ud83c\uddeb\ud83c\uddf7",
    price: "\u20ac299",
    currency: "EUR",
    features: [
      "Placement en avant pendant 30 jours",
      "Top 3 sur les pages cat\u00e9gorie",
      "Inclus dans la newsletter hebdomadaire",
      "Acc\u00e8s aux profils candidats",
      "Tableau de bord analytics",
    ],
  },
  {
    market: "LATAM",
    flag: "\ud83c\udf0e",
    price: "$299",
    currency: "USD",
    features: [
      "Featured placement for 30 days",
      "Top 3 on category pages",
      "Newsletter inclusion",
      "Unlock candidate profiles",
      "Analytics dashboard",
    ],
  },
];

export default function BoostPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [companySlug, setCompanySlug] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleBoost(market: string) {
    if (!companySlug.trim()) {
      setError("Enter your company slug first (from your company page URL)");
      return;
    }
    setLoading(market);
    setError(null);

    try {
      // First look up the company
      const companyRes = await fetch(`/api/company/lookup?slug=${encodeURIComponent(companySlug)}`);
      if (!companyRes.ok) {
        setError("Company not found. Check the slug from your company page URL.");
        setLoading(null);
        return;
      }
      const company = await companyRes.json();

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId: company.id, market }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Failed to create checkout");
        setLoading(null);
      }
    } catch {
      setError("Something went wrong");
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/Logo_GT.svg" alt="Growth.Talent" width={32} height={32} />
            <span className="font-display text-xl font-bold">Growth.Talent</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Boost your listing
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Get featured placement, newsletter inclusion, and unlock all candidate
            profiles who applied to your jobs.
          </p>
        </div>

        {/* Company slug input */}
        <div className="mx-auto mt-8 max-w-md">
          <label className="text-sm font-medium">Your company slug</label>
          <input
            type="text"
            value={companySlug}
            onChange={(e) => setCompanySlug(e.target.value)}
            placeholder="e.g. amplitude, qonto, rappi"
            className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.market}
              className="rounded-2xl border-2 border-gt-black p-8 shadow-[4px_4px_0px_#000]"
            >
              <div className="text-2xl">{plan.flag}</div>
              <h3 className="mt-2 font-display text-xl font-bold">{plan.market}</h3>
              <div className="mt-4 font-display text-4xl font-bold">{plan.price}</div>
              <p className="text-sm text-muted-foreground">one-time / 30 days</p>

              <ul className="mt-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-green-600">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBoost(plan.market)}
                disabled={loading === plan.market}
                className="mt-8 w-full rounded-full bg-gt-black py-3 text-sm font-semibold text-white transition-colors hover:bg-gt-black/85 disabled:opacity-50"
              >
                {loading === plan.market ? "Redirecting..." : `Boost ${plan.market}`}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
