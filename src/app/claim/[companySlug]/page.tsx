"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ClaimCompanyPage() {
  const params = useParams();
  const companySlug = params.companySlug as string;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const res = await fetch("/api/claim/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companySlug, email }),
    });

    if (res.ok) {
      setStatus("sent");
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      setStatus("error");
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

      <main className="mx-auto max-w-md px-6 py-16">
        {status === "sent" ? (
          <div className="text-center">
            <div className="text-5xl">&#9993;&#65039;</div>
            <h1 className="mt-6 font-display text-3xl font-bold">Check your email</h1>
            <p className="mt-4 text-muted-foreground">
              We sent a verification link to <strong>{email}</strong>.
              Click it to claim your company page.
            </p>
          </div>
        ) : (
          <>
            <h1 className="font-display text-3xl font-bold">Claim your company page</h1>
            <p className="mt-2 text-muted-foreground">
              Enter your work email to verify you work at this company.
              We&apos;ll send a verification link.
            </p>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-sm font-medium">Work email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Must match the company&apos;s domain
                </p>
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-gt-black py-3 text-sm font-semibold text-white hover:bg-gt-black/85 disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send Verification Email"}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
