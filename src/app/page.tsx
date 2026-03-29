import Image from "next/image";
import Link from "next/link";
import { getAllStats, getCategoriesWithCount, getJobs } from "@/lib/queries";
import { getDictionary } from "@/dictionaries";
import { JobCard } from "@/components/job-card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
      <section className="relative w-full bg-gt-cream py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Growth careers
            <br />
            that <span className="text-gt-purple">matter</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Find your next growth marketing role at the best startups and
            scale-ups in the USA, France, and Latin America.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {MARKETS.map((m) => (
              <Link
                key={m.locale}
                href={m.href}
                className="rounded-full border-2 border-gt-black bg-white px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                {m.flag} Browse {m.label} Jobs
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────── */}
      <section className="w-full border-b border-border/50 bg-white py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-12 px-6">
          {[
            { value: stats.jobCount.toLocaleString() + "+", label: "Growth Jobs" },
            { value: stats.companyCount.toLocaleString() + "+", label: "Companies" },
            { value: "54K+", label: "Community" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories Grid ────────────────────────────── */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold">Browse by Category</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.category}
                href={`/jobs/${c.category}`}
                className="group rounded-xl border bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-gt-purple hover:shadow-md"
              >
                <div className="font-semibold group-hover:text-gt-purple">
                  {dict.categories[c.category] ?? c.category}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{c.count} jobs</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Jobs ──────────────────────────────── */}
      {featuredJobs.length > 0 && (
        <section className="w-full bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold">Featured Jobs</h2>
              <Link href="/jobs" className="text-sm font-medium text-gt-purple hover:underline">
                View all &rarr;
              </Link>
            </div>
            <div className="mt-6 space-y-3">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} dict={dict} jobsPath="jobs" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Markets ────────────────────────────────────── */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold text-center">3 Markets, 1 Platform</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {MARKETS.map((m) => (
              <Link
                key={m.locale}
                href={m.href}
                className="group rounded-xl border bg-white p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-4xl">{m.flag}</div>
                <div className="mt-3 font-display text-2xl font-bold group-hover:text-gt-purple">
                  {m.label}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Browse growth jobs in {m.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer dict={dict} />
    </>
  );
}
