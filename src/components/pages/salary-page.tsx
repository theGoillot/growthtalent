import Link from "next/link";
import type { Metadata } from "next";
import { getSalaryData, getAllSalarySlugs, SALARY_DATA, type RoleSalaryData } from "@/lib/salary-data";
import { getJobs } from "@/lib/queries";
import { getDictionary } from "@/dictionaries";
import { JobCard } from "@/components/job-card";

const BASE = "https://www.growthtalent.org";

function formatSalary(n: number): string {
  return `$${(n / 1000).toFixed(0)}K`;
}

// ── Hub page ────────────────────────────────────────────

export function generateSalaryHubMetadata(): Metadata {
  return {
    title: "Growth Marketing Salaries 2026 | Growth.Talent",
    description: "Real salary data for growth marketing roles. Compare salaries by role, seniority, and city. Data from 100+ real job listings.",
    alternates: { canonical: `${BASE}/salaries` },
  };
}

export function SalaryHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-5xl font-bold md:text-6xl">Growth Marketing Salaries</h1>
      <p className="mt-4 text-lg text-gray-500">Real compensation data from job listings across the US. Updated weekly.</p>

      <div className="mt-12 space-y-4">
        {SALARY_DATA.map((role) => {
          const overall = role.bySeniority["Mid (2-5 yrs)"] ?? Object.values(role.bySeniority)[1] ?? Object.values(role.bySeniority)[0];
          return (
            <Link
              key={role.slug}
              href={`/salaries/${role.slug}`}
              className="group flex items-center justify-between rounded-2xl border-2 border-black/[0.06] bg-white p-6 transition-all hover:border-gt-black hover:shadow-[4px_4px_0px_#000]"
            >
              <div>
                <h2 className="font-display text-lg font-bold">{role.title}</h2>
                <p className="mt-1 text-sm text-gray-400">{role.description.slice(0, 100)}...</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className="text-lg font-bold text-emerald-600">
                  {formatSalary(overall.min)}\u2013{formatSalary(overall.max)}
                </div>
                <div className="text-[11px] text-gray-400">mid-level range</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* SEO content */}
      <section className="mt-16 border-t pt-12">
        <h2 className="font-display text-2xl font-bold">How We Calculate Salaries</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Our salary data comes from real job listings on Growth.Talent. When companies share compensation, we use their exact numbers.
          When salary is hidden, we estimate based on role level, location, company size, and industry benchmarks.
          All ranges are for full-time positions in the United States, denominated in USD.
        </p>
      </section>
    </div>
  );
}

// ── Role-specific page ──────────────────────────────────

export function generateSalaryPageMetadata(slug: string): Metadata {
  const data = getSalaryData(slug);
  if (!data) return { title: "Salary Data | Growth.Talent" };

  const mid = data.bySeniority["Mid (2-5 yrs)"] ?? Object.values(data.bySeniority)[1] ?? Object.values(data.bySeniority)[0];
  return {
    title: `${data.title} Salary 2026: ${formatSalary(mid.min)}\u2013${formatSalary(mid.max)} | Growth.Talent`,
    description: `${data.title} salary ranges by seniority and city. Mid-level: ${formatSalary(mid.min)}\u2013${formatSalary(mid.max)}. Based on real job listings.`,
    alternates: { canonical: `${BASE}/salaries/${slug}` },
  };
}

export async function SalaryDetailPage({ slug }: { slug: string }) {
  const data = getSalaryData(slug);
  if (!data) return <div className="p-12 text-center text-gray-500">Salary data not found.</div>;

  const dict = getDictionary("en");
  const { jobs } = await getJobs({ locale: "en", category: data.category, limit: 4 });

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/salaries" className="hover:text-gt-black">Salaries</Link>
        <span>/</span>
        <span className="text-gray-600">{data.title}</span>
      </nav>

      <h1 className="font-display text-4xl font-bold md:text-5xl">{data.title} Salary</h1>
      <p className="mt-4 text-lg text-gray-500">{data.description}</p>

      {/* By Seniority */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold mb-6">Salary by Seniority</h2>
        <div className="space-y-3">
          {Object.entries(data.bySeniority).map(([level, range]) => (
            <div key={level} className="rounded-xl border p-5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gt-black">{level}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">
                  {formatSalary(range.min)}\u2013{formatSalary(range.max)}
                </div>
                <div className="text-[11px] text-gray-400">median: {formatSalary(range.median)}</div>
              </div>
              {/* Visual bar */}
              <div className="hidden sm:block w-48 ml-6">
                <div className="h-3 rounded-full bg-gray-100 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-emerald-400/60"
                    style={{ width: `${(range.max / 300000) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
                    style={{ width: `${(range.median / 300000) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* By City */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold mb-6">Salary by City</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(data.byCity).map(([city, range]) => (
            <div key={city} className="rounded-xl border p-5">
              <div className="font-semibold text-gt-black">{city}</div>
              <div className="mt-2 text-lg font-bold text-emerald-600">
                {formatSalary(range.min)}\u2013{formatSalary(range.max)}
              </div>
              <div className="text-[11px] text-gray-400">median: {formatSalary(range.median)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Skills */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold mb-4">Top Skills Required</h2>
        <div className="flex flex-wrap gap-2">
          {data.topSkills.map((skill) => (
            <span key={skill} className="rounded-full bg-gt-purple/10 px-4 py-1.5 text-sm font-medium text-gt-black">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Related Jobs */}
      {jobs.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold mb-6">Open {data.title} Positions</h2>
          <div className="space-y-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} dict={dict} jobsPath="jobs" />
            ))}
          </div>
          <Link href={`/jobs/${data.category}`} className="mt-6 inline-block text-sm font-semibold text-gt-purple hover:underline">
            View all {data.title} jobs &rarr;
          </Link>
        </section>
      )}

      {/* Related Salaries */}
      <section className="mt-12 border-t pt-8">
        <h2 className="font-display text-xl font-bold mb-4">Related Salary Data</h2>
        <div className="flex flex-wrap gap-2">
          {data.relatedRoles.map((slug) => {
            const related = getSalaryData(slug);
            if (!related) return null;
            return (
              <Link
                key={slug}
                href={`/salaries/${slug}`}
                className="rounded-full border-2 border-black/10 px-4 py-2 text-sm font-medium text-gray-600 hover:border-gt-black hover:text-gt-black transition-all"
              >
                {related.title} Salary
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
