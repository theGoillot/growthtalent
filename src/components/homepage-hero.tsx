"use client";

import { useState } from "react";
import Link from "next/link";
import { AgentSearch } from "@/components/agent-search";

interface HomepageHeroProps {
  jobsPath: string;
  jobCount: number;
  companyCount: number;
  jobs: { title: string; slug: string; category: string; company: { name: string; slug: string; domain: string | null } }[];
  categories: { category: string; count: number }[];
}

const SUGGESTIONS = [
  { label: "Head of Growth", href: "/jobs/head-of-growth" },
  { label: "Remote", href: "/jobs?remote=true" },
  { label: "France", href: "/emplois" },
  { label: "SEO", href: "/jobs/seo" },
  { label: "$100K+", href: "/jobs?q=" },
  { label: "Product Marketing", href: "/jobs/product-marketing" },
];

export function HomepageHero({ jobsPath, jobCount, companyCount, jobs, categories }: HomepageHeroProps) {
  const [mode, setMode] = useState<"find" | "hire">("find");

  return (
    <section
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-8 pb-12"
      style={{
        backgroundColor: "#111",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Glow orbs — change color based on mode */}
      <div
        className="pointer-events-none absolute transition-all duration-1000"
        style={{
          left: "15%",
          top: "25%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: mode === "find" ? "rgba(168,170,216,0.07)" : "rgba(255,228,149,0.06)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="pointer-events-none absolute transition-all duration-1000"
        style={{
          right: "10%",
          bottom: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: mode === "find" ? "rgba(254,185,206,0.05)" : "rgba(248,234,221,0.06)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="pointer-events-none absolute transition-all duration-1000"
        style={{
          left: "50%",
          top: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          transform: "translateX(-50%)",
          background: mode === "find" ? "rgba(168,170,216,0.04)" : "rgba(255,228,149,0.04)",
          filter: "blur(80px)",
        }}
      />

      {/* Toggle */}
      <div className="relative z-10 mb-10">
        <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] p-1 backdrop-blur-sm">
          <button
            onClick={() => setMode("find")}
            className={`relative rounded-full px-6 py-2.5 text-[13px] font-bold transition-all duration-300 ${
              mode === "find"
                ? "bg-white text-gt-black shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Find a Job
          </button>
          <button
            onClick={() => setMode("hire")}
            className={`relative rounded-full px-6 py-2.5 text-[13px] font-bold transition-all duration-300 ${
              mode === "hire"
                ? "bg-gt-yellow text-gt-black shadow-[0_2px_10px_rgba(255,228,149,0.2)]"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Hire Someone
          </button>
        </div>
      </div>

      {/* Content — switches based on mode */}
      <div className="relative z-10 w-full max-w-3xl">
        {mode === "find" ? (
          /* ── Find a Job ── */
          <div className="text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[12px] font-medium text-white/40">{jobCount}+ growth roles live now</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-tight text-white">
              Find your next<br />growth role
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/30">
              The #1 job board for growth professionals. Real salaries, curated roles, zero noise.
            </p>

            {/* Search */}
            <div className="mt-10">
              <AgentSearch jobs={jobs} categories={categories} jobsPath={jobsPath} />
            </div>

            {/* Suggestion pills */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-[12px] font-medium text-white/35 transition-all hover:border-white/15 hover:bg-white/[0.06] hover:text-white/60"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* ── Hire Someone ── */
          <div className="text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-gt-yellow/20 bg-gt-yellow/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gt-yellow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gt-yellow" />
              </span>
              <span className="text-[12px] font-medium text-white/40">{companyCount}+ companies hiring</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-tight text-white">
              Hire growth<br />talent
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/30">
              Post for free. Boost for visibility. Reach growth professionals where they actually look.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/post-job"
                className="rounded-2xl bg-white px-10 py-4 text-[15px] font-bold text-gt-black transition-all hover:bg-gt-yellow hover:shadow-[0_0_30px_rgba(255,228,149,0.2)]"
              >
                Post a Job &mdash; Free
              </Link>
              <Link
                href="/boost"
                className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-10 py-4 text-[15px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:border-white/20"
              >
                Boost &mdash; $299
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-12 flex justify-center gap-10">
              {[
                { value: "2 min", label: "to post" },
                { value: "$0", label: "forever" },
                { value: "4", label: "markets" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-[20px] font-bold text-white/70">{s.value}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-white/20">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/10 p-1">
          <div className="h-1.5 w-1 animate-bounce rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  );
}
