import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getJobs, getCategoriesWithCount } from "@/lib/queries";
import { JobCard } from "@/components/job-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Metadata } from "next";
import { categoryUrl } from "@/lib/seo";

export function generateJobsListMetadata(locale: Locale, category?: string): Metadata {
  const dict = getDictionary(locale);
  const categoryLabel = category ? dict.categories[category] ?? category : null;
  const title = categoryLabel
    ? `${categoryLabel} ${dict.nav.jobs}`
    : dict.nav.jobs;

  return {
    title,
    description: `Browse ${categoryLabel ?? "growth marketing"} jobs. ${dict.hero.subtitle}`,
    alternates: {
      canonical: category ? categoryUrl(locale, category) : undefined,
    },
  };
}

export async function JobsListPage({
  locale,
  category,
  searchParams,
}: {
  locale: Locale;
  category?: string;
  searchParams: { page?: string; seniority?: string; remote?: string; q?: string };
}) {
  const dict = getDictionary(locale);
  const page = parseInt(searchParams.page ?? "1");

  const [{ jobs, total, totalPages }, categories] = await Promise.all([
    getJobs({
      locale,
      category,
      seniority: searchParams.seniority,
      remote: searchParams.remote === "true" ? true : undefined,
      search: searchParams.q,
      page,
    }),
    getCategoriesWithCount(locale),
  ]);

  const categoryLabel = category ? dict.categories[category] ?? category : null;
  const jobsPath = dict.jobsPath;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">
          {categoryLabel ?? dict.nav.jobs}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {total} {total === 1 ? "position" : "positions"} {categoryLabel ? `in ${categoryLabel}` : "available"}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar: Categories */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {dict.filters.allCategories}
          </h3>
          <div className="space-y-1">
            <Link
              href={`/${jobsPath}`}
              className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                !category ? "bg-gt-purple/15 font-medium" : "text-muted-foreground hover:bg-gray-100"
              }`}
            >
              {dict.job.allJobs} ({categories.reduce((sum, c) => sum + c.count, 0)})
            </Link>
            {categories.map((c) => (
              <Link
                key={c.category}
                href={`/${jobsPath}/${c.category}`}
                className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  c.category === category ? "bg-gt-purple/15 font-medium" : "text-muted-foreground hover:bg-gray-100"
                }`}
              >
                {dict.categories[c.category] ?? c.category} ({c.count})
              </Link>
            ))}
          </div>
        </aside>

        {/* Job list */}
        <div className="flex-1 space-y-3">
          {/* Mobile category pills */}
          <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
            <Link
              href={`/${jobsPath}`}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                !category ? "bg-gt-black text-white" : "border bg-white"
              }`}
            >
              All
            </Link>
            {categories.slice(0, 8).map((c) => (
              <Link
                key={c.category}
                href={`/${jobsPath}/${c.category}`}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  c.category === category ? "bg-gt-black text-white" : "border bg-white"
                }`}
              >
                {dict.categories[c.category] ?? c.category}
              </Link>
            ))}
          </div>

          {/* Seniority filter pills */}
          <div className="mb-4 flex flex-wrap gap-2">
            {["JUNIOR", "MID", "SENIOR", "LEAD", "VP"].map((s) => (
              <Link
                key={s}
                href={`/${jobsPath}${category ? `/${category}` : ""}?seniority=${s}`}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  searchParams.seniority === s ? "bg-gt-purple text-gt-black" : "border bg-white text-muted-foreground hover:bg-gray-50"
                }`}
              >
                {dict.seniority[s] ?? s}
              </Link>
            ))}
            <Link
              href={`/${jobsPath}${category ? `/${category}` : ""}?remote=true`}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                searchParams.remote === "true" ? "bg-gt-purple text-gt-black" : "border bg-white text-muted-foreground hover:bg-gray-50"
              }`}
            >
              {dict.filters.remote}
            </Link>
          </div>

          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} dict={dict} jobsPath={jobsPath} />
            ))
          ) : (
            <p className="py-16 text-center text-muted-foreground">{dict.job.noJobs}</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-8">
              {page > 1 && (
                <Link
                  href={`/${jobsPath}${category ? `/${category}` : ""}?page=${page - 1}`}
                  className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/${jobsPath}${category ? `/${category}` : ""}?page=${page + 1}`}
                  className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
