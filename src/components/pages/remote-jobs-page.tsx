import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getJobs, getCategoriesWithCount } from "@/lib/queries";
import { JobCard } from "@/components/job-card";
import { SearchJobs } from "@/components/search-jobs";
import Link from "next/link";
import type { Metadata } from "next";
import { categoryUrl, jobListJsonLd, faqJsonLd } from "@/lib/seo";

const BASE = "https://www.growthtalent.org";

export function generateRemoteJobsMetadata(locale: Locale, category?: string): Metadata {
  const dict = getDictionary(locale);
  const categoryLabel = category ? dict.categories[category] ?? category : null;

  const title = categoryLabel
    ? `Remote ${categoryLabel} Jobs | Growth.Talent`
    : `Remote Growth Marketing Jobs | Growth.Talent`;

  const description = categoryLabel
    ? `Browse remote ${categoryLabel} jobs with real salaries. Work from anywhere. No fluff, no ghost listings.`
    : `Browse remote growth marketing jobs with real salaries. Work from anywhere. The best remote roles in growth, SEO, product marketing, and more.`;

  return {
    title,
    description,
    alternates: {
      canonical: category
        ? `${BASE}/${dict.jobsPath}/remote/${category}`
        : `${BASE}/${dict.jobsPath}/remote`,
    },
  };
}

const REMOTE_FAQ = [
  { q: "What are remote growth marketing jobs?", a: "Remote growth marketing jobs let you work from anywhere while driving user acquisition, retention, and revenue for companies. These roles include Growth Marketing Manager, Performance Marketing, SEO, CRM, and more \u2014 all fully remote." },
  { q: "How much do remote growth marketers earn?", a: "Remote growth marketing salaries range from $60K for junior roles to $200K+ for Heads of Growth and VPs. Remote roles often pay competitively with on-site positions, especially at well-funded startups." },
  { q: "What skills do I need for remote growth roles?", a: "Core skills include analytics (SQL, Google Analytics), experimentation (A/B testing), channel expertise (paid, organic, lifecycle), and self-management. Remote roles also value strong written communication and async work habits." },
];

export async function RemoteJobsPage({
  locale,
  category,
  searchParams,
}: {
  locale: Locale;
  category?: string;
  searchParams: { page?: string; seniority?: string };
}) {
  const dict = getDictionary(locale);
  const page = parseInt(searchParams.page ?? "1");

  const [{ jobs, total, totalPages }, categories] = await Promise.all([
    getJobs({
      locale,
      category,
      remote: true,
      seniority: searchParams.seniority,
      page,
    }),
    getCategoriesWithCount(locale),
  ]);

  const categoryLabel = category ? dict.categories[category] ?? category : null;
  const jobsPath = dict.jobsPath;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jobListJsonLd(jobs, locale) }}
      />
      {!category && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd(REMOTE_FAQ) }}
        />
      )}

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/${jobsPath}`} className="hover:text-foreground">{dict.nav.jobs}</Link>
          <span>/</span>
          <Link href={`/${jobsPath}/remote`} className="hover:text-foreground">Remote</Link>
          {categoryLabel && (
            <>
              <span>/</span>
              <span className="text-foreground">{categoryLabel}</span>
            </>
          )}
        </nav>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-display text-5xl font-bold md:text-6xl">
            {categoryLabel ? `Remote ${categoryLabel} Jobs` : "Remote Growth Jobs"}
          </h1>
          <p className="mt-3 text-gray-500">
            {total} open remote {total === 1 ? "position" : "positions"}{categoryLabel ? ` in ${categoryLabel}` : ""} with real salaries
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchJobs
            jobsPath={jobsPath}
            placeholder={`Search remote ${categoryLabel?.toLowerCase() ?? "growth"} jobs...`}
          />
        </div>

        <div className="flex gap-8">
          {/* Sidebar: Remote categories */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Remote by specialty</h3>
            <div className="space-y-0.5">
              <Link
                href={`/${jobsPath}/remote`}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-sm transition-all ${
                  !category ? "bg-gt-black text-white font-medium" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span>All Remote</span>
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.category}
                  href={`/${jobsPath}/remote/${c.category}`}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-sm transition-all ${
                    c.category === category ? "bg-gt-black text-white font-medium" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <span>{dict.categories[c.category] ?? c.category}</span>
                </Link>
              ))}
            </div>
          </aside>

          {/* Job list */}
          <div className="flex-1 space-y-3">
            {/* Seniority pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              {["JUNIOR", "MID", "SENIOR", "LEAD", "VP"].map((s) => (
                <Link
                  key={s}
                  href={`/${jobsPath}/remote${category ? `/${category}` : ""}?seniority=${s}`}
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
                  <Link href={`/${jobsPath}/remote${category ? `/${category}` : ""}?page=${page - 1}`} className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50">Previous</Link>
                )}
                <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
                {page < totalPages && (
                  <Link href={`/${jobsPath}/remote${category ? `/${category}` : ""}?page=${page + 1}`} className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50">Next</Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* FAQ — only on main remote page */}
        {!category && (
          <section className="mt-16 border-t pt-12">
            <h2 className="font-display text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-6">
              {REMOTE_FAQ.map((item) => (
                <div key={item.q}>
                  <h3 className="font-bold text-gt-black">{item.q}</h3>
                  <p className="mt-1.5 text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
