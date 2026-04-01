import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getJobs, getCategoriesWithCount, getTopCities } from "@/lib/queries";
import { JobCard } from "@/components/job-card";
import { SearchJobs } from "@/components/search-jobs";
import Link from "next/link";
import type { Metadata } from "next";
import { categoryUrl, jobListJsonLd, breadcrumbJsonLd } from "@/lib/seo";

function slugToCity(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function cityToSlug(city: string) {
  return city.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const BASE = "https://www.growthtalent.org";

export function generateCityJobsMetadata(locale: Locale, category: string, citySlug: string): Metadata {
  const dict = getDictionary(locale);
  const categoryLabel = dict.categories[category] ?? category;
  const city = slugToCity(citySlug);

  return {
    title: `${categoryLabel} Jobs in ${city} | Growth.Talent`,
    description: `Browse ${categoryLabel} jobs in ${city} with real salaries. No fluff, no ghost listings. Apply to top companies hiring ${categoryLabel} professionals in ${city}.`,
    alternates: {
      canonical: `${BASE}/${dict.jobsPath}/${category}/in/${citySlug}`,
    },
  };
}

export async function CityJobsPage({
  locale,
  category,
  citySlug,
  searchParams,
}: {
  locale: Locale;
  category: string;
  citySlug: string;
  searchParams: { page?: string; seniority?: string };
}) {
  const dict = getDictionary(locale);
  const city = slugToCity(citySlug);
  const page = parseInt(searchParams.page ?? "1");

  const [{ jobs, total, totalPages }, topCities] = await Promise.all([
    getJobs({
      locale,
      category,
      city,
      seniority: searchParams.seniority,
      page,
    }),
    getTopCities(locale),
  ]);

  const categoryLabel = dict.categories[category] ?? category;
  const jobsPath = dict.jobsPath;

  const breadcrumbs = [
    { name: dict.nav.jobs, url: `${BASE}/${jobsPath}` },
    { name: `${categoryLabel} Jobs`, url: categoryUrl(locale, category) },
    { name: city, url: `${BASE}/${jobsPath}/${category}/in/${citySlug}` },
  ];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jobListJsonLd(jobs, locale) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(breadcrumbs) }}
      />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/${jobsPath}`} className="hover:text-foreground">
            {dict.nav.jobs}
          </Link>
          <span>/</span>
          <Link href={`/${jobsPath}/${category}`} className="hover:text-foreground">
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-foreground">{city}</span>
        </nav>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            {categoryLabel} Jobs in {city}
          </h1>
          <p className="mt-3 text-gray-500">
            {total} open {total === 1 ? "position" : "positions"} in {city} with real salaries
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchJobs
            jobsPath={jobsPath}
            category={category}
            placeholder={`Search ${categoryLabel.toLowerCase()} jobs in ${city}...`}
          />
        </div>

        {/* Seniority pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["JUNIOR", "MID", "SENIOR", "LEAD", "VP"].map((s) => (
            <Link
              key={s}
              href={`/${jobsPath}/${category}/in/${citySlug}?seniority=${s}`}
              className={`rounded-full border-2 px-3.5 py-1 text-xs font-bold transition-all ${
                searchParams.seniority === s
                  ? "border-gt-purple bg-gt-purple text-gt-black"
                  : "border-black/10 bg-white text-gray-500 hover:border-gt-purple"
              }`}
            >
              {dict.seniority[s] ?? s}
            </Link>
          ))}
        </div>

        {/* Job list */}
        <div className="space-y-3">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} dict={dict} jobsPath={jobsPath} />
            ))
          ) : (
            <div className="rounded-2xl border-2 border-black/10 p-12 text-center">
              <p className="text-gray-500">No {categoryLabel.toLowerCase()} jobs in {city} right now.</p>
              <Link
                href={`/${jobsPath}/${category}`}
                className="mt-3 inline-block text-sm font-medium text-gt-purple hover:underline"
              >
                Browse all {categoryLabel} jobs instead
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-8">
            {page > 1 && (
              <Link
                href={`/${jobsPath}/${category}/in/${citySlug}?page=${page - 1}`}
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
                href={`/${jobsPath}/${category}/in/${citySlug}?page=${page + 1}`}
                className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50"
              >
                Next
              </Link>
            )}
          </div>
        )}

        {/* Other cities */}
        {topCities.length > 0 && (
          <section className="mt-12 border-t pt-10">
            <h2 className="font-display text-xl font-bold">{categoryLabel} Jobs by City</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {topCities.map((tc) => (
                <Link
                  key={tc.city}
                  href={`/${jobsPath}/${category}/in/${cityToSlug(tc.city)}`}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                    cityToSlug(tc.city) === citySlug
                      ? "border-gt-black bg-gt-black text-white"
                      : "border-black/10 text-gray-600 hover:border-gt-black hover:text-gt-black"
                  }`}
                >
                  {tc.city} ({tc.count})
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
