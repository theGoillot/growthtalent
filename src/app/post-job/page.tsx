"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

const SENIORITY_OPTIONS = ["INTERN", "JUNIOR", "MID", "SENIOR", "LEAD", "MANAGER", "DIRECTOR", "VP", "C_LEVEL"];
const REMOTE_OPTIONS = [
  { value: "ONSITE", label: "On-site" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "REMOTE", label: "Remote" },
  { value: "REMOTE_FRANCE", label: "Remote France" },
  { value: "REMOTE_EU", label: "Remote EU" },
  { value: "REMOTE_US", label: "Remote US" },
  { value: "REMOTE_WORLD", label: "Remote Worldwide" },
];
const MARKET_OPTIONS = [
  { value: "USA", label: "\ud83c\uddfa\ud83c\uddf8 USA" },
  { value: "FRANCE", label: "\ud83c\uddeb\ud83c\uddf7 France" },
  { value: "LATAM", label: "\ud83c\udf0e LatAm" },
];

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    companyName: "",
    companyWebsite: "",
    category: "growth-marketing",
    seniority: "MID",
    remote: "REMOTE",
    market: "USA",
    city: "",
    country: "",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD",
    description: "",
    applyUrl: "",
    contactEmail: "",
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/jobs/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        salaryMin: form.salaryMin ? parseInt(form.salaryMin) : null,
        salaryMax: form.salaryMax ? parseInt(form.salaryMax) : null,
      }),
    });

    if (res.ok) {
      router.push("/post-job/success");
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      setLoading(false);
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

      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="font-display text-4xl font-bold">Post a Job</h1>
        <p className="mt-2 text-muted-foreground">
          Free to post. Your listing will be reviewed by AI and go live within minutes.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Company */}
          <fieldset className="space-y-4 rounded-xl border p-6">
            <legend className="px-2 text-sm font-semibold">Company</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Company name *</label>
                <input type="text" required value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
              </div>
              <div>
                <label className="text-sm font-medium">Website</label>
                <input type="url" value={form.companyWebsite} onChange={(e) => update("companyWebsite", e.target.value)} placeholder="https://" className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Contact email *</label>
              <input type="email" required value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
            </div>
          </fieldset>

          {/* Job Details */}
          <fieldset className="space-y-4 rounded-xl border p-6">
            <legend className="px-2 text-sm font-semibold">Job Details</legend>
            <div>
              <label className="text-sm font-medium">Job title *</label>
              <input type="text" required value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Head of Growth, Senior SEO Manager" className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-sm font-medium">Category *</label>
                <select value={form.category} onChange={(e) => update("category", e.target.value)} className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/-/g, " ")}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Seniority *</label>
                <select value={form.seniority} onChange={(e) => update("seniority", e.target.value)} className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm">
                  {SENIORITY_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Market *</label>
                <select value={form.market} onChange={(e) => update("market", e.target.value)} className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm">
                  {MARKET_OPTIONS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-sm font-medium">Remote policy</label>
                <select value={form.remote} onChange={(e) => update("remote", e.target.value)} className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm">
                  {REMOTE_OPTIONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">City</label>
                <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="San Francisco" className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
              </div>
              <div>
                <label className="text-sm font-medium">Country</label>
                <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="US" className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
              </div>
            </div>
          </fieldset>

          {/* Salary */}
          <fieldset className="space-y-4 rounded-xl border p-6">
            <legend className="px-2 text-sm font-semibold">Salary (recommended)</legend>
            <p className="text-xs text-muted-foreground">Listings with salary get 3x more applications.</p>
            <div className="flex items-center gap-3">
              <select value={form.salaryCurrency} onChange={(e) => update("salaryCurrency", e.target.value)} className="rounded-lg border px-3 py-2.5 text-sm">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BRL">BRL</option>
              </select>
              <input type="number" value={form.salaryMin} onChange={(e) => update("salaryMin", e.target.value)} placeholder="Min (annual)" className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
              <span className="text-muted-foreground">-</span>
              <input type="number" value={form.salaryMax} onChange={(e) => update("salaryMax", e.target.value)} placeholder="Max (annual)" className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
            </div>
          </fieldset>

          {/* Description */}
          <fieldset className="space-y-4 rounded-xl border p-6">
            <legend className="px-2 text-sm font-semibold">Description</legend>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={8} placeholder="Describe the role, responsibilities, requirements..." className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
            <div>
              <label className="text-sm font-medium">Application URL *</label>
              <input type="url" required value={form.applyUrl} onChange={(e) => update("applyUrl", e.target.value)} placeholder="https://your-company.com/careers/apply" className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
            </div>
          </fieldset>

          <button type="submit" disabled={loading} className="w-full rounded-full bg-gt-black py-3 text-sm font-semibold text-white transition-colors hover:bg-gt-black/85 disabled:opacity-50">
            {loading ? "Submitting..." : "Post Job (Free)"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Want featured placement? <Link href="/boost" className="text-gt-purple hover:underline">Boost your listing</Link> after posting.
          </p>
        </form>
      </main>
    </div>
  );
}
