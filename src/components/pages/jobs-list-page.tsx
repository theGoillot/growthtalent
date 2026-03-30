import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getJobs, getCategoriesWithCount } from "@/lib/queries";
import { JobCard } from "@/components/job-card";
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
      <div className="mb-10">
        <h1 className="font-display text-5xl font-bold md:text-6xl">
          {categoryLabel ?? dict.nav.jobs}
        </h1>
        <p className="mt-3 text-gray-500">
          {total} {total === 1 ? "position" : "positions"} {categoryLabel ? `in ${categoryLabel}` : "available"}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar: Categories */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            {dict.filters.allCategories}
          </h3>
          <div className="space-y-0.5">
            <Link
              href={`/${jobsPath}`}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-sm transition-all ${
                !category ? "bg-gt-black text-white font-medium" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span>{dict.job.allJobs}</span>
              <span className={`text-xs ${!category ? "text-white/60" : "text-gray-400"}`}>{categories.reduce((sum, c) => sum + c.count, 0)}</span>
            </Link>
            {categories.map((c) => (
              <Link
                key={c.category}
                href={`/${jobsPath}/${c.category}`}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-sm transition-all ${
                  c.category === category ? "bg-gt-black text-white font-medium" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span>{dict.categories[c.category] ?? c.category}</span>
                <span className={`text-xs ${c.category === category ? "text-white/60" : "text-gray-400"}`}>{c.count}</span>
              </Link>
            ))}
          </div>
        </aside>

        {/* Job list */}
        <div className="flex-1 space-y-3">
          {/* Mobile category pills */}
          <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
            <Link
              href={`/${jobsPath}`}
              className={`rounded-full border-2 px-3.5 py-1 text-xs font-bold transition-all ${
                !category ? "border-gt-black bg-gt-black text-white" : "border-black/10 bg-white hover:border-gt-black"
              }`}
            >
              All
            </Link>
            {categories.slice(0, 8).map((c) => (
              <Link
                key={c.category}
                href={`/${jobsPath}/${c.category}`}
                className={`rounded-full border-2 px-3.5 py-1 text-xs font-bold transition-all ${
                  c.category === category ? "border-gt-black bg-gt-black text-white" : "border-black/10 bg-white hover:border-gt-black"
                }`}
              >
                {dict.categories[c.category] ?? c.category}
              </Link>
            ))}
          </div>

          {/* Seniority filter pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {["JUNIOR", "MID", "SENIOR", "LEAD", "VP"].map((s) => (
              <Link
                key={s}
                href={`/${jobsPath}${category ? `/${category}` : ""}?seniority=${s}`}
                className={`rounded-full border-2 px-3.5 py-1 text-xs font-bold transition-all ${
                  searchParams.seniority === s
                    ? "border-gt-purple bg-gt-purple text-gt-black"
                    : "border-black/10 bg-white text-gray-500 hover:border-gt-purple"
                }`}
              >
                {dict.seniority[s] ?? s}
              </Link>
            ))}
            <Link
              href={`/${jobsPath}${category ? `/${category}` : ""}?remote=true`}
              className={`rounded-full border-2 px-3.5 py-1 text-xs font-bold transition-all ${
                searchParams.remote === "true"
                  ? "border-gt-purple bg-gt-purple text-gt-black"
                  : "border-black/10 bg-white text-gray-500 hover:border-gt-purple"
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
