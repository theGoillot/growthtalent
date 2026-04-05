import type { Metadata } from "next";
import { getJobs, getCategoriesWithCount, getStats, getCompaniesWithLogos } from "@/lib/queries";
import { getDictionary } from "@/dictionaries";
import { JobCard } from "@/components/job-card";
import { LogoTicker } from "@/components/logo-ticker";
import { StatCounter } from "@/components/stat-counter";
import { GalaxyHero } from "./galaxy-hero";
import Link from "next/link";

export const metadata: Metadata = { title: "Concept 1: The Galaxy | Growth.Talent", robots: { index: false } };

export default async function Concept1Page() {
  const locale = "en";
  const dict = getDictionary(locale);
  const [stats, categories, { jobs }, companies] = await Promise.all([
    getStats(locale),
    getCategoriesWithCount(locale),
    getJobs({ locale, limit: 6, boostedFirst: true }),
    getCompaniesWithLogos(locale),
  ]);

  return (
    <>
      {/* ── Galaxy Hero ── */}
      <GalaxyHero jobsPath={dict.jobsPath} />

      {/* ── Logo Ticker ── */}
      {companies.length > 0 && <LogoTicker companies={companies} />}

      {/* ── Trust Stats ── */}
      <section className="w-full bg-white py-14">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-12 px-6 sm:gap-20">
          <StatCounter end={stats.jobCount} label="Jobs" suffix="+" />
          <div className="h-10 w-px bg-gray-200" />
          <StatCounter end={stats.companyCount} label="Companies" suffix="+" />
          <div className="h-10 w-px bg-gray-200" />
          <StatCounter end={4} label="Markets" />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="w-full bg-gt-cream/30 py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">How it works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { num: "01", icon: "🔍", title: "Browse", desc: "Filter by category, city, salary, remote. Every role shows real compensation." },
              { num: "02", icon: "⚡", title: "Apply", desc: "One click to the company's ATS. No middlemen, no profile games." },
              { num: "03", icon: "🚀", title: "Get hired", desc: "Direct line to the hiring team. Average response time: 72 hours." },
            ].map((step) => (
              <div key={step.num} className="relative rounded-3xl border-2 border-black/[0.06] bg-white p-8 text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gt-purple px-4 py-1 text-[11px] font-bold text-white">
                  {step.num}
                </div>
                <div className="mt-2 text-4xl">{step.icon}</div>
                <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Jobs ── */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Latest jobs</h2>
            <Link href="/jobs" className="hidden rounded-full border-2 border-gt-black px-5 py-2.5 text-sm font-bold transition-all hover:bg-gt-black hover:text-white sm:block">
              View all &rarr;
            </Link>
          </div>
          <div className="space-y-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} dict={dict} jobsPath={dict.jobsPath} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="w-full bg-gt-cream/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-center text-3xl font-bold md:text-4xl">Explore by specialty</h2>
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

      {/* ── Employer CTA ── */}
      <section className="w-full bg-gt-yellow py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Hiring growth talent?</h2>
          <p className="mt-4 text-gt-black/60">Post your role for free. Boost for $299 to feature it.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/post-job" className="rounded-full border-2 border-gt-black bg-gt-black px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black">
              Post a Job (Free)
            </Link>
            <Link href="/boost" className="rounded-full border-2 border-gt-black bg-white px-8 py-3.5 text-sm font-bold transition-all hover:shadow-[4px_4px_0px_#000]">
              Boost
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
