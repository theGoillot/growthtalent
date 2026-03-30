import Image from "next/image";
import Link from "next/link";
import { getAllStats, getCategoriesWithCount, getJobs } from "@/lib/queries";
import { getDictionary } from "@/dictionaries";
import { JobCard } from "@/components/job-card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DotGrid } from "@/components/dot-grid";
import { StickerFloat } from "@/components/sticker";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

const MARKETS = [
  { label: "USA", flag: "\ud83c\uddfa\ud83c\uddf8", href: "/jobs", locale: "en" as const },
  { label: "France", flag: "\ud83c\uddeb\ud83c\uddf7", href: "/emplois", locale: "fr" as const },
  { label: "LatAm", flag: "\ud83c\udf0e", href: "/empleos", locale: "es" as const },
];

export default async function HomePage() {
  const dict = getDictionary("en");
  const [stats, categories, { jobs: featuredJobs }] = await Promise.all([
    getAllStats(),
    getCategoriesWithCount("en"),
    getJobs({ locale: "en", limit: 6, boostedFirst: true }),
  ]);

  return (
    <>
      <Header dict={dict} locale="en" />

      {/* ── Hero ───────────────────────────────────────── */}
      <DotGrid className="relative overflow-hidden">
        <StickerFloat text="Gratuit" rotate={-12} className="left-[8%] top-[20%] hidden lg:block" />
        <StickerFloat text="Brillons ensemble" rotate={8} className="right-[6%] top-[30%] hidden lg:block" />
        <StickerFloat text="Sky is the limit" rotate={-5} className="left-[15%] bottom-[15%] hidden xl:block" />

        <div className="mx-auto max-w-5xl px-6 py-24 md:py-36">
          <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-gt-black md:text-8xl lg:text-9xl">
            Growth careers
            <br />
            that matter
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-gt-black/70">
            The only job board built for growth professionals.
            USA, France &amp; LatAm. Salary shown on every listing.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {MARKETS.map((m) => (
              <Link
                key={m.locale}
                href={m.href}
                className="rounded-full border-2 border-gt-black bg-white px-7 py-3.5 text-sm font-bold transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]"
              >
                {m.flag} {m.label} Jobs
              </Link>
            ))}
          </div>
        </div>
      </DotGrid>

      {/* ── Stats Bar ──────────────────────────────────── */}
      <section className="w-full border-b border-black/5 bg-white py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-16 px-6">
          {[
            { value: stats.jobCount > 0 ? `${stats.jobCount.toLocaleString()}+` : "2,400+", label: "Growth Jobs" },
            { value: stats.companyCount > 0 ? `${stats.companyCount.toLocaleString()}+` : "800+", label: "Companies" },
            { value: "54K+", label: "Community" },
            { value: "3", label: "Markets" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold md:text-3xl">{s.value}</div>
              <div className="mt-0.5 text-xs font-medium uppercase tracking-widest text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────── */}
      <section className="w-full bg-gt-cream py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Parlons Growth<br className="hidden sm:block" /> autrement
          </h2>
          <p className="mt-4 max-w-md text-gray-500">
            Browse jobs by specialty. Every role, every seniority, every market.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.category}
                href={`/jobs/${c.category}`}
                className="group rounded-2xl border-2 border-transparent bg-white p-5 transition-all hover:border-gt-black hover:shadow-[3px_3px_0px_#000]"
              >
                <div className="font-semibold text-gt-black group-hover:text-gt-black">
                  {dict.categories[c.category] ?? c.category}
                </div>
                <div className="mt-1 text-sm text-gray-400">{c.count} jobs</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Jobs ──────────────────────────────── */}
      {featuredJobs.length > 0 && (
        <section className="w-full bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-4xl font-bold md:text-5xl">Latest jobs</h2>
                <p className="mt-3 text-gray-500">Fresh growth opportunities across 3 markets.</p>
              </div>
              <Link
                href="/jobs"
                className="hidden rounded-full border-2 border-gt-black px-5 py-2.5 text-sm font-bold transition-all hover:bg-gt-black hover:text-white sm:block"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="mt-10 space-y-3">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} dict={dict} jobsPath="jobs" />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/jobs"
                className="rounded-full border-2 border-gt-black px-6 py-3 text-sm font-bold"
              >
                View all jobs &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 3 Markets ──────────────────────────────────── */}
      <section className="w-full bg-gt-pink/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-4xl font-bold md:text-5xl">
            3 markets, 1 platform
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Growth talent is global. So are we.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {MARKETS.map((m) => (
              <Link
                key={m.locale}
                href={m.href}
                className="group rounded-2xl border-2 border-gt-black bg-white p-8 text-center transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]"
              >
                <div className="text-5xl">{m.flag}</div>
                <div className="mt-4 font-display text-2xl font-bold">{m.label}</div>
                <p className="mt-2 text-sm text-gray-500">
                  Browse growth jobs
                </p>
                <div className="mt-4 inline-block rounded-full border-2 border-gt-black px-4 py-1.5 text-xs font-bold transition-all group-hover:bg-gt-black group-hover:text-white">
                  Explore &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Employer CTA ───────────────────────────────── */}
      <section className="w-full bg-gt-yellow py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Hire growth talent
          </h2>
          <p className="mt-4 text-lg text-gt-black/70">
            Post your job for free. Boost it to reach {stats.candidateCount > 0 ? `${stats.candidateCount.toLocaleString()}+` : "thousands of"} active growth professionals.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/post-job"
              className="rounded-full border-2 border-gt-black bg-gt-black px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black"
            >
              Post a Job (Free)
            </Link>
            <Link
              href="/boost"
              className="rounded-full border-2 border-gt-black bg-white px-8 py-3.5 text-sm font-bold transition-all hover:shadow-[4px_4px_0px_#000]"
            >
              Boost a Listing
            </Link>
          </div>
        </div>
      </section>

      <Footer dict={dict} />
    </>
  );
}
