import type { Metadata } from "next";
import { getJobs, getCategoriesWithCount, getStats, getCompaniesWithLogos } from "@/lib/queries";
import { getDictionary } from "@/dictionaries";
import { JobCard } from "@/components/job-card";
import { StatCounter } from "@/components/stat-counter";
import { AgentHero } from "./agent-hero";
import Link from "next/link";

export const metadata: Metadata = { title: "Concept 3: The Agent | Growth.Talent", robots: { index: false } };

export default async function Concept3Page() {
  const locale = "en";
  const dict = getDictionary(locale);
  const [stats, categories, { jobs }] = await Promise.all([
    getStats(locale),
    getCategoriesWithCount(locale),
    getJobs({ locale, limit: 6, boostedFirst: true }),
  ]);

  return (
    <>
      {/* ── Dark Agent Hero ── */}
      <AgentHero jobsPath={dict.jobsPath} jobCount={stats.jobCount} />

      {/* ── Why Growth.Talent ── */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Why Growth.Talent?</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "💰",
                title: "Real salaries",
                desc: "Every listing shows compensation. No more guessing. If the company doesn't share, we estimate based on market data.",
              },
              {
                icon: "🎯",
                title: "Curated roles",
                desc: "AI-moderated. No spam, no recruiter noise, no off-topic listings. Every job is a real growth/marketing role.",
              },
              {
                icon: "⚡",
                title: "Direct apply",
                desc: "One click to the company's ATS. No middlemen profiles, no talent marketplaces. You apply, they see you.",
              },
            ].map((v) => (
              <div key={v.title} className="rounded-3xl border-2 border-black/[0.06] p-8">
                <div className="text-4xl">{v.icon}</div>
                <h3 className="mt-5 font-display text-xl font-bold">{v.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="w-full border-y border-black/5 bg-gt-cream/20 py-12">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-12 px-6 sm:gap-20">
          <StatCounter end={stats.jobCount} label="Jobs" suffix="+" />
          <div className="h-10 w-px bg-black/10" />
          <StatCounter end={stats.companyCount} label="Companies" suffix="+" />
          <div className="h-10 w-px bg-black/10" />
          <StatCounter end={4} label="Markets" />
        </div>
      </section>

      {/* ── Dual Split: Talent | Employer ── */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Talent side */}
            <div className="rounded-3xl border-2 border-black/[0.06] bg-gradient-to-br from-gt-purple/5 to-white p-8 md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gt-purple">For growth pros</div>
              <h3 className="mt-4 font-display text-2xl font-bold">Find your next role</h3>
              <p className="mt-3 text-[14px] text-gray-500 leading-relaxed">
                Browse {stats.jobCount}+ curated growth roles with real salaries. Filter by category, city, remote, seniority.
              </p>
              <ul className="mt-6 space-y-3">
                {["Real salary data on every listing", "16 growth specialties", "USA, France, LatAm, Brasil", "Apply directly — no middlemen"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[13px] text-gray-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8AAD8" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/jobs" className="mt-8 inline-block rounded-full border-2 border-gt-black bg-gt-black px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black">
                Browse Jobs &rarr;
              </Link>
            </div>

            {/* Employer side */}
            <div className="rounded-3xl border-2 border-black/[0.06] bg-gradient-to-br from-gt-yellow/10 to-white p-8 md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-gt-black/40">For employers</div>
              <h3 className="mt-4 font-display text-2xl font-bold">Hire growth talent</h3>
              <p className="mt-3 text-[14px] text-gray-500 leading-relaxed">
                Post for free. Boost for $299 to feature your listing and access candidate profiles.
              </p>
              <ul className="mt-6 space-y-3">
                {["Post your role in 2 minutes", "Free forever — no hidden fees", "Boost for featured placement", "Claim your company page"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[13px] text-gray-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFE495" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/post-job" className="mt-8 inline-block rounded-full border-2 border-gt-black px-6 py-3 text-sm font-bold transition-all hover:bg-gt-black hover:text-white">
                Post a Job (Free) &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Scroller ── */}
      <section className="w-full bg-gt-cream/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-center text-3xl font-bold md:text-4xl">Browse by specialty</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.category}
                href={`/jobs/${c.category}`}
                className="group rounded-2xl border-2 border-transparent bg-white p-5 transition-all hover:border-gt-black hover:shadow-[4px_4px_0px_#000]"
              >
                <div className="font-semibold">{dict.categories[c.category] ?? c.category}</div>
                <div className="mt-1 text-sm text-gray-400">{c.count} jobs</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Jobs ── */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Latest roles</h2>
            <Link href="/jobs" className="hidden rounded-full border-2 border-gt-black px-5 py-2.5 text-sm font-bold transition-all hover:bg-gt-black hover:text-white sm:block">
              View all &rarr;
            </Link>
          </div>
          <div className="space-y-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} dict={dict} jobsPath="jobs" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark Newsletter CTA ── */}
      <section className="w-full bg-gt-dark py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Get the weekly growth job digest</h2>
          <p className="mt-3 text-white/40">Curated roles, every Monday. No spam.</p>
          <div className="mx-auto mt-8 flex max-w-md gap-3">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gt-purple focus:outline-none"
            />
            <button className="rounded-xl bg-gt-yellow px-6 py-3 text-sm font-bold text-gt-black transition-all hover:bg-gt-yellow/80">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
