import Link from "next/link";
import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getJobs, getCategoriesWithCount, getStats, getCompaniesWithLogos } from "@/lib/queries";
import { LogoTicker } from "@/components/logo-ticker";
import { StatCounter } from "@/components/stat-counter";
import { JobCarousel } from "@/components/job-carousel";
import { HomepageHero } from "@/components/homepage-hero";
// HomepageNav removed — existing layout header handles nav

export async function MarketHomepage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [stats, categories, { jobs }, companies] = await Promise.all([
    getStats(locale),
    getCategoriesWithCount(locale),
    getJobs({ locale, limit: 8, boostedFirst: true }),
    getCompaniesWithLogos(locale),
  ]);

  // Prepare lightweight job data for client-side search
  const searchJobs = jobs.map((j) => ({
    title: j.title,
    slug: j.slug,
    category: j.category,
    company: { name: j.company.name, slug: j.company.slug, domain: j.company.domain },
  }));

  return (
    <>
      {/* Dark Hero with toggle + search */}
      <HomepageHero
        jobsPath={dict.jobsPath}
        jobCount={stats.jobCount}
        companyCount={stats.companyCount}
        jobs={searchJobs}
        categories={categories}
      />

      {/* ── Logo Ticker ─────────────────────────────── */}
      {companies.length > 0 && <LogoTicker companies={companies} />}

      {/* ── Stats ───────────────────────────────────── */}
      <section className="w-full bg-white py-12">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-12 px-6 sm:gap-20">
          <StatCounter end={stats.jobCount} label="Open Roles" suffix="+" />
          <div className="h-12 w-px bg-gray-100" />
          <StatCounter end={stats.companyCount} label="Companies" suffix="+" />
          <div className="h-12 w-px bg-gray-100" />
          <StatCounter end={4} label="Markets" />
        </div>
      </section>

      {/* ── Value Props ─────────────────────────────── */}
      <section className="w-full bg-gray-50/50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gt-purple mb-4">Why Growth.Talent</p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Not another job board</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group relative rounded-3xl border border-black/[0.05] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gt-purple/10 text-gt-purple">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              </div>
              <h3 className="font-display text-xl font-bold">Real salaries</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-gray-500">Every listing shows compensation. If the company hides it, we estimate from market data. No more guessing, no more wasted interviews.</p>
            </div>
            <div className="group relative rounded-3xl border border-black/[0.05] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gt-yellow/20 text-gt-black">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h3 className="font-display text-xl font-bold">Curated, not scraped</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-gray-500">AI-moderated with human review. No spam, no recruiter noise, no ghost listings. Every role is a real growth position at a real company.</p>
            </div>
            <div className="group relative rounded-3xl border border-black/[0.05] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gt-pink/15 text-gt-black">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h3 className="font-display text-xl font-bold">Direct to company</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-gray-500">One click to the company&apos;s ATS. No profiles to fill, no middlemen, no talent marketplace games. You apply, they see you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Jobs Carousel ──────────────────── */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">Featured</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Latest growth roles</h2>
            </div>
            <Link
              href={`/${dict.jobsPath}`}
              className="hidden rounded-full border-2 border-gt-black px-6 py-2.5 text-[13px] font-bold transition-all hover:bg-gt-black hover:text-white sm:block"
            >
              View all jobs &rarr;
            </Link>
          </div>
          <JobCarousel jobs={jobs} jobsPath={dict.jobsPath} />
          <div className="mt-8 text-center sm:hidden">
            <Link href={`/${dict.jobsPath}`} className="rounded-full border-2 border-gt-black bg-gt-black px-8 py-3 text-[13px] font-bold text-white">
              View all jobs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categories ──────────────────────────────── */}
      <section className="w-full bg-gray-50/50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">Specialties</p>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Browse by discipline</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => {
              const isLarge = c.count > 15;
              return (
                <Link
                  key={c.category}
                  href={`/${dict.jobsPath}/${c.category}`}
                  className={`group rounded-2xl border-2 border-transparent bg-white transition-all hover:border-gt-black hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 ${
                    isLarge ? "px-7 py-5" : "px-5 py-4"
                  }`}
                >
                  <span className={`font-semibold text-gt-black ${isLarge ? "text-[16px]" : "text-[14px]"}`}>
                    {dict.categories[c.category] ?? c.category}
                  </span>
                  <span className={`ml-2 text-gray-300 ${isLarge ? "text-[14px]" : "text-[12px]"}`}>{c.count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Markets ─────────────────────────────────── */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">Global</p>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Growth roles worldwide</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { flag: "\ud83c\uddfa\ud83c\uddf8", label: "USA", tagline: "NYC, SF, Austin & more", path: "/jobs" },
              { flag: "\ud83c\uddeb\ud83c\uddf7", label: "France", tagline: "Paris, Lyon & remote", path: "/emplois" },
              { flag: "\ud83c\udf0e", label: "LatAm", tagline: "Mexico, Colombia, Argentina", path: "/empleos" },
              { flag: "\ud83c\udde7\ud83c\uddf7", label: "Brasil", tagline: "S\u00e3o Paulo & remote", path: "/empregos" },
            ].map((m) => (
              <Link
                key={m.path}
                href={m.path}
                className="group rounded-2xl border-2 border-black/[0.05] bg-white p-7 text-center transition-all hover:border-gt-black hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5"
              >
                <span className="text-4xl">{m.flag}</span>
                <div className="mt-4 font-display text-lg font-bold">{m.label}</div>
                <div className="mt-1 text-[12px] text-gray-400">{m.tagline}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ──────────────────────────── */}
      <section className="relative w-full overflow-hidden py-16" style={{ backgroundColor: "#0d0d0d" }}>
        {/* Decorative */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full bg-gt-purple/6 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-0 h-60 w-60 rounded-full bg-gt-yellow/5 blur-[100px]" />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/20 mb-5">Newsletter</p>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            The weekly growth digest
          </h2>
          <p className="mt-4 text-[15px] text-white/35 leading-relaxed">
            The best growth roles, curated by humans. Every Monday morning. Free forever.
          </p>
          <form action="/api/subscribe" method="POST" className="mx-auto mt-8 flex max-w-md gap-3">
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              required
              className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3.5 text-[14px] text-white placeholder:text-white/20 focus:border-gt-purple/40 focus:outline-none focus:ring-1 focus:ring-gt-purple/20 transition-all"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-white px-6 py-3.5 text-[13px] font-bold text-gt-black transition-all hover:bg-gt-yellow"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-5 text-[11px] text-white/15">No spam. Unsubscribe with one click.</p>
        </div>
      </section>
    </>
  );
}
