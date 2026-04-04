"use client";

import { useState } from "react";

export function JobAlertCta({ category }: { category: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `job-alert-${category}` }),
      });
      setSubmitted(true);
    } catch {
      // silent fail — still show success to not frustrate user
      setSubmitted(true);
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
        <p className="text-sm font-semibold text-green-800">You&apos;re in! We&apos;ll email you new jobs like this.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-gt-purple/20 bg-gt-purple/5 p-5">
      <p className="text-sm font-semibold text-gt-black">Get jobs like this in your inbox</p>
      <p className="mt-1 text-xs text-gray-500">Weekly digest. Unsubscribe anytime.</p>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="flex-1 rounded-lg border bg-white px-3 py-2 text-sm focus:border-gt-purple focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gt-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gt-black/85 disabled:opacity-50"
        >
          {loading ? "..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
