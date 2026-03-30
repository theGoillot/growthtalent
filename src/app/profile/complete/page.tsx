"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SENIORITY_OPTIONS = [
  { value: "INTERN", label: "Intern / Stage" },
  { value: "JUNIOR", label: "Junior (0-2 years)" },
  { value: "MID", label: "Mid-level (2-5 years)" },
  { value: "SENIOR", label: "Senior (5-8 years)" },
  { value: "LEAD", label: "Lead" },
  { value: "MANAGER", label: "Manager" },
  { value: "DIRECTOR", label: "Director" },
  { value: "VP", label: "VP / Head of" },
  { value: "C_LEVEL", label: "C-Level (CMO, CGO)" },
];

const TOOL_OPTIONS = [
  "Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads",
  "HubSpot", "Salesforce", "Marketo", "Brevo",
  "Mixpanel", "Amplitude", "Google Analytics", "Segment",
  "Ahrefs", "SEMrush", "Moz",
  "Braze", "Iterable", "Customer.io", "Klaviyo",
  "Webflow", "WordPress", "Notion",
  "Figma", "Canva",
  "Zapier", "Make", "n8n",
];

const SCOPE_OPTIONS = [
  { value: "solo", label: "Solo / IC" },
  { value: "1-5", label: "1-5 people" },
  { value: "5-15", label: "5-15 people" },
  { value: "15-50", label: "15-50 people" },
  { value: "50+", label: "50+ people" },
];

export default function ProfileCompletePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    currentTitle: "",
    seniority: "",
    city: "",
    country: "",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD",
    tools: [] as string[],
    teamScope: "",
  });

  function toggleTool(tool: string) {
    setForm((f) => ({
      ...f,
      tools: f.tools.includes(tool) ? f.tools.filter((t) => t !== tool) : [...f.tools, tool],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        salaryMin: form.salaryMin ? parseInt(form.salaryMin) : null,
        salaryMax: form.salaryMax ? parseInt(form.salaryMax) : null,
      }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gt-cream/30 py-12">
      <div className="mx-auto max-w-lg px-6">
        <div className="flex items-center justify-center gap-3">
          <Image src="/Logo_GT.svg" alt="Growth.Talent" width={32} height={32} />
          <span className="font-display text-xl font-bold">Growth.Talent</span>
        </div>

        <h1 className="mt-8 font-display text-3xl font-bold text-center">
          Complete your profile
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Help us match you with the right opportunities. Takes 2 minutes.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-2xl border bg-white p-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Current job title</label>
            <input
              type="text"
              value={form.currentTitle}
              onChange={(e) => setForm({ ...form, currentTitle: e.target.value })}
              placeholder="e.g. Growth Manager, Head of Marketing"
              className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
            />
          </div>

          {/* Seniority */}
          <div>
            <label className="text-sm font-medium">Seniority level</label>
            <select
              value={form.seniority}
              onChange={(e) => setForm({ ...form, seniority: e.target.value })}
              className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
            >
              <option value="">Select level</option>
              {SENIORITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Paris, NYC..."
                className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Country</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                placeholder="US, FR, CO..."
                className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
              />
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="text-sm font-medium">Target salary range (annual)</label>
            <div className="mt-1 flex items-center gap-2">
              <select
                value={form.salaryCurrency}
                onChange={(e) => setForm({ ...form, salaryCurrency: e.target.value })}
                className="rounded-lg border px-3 py-2.5 text-sm"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BRL">BRL</option>
              </select>
              <input
                type="number"
                value={form.salaryMin}
                onChange={(e) => setForm({ ...form, salaryMin: e.target.value })}
                placeholder="Min"
                className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
              />
              <span className="text-muted-foreground">-</span>
              <input
                type="number"
                value={form.salaryMax}
                onChange={(e) => setForm({ ...form, salaryMax: e.target.value })}
                placeholder="Max"
                className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
              />
            </div>
          </div>

          {/* Team scope */}
          <div>
            <label className="text-sm font-medium">Team scope</label>
            <select
              value={form.teamScope}
              onChange={(e) => setForm({ ...form, teamScope: e.target.value })}
              className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
            >
              <option value="">Select scope</option>
              {SCOPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Tools */}
          <div>
            <label className="text-sm font-medium">Tools you use</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {TOOL_OPTIONS.map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => toggleTool(tool)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    form.tools.includes(tool)
                      ? "bg-gt-purple text-gt-black"
                      : "border bg-white text-muted-foreground hover:bg-gray-50"
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gt-black py-3 text-sm font-semibold text-white transition-colors hover:bg-gt-black/85 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
