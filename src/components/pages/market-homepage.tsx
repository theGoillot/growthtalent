import Link from "next/link";
import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getJobs, getCategoriesWithCount, getStats, getCompaniesWithLogos } from "@/lib/queries";
import { JobCard } from "@/components/job-card";
import { LogoTicker } from "@/components/logo-ticker";
import { HeroSearch } from "@/components/hero-search";
import { AudienceTabs } from "@/components/audience-tabs";
import { StatCounter } from "@/components/stat-counter";

const MARKETS = [
  { flag: "\ud83c\uddfa\ud83c\uddf8", label: "USA", path: "/jobs", tagline: "NYC, SF, Austin & more" },
  { flag: "\ud83c\uddeb\ud83c\uddf7", label: "France", path: "/emplois", tagline: "Paris, Lyon & remote" },
  { flag: "\ud83c\udf0e", label: "LatAm", path: "/empleos", tagline: "Mexico, Colombia, Argentina" },
  { flag: "\ud83c\udde7\ud83c\uddf7", label: "Brasil", path: "/empregos", tagline: "S\u00e3o Paulo & remote" },
];

export async function MarketHomepage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [stats, categories, { jobs }, companies] = await Promise.all([
    getStats(locale),
    getCategoriesWithCount(locale),
    getJobs({ locale, limit: 8, boostedFirst: true }),
    getCompaniesWithLogos(locale),
  ]);

  return (
    <>
      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gt-cream/40 via-white to-white">
        {/* Decorative blurs */}
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-gt-purple/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-gt-pink/10 blur-[100px]" />
        <div className="pointer-events-none absolute left-1/3 -top-20 h-64 w-64 rounded-full bg-gt-yellow/15 blur-[80px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-20 md:pb-24 md:pt-32">
          {/* Headline */}
          <h1 className="font-display text-center text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.92] tracking-tight text-gt-black">
            {dict.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-gray-500">
            {dict.hero.subtitle}
          </p>

          {/* Search */}
          <div className="mt-10">
            <HeroSearch jobsPath={dict.jobsPath} />
          </div>
        </div>
      </section>

      {/* ── Company Logo Ticker ─────────────────────── */}
      {companies.length > 0 && <LogoTicker companies={companies} />}

      {/* ── Stats Bar ───────────────────────────────── */}
      <section className="w-full bg-white py-12">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-12 px-6 sm:gap-20">
          <StatCounter end={stats.jobCount} label={dict.nav.jobs} suffix="+" />
          <div className="h-10 w-px bg-gray-200" />
          <StatCounter end={stats.companyCount} label={dict.nav.companies} suffix="+" />
          <div className="h-10 w-px bg-gray-200" />
          <StatCounter end={4} label="Markets" />
        </div>
      </section>

      {/* ── Dual Audience Tabs ──────────────────────── */}
      <section className="w-full bg-white pb-20 pt-8">
        <div className="mx-auto max-w-7xl px-6">
          <AudienceTabs
            talentContent={
              <>
                {/* Latest Jobs */}
                <div>
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <h2 className="font-display text-3xl font-bold md:text-4xl">{dict.job.allJobs}</h2>
                      <p className="mt-2 text-sm text-gray-400">Curated roles with real salaries. Updated daily.</p>
                    </div>
                    <Link
                      href={`/${dict.jobsPath}`}
                      className="hidden rounded-full border-2 border-gt-black px-5 py-2.5 text-sm font-bold transition-all hover:bg-gt-black hover:text-white sm:block"
                    >
                      {dict.hero.cta} &rarr;
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job} dict={dict} jobsPath={dict.jobsPath} />
                    ))}
                  </div>
                  <div className="mt-8 text-center sm:hidden">
                    <Link
                      href={`/${dict.jobsPath}`}
                      className="rounded-full border-2 border-gt-black bg-gt-black px-8 py-3 text-sm font-bold text-white"
                    >
                      {dict.hero.cta} &rarr;
                    </Link>
                  </div>
                </div>
              </>
            }
            employerContent={
              <div className="mx-auto max-w-3xl">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold md:text-4xl">
                    Reach growth professionals where they look
                  </h2>
                  <p className="mt-3 text-gray-500">
                    Post for free. Boost for visibility. No middlemen.
                  </p>
                </div>

                {/* Pricing cards */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Free */}
                  <div className="rounded-3xl border-2 border-black/10 bg-white p-8">
                    <div className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">Free</div>
                    <div className="mt-2 font-display text-4xl font-bold">$0</div>
                    <p className="mt-3 text-sm text-gray-500">Post your growth role and reach qualified candidates.</p>
                    <ul className="mt-6 space-y-3">
                      {["Job listed in category", "Company page created", "Email applications", "30-day listing"].map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/post-job"
                      className="mt-8 block w-full rounded-full border-2 border-gt-black py-3 text-center text-sm font-bold transition-all hover:bg-gt-black hover:text-white"
                    >
                      Post a Job (Free)
                    </Link>
                  </div>

                  {/* Boost */}
                  <div className="rounded-3xl border-2 border-gt-black bg-gt-black p-8 text-white shadow-[6px_6px_0px_rgba(168,170,216,0.4)]">
                    <div className="text-xs font-bold uppercase tracking-[0.15em] text-gt-purple">Boost</div>
                    <div className="mt-2 font-display text-4xl font-bold">$299</div>
                    <p className="mt-3 text-sm text-white/60">Featured placement + candidate profiles. Maximum visibility.</p>
                    <ul className="mt-6 space-y-3">
                      {["Featured at top of listings", "\"Featured\" badge on your listing", "Access to candidate profiles", "Priority in search results", "30-day boost period"].map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFE495" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/boost"
                      className="mt-8 block w-full rounded-full bg-gt-yellow py-3 text-center text-sm font-bold text-gt-black transition-all hover:shadow-lg"
                    >
                      Boost a Listing
                    </Link>
                  </div>
                </div>

                {/* Claim */}
                <div className="mt-8 rounded-2xl border border-black/10 bg-gt-cream/20 p-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already see your company on Growth.Talent?{" "}
                    <Link href="/claim" className="font-semibold text-gt-purple hover:underline">
                      Claim your page &rarr;
                    </Link>
                  </p>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* ── Categories ──────────────────────────────── */}
      {categories.length > 0 && (
        <section className="w-full bg-gt-cream/30 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Browse by specialty
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {stats.jobCount}+ roles across {categories.length} growth disciplines
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((c) => (
                <Link
                  key={c.category}
                  href={`/${dict.jobsPath}/${c.category}`}
                  className="group rounded-2xl border-2 border-transparent bg-white p-5 transition-all hover:border-gt-black hover:shadow-[4px_4px_0px_#000]"
                >
                  <div className="font-semibold text-gt-black group-hover:text-gt-black">
                    {dict.categories[c.category] ?? c.category}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">
                    {c.count} {c.count === 1 ? "job" : "jobs"}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Markets ─────────────────────────────────── */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Growth roles worldwide
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              One board, four markets. Find roles where you want to work.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MARKETS.map((m) => (
              <Link
                key={m.path}
                href={m.path}
                className="group rounded-2xl border-2 border-black/10 bg-white p-6 text-center transition-all hover:border-gt-black hover:shadow-[4px_4px_0px_#000]"
              >
                <span className="text-4xl">{m.flag}</span>
                <div className="mt-3 font-display text-lg font-bold">{m.label}</div>
                <div className="mt-1 text-xs text-gray-400">{m.tagline}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ──────────────────────────── */}
      <section className="w-full bg-gt-dark py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Get the weekly growth job digest
          </h2>
          <p className="mt-3 text-white/50">
            The best growth roles, curated by humans. Every Monday. Free.
          </p>
          <form
            action="/api/subscribe"
            method="POST"
            className="mx-auto mt-8 flex max-w-md gap-3"
          >
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              required
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gt-purple focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-gt-yellow px-6 py-3 text-sm font-bold text-gt-black transition-all hover:bg-gt-yellow/80"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-[11px] text-white/25">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
