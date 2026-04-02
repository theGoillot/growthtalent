import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getJobBySlug, getSimilarJobs } from "@/lib/queries";
import { jobJsonLd, breadcrumbJsonLd, hreflangLinks, jobUrl, categoryUrl } from "@/lib/seo";
import { JobCard } from "@/components/job-card";
import { ApplyButton } from "@/components/apply-button";
import { CompanyLogo } from "@/components/company-logo";
import { StickyApplyBar } from "@/components/sticky-apply-bar";
import { ShareJob } from "@/components/share-job";
import { JobAlertCta } from "@/components/job-alert-cta";
import { cleanDescription } from "@/lib/clean-description";
import { CATEGORY_SEO } from "@/lib/category-seo";
import { parseRichJob, richJobToText } from "@/lib/rich-job";
import { RichJobDetail } from "@/components/rich-job-detail";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

function timeAgo(date: Date) {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

const REMOTE_LABELS: Record<string, string> = {
  REMOTE: "Remote",
  REMOTE_FRANCE: "Remote France",
  REMOTE_EU: "Remote EU",
  REMOTE_US: "Remote US",
  REMOTE_WORLD: "Remote Worldwide",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

export async function generateJobDetailMetadata(
  locale: Locale,
  companySlug: string,
  jobSlug: string
): Promise<Metadata> {
  const job = await getJobBySlug(jobSlug, companySlug);
  if (!job) return { title: "Job Not Found" };

  const salary = job.salaryMin && job.salaryMax && job.salaryCurrency
    ? `${(job.salaryMin / 1000).toFixed(0)}K-${(job.salaryMax / 1000).toFixed(0)}K ${job.salaryCurrency}`
    : "";
  const loc = job.location ?? "";
  const categoryLabel = job.category.replace(/-/g, " ");

  return {
    title: `${job.title} at ${job.company.name}${salary ? ` (${salary})` : ""} | Growth.Talent`,
    description: `Apply for ${job.title} at ${job.company.name}${loc ? ` in ${loc}` : ""}. ${salary ? `Salary: ${salary}. ` : ""}${categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1)} role with real salary data, no fluff.`,
    alternates: {
      canonical: jobUrl(locale, job.category, companySlug, jobSlug),
      languages: hreflangLinks(`${job.category}/${companySlug}/${jobSlug}`, locale),
    },
  };
}

export async function JobDetailPage({
  locale,
  category,
  companySlug,
  jobSlug,
}: {
  locale: Locale;
  category: string;
  companySlug: string;
  jobSlug: string;
}) {
  const dict = getDictionary(locale);
  const job = await getJobBySlug(jobSlug, companySlug);

  if (!job) notFound();

  const similarJobs = await getSimilarJobs(job.id, job.category, job.market);
  const salary =
    job.salaryMin && job.salaryMax && job.salaryCurrency
      ? `${job.salaryCurrency === "EUR" ? "\u20ac" : job.salaryCurrency === "BRL" ? "R$" : "$"}${(job.salaryMin / 1000).toFixed(0)}K - ${job.salaryCurrency === "EUR" ? "\u20ac" : job.salaryCurrency === "BRL" ? "R$" : "$"}${(job.salaryMax / 1000).toFixed(0)}K`
      : null;

  const richData = parseRichJob(job.description);

  // For JSON-LD: use plain text version of rich data, or raw description
  const jobForJsonLd = richData
    ? { ...job, description: richJobToText(richData) }
    : job;

  const BASE = "https://www.growthtalent.org";
  const breadcrumbs = [
    { name: dict.nav.jobs, url: `${BASE}/${dict.jobsPath}` },
    { name: dict.categories[job.category] ?? job.category, url: categoryUrl(locale, job.category) },
    { name: job.title, url: jobUrl(locale, job.category, companySlug, jobSlug) },
  ];

  return (
    <>
      {/* JSON-LD: JobPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jobJsonLd(jobForJsonLd) }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(breadcrumbs) }}
      />

      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gt-cream via-white to-gt-purple/10">
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gt-purple/8 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-gt-yellow/15 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-32 w-32 rounded-full bg-gt-pink/10 blur-2xl" />

        <div className="relative mx-auto max-w-[52rem] px-6 pb-10 pt-8 md:pb-14 md:pt-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[13px] text-gray-400">
            <Link href={`/${dict.jobsPath}`} className="transition-colors hover:text-gt-black">
              {dict.nav.jobs}
            </Link>
            <span aria-hidden="true" className="text-gray-300">/</span>
            <Link href={`/${dict.jobsPath}/${job.category}`} className="transition-colors hover:text-gt-black">
              {dict.categories[job.category] ?? job.category}
            </Link>
            <span aria-hidden="true" className="text-gray-300">/</span>
            <span className="text-gray-600 font-medium" aria-current="page">{job.title}</span>
          </nav>

          {/* Job Header */}
          <header className="flex items-start gap-6">
            <CompanyLogo
              name={job.company.name}
              logoUrl={job.company.logoUrl}
              domain={job.company.domain}
              size={80}
            />
            <div className="flex-1">
              <h1 className="font-display text-[2.25rem] font-bold leading-[1.15] tracking-tight md:text-[2.75rem]" itemProp="title">{job.title}</h1>
              <p className="mt-3 text-lg text-gray-500">
                <Link
                  href={`/${dict.companiesPath}/${job.company.slug}`}
                  className="font-semibold text-gt-black transition-colors hover:text-gt-purple"
                  itemProp="hiringOrganization"
                >
                  {job.company.name}
                </Link>
                {job.location && <span className="text-gray-300"> &bull; </span>}
                {job.location && <span>{job.location}</span>}
              </p>
            </div>
          </header>

          {/* Quick Facts Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/80 border border-gt-purple/20 px-3.5 py-1 text-[12px] font-bold text-gt-black backdrop-blur-sm">
              {dict.categories[job.category] ?? job.category}
            </span>
            <span className="rounded-full bg-white/80 border border-gt-pink/25 px-3.5 py-1 text-[12px] font-bold text-gt-black backdrop-blur-sm">
              {dict.seniority[job.seniority] ?? job.seniority}
            </span>
            <span className="rounded-full bg-white/80 border border-gt-cream px-3.5 py-1 text-[12px] font-bold text-gt-black backdrop-blur-sm">
              {REMOTE_LABELS[job.remote] ?? job.remote}
            </span>
            <span className="rounded-full bg-white/80 border border-gray-200 px-3.5 py-1 text-[12px] font-bold text-gt-dark backdrop-blur-sm">
              {job.contractType?.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase()) ?? "Full-time"}
            </span>
            {salary && (
              <span className="rounded-full bg-emerald-50/90 border border-emerald-200 px-3.5 py-1 text-[12px] font-bold text-emerald-700 backdrop-blur-sm">
                {salary}
              </span>
            )}
            {job.isBoosted && (
              <span className="rounded-full bg-gt-yellow border-2 border-gt-black px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-gt-black">
                Featured
              </span>
            )}
          </div>

          {/* Apply + Meta Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ApplyButton
              jobId={job.id}
              applyUrl={job.applyUrl}
              label={dict.job.apply}
              loginLabel={dict.job.applyLogin}
            />
            <time dateTime={job.postedAt.toISOString()} className="text-[13px] text-gray-400">
              {dict.job.posted} {timeAgo(job.postedAt)}
            </time>
            <div className="ml-auto">
              <ShareJob title={job.title} company={job.company.name} />
            </div>
          </div>
        </div>
      </div>

      <article
        className="mx-auto max-w-[52rem] px-6 py-12 md:py-16"
        itemScope
        itemType="https://schema.org/JobPosting"
        data-job-id={job.id}
        data-category={job.category}
        data-seniority={job.seniority}
        data-remote={job.remote}
      >
        {/* Hidden microdata for crawlers that don't read JSON-LD */}
        <meta itemProp="title" content={job.title} />
        <meta itemProp="datePosted" content={job.postedAt.toISOString().split("T")[0]} />
        {job.salaryMin && job.salaryMax && <meta itemProp="baseSalary" content={`${job.salaryMin}-${job.salaryMax} ${job.salaryCurrency}`} />}

        {/* Description — Rich or Plain */}
        {richData ? (
          <RichJobDetail data={richData} dict={dict} />
        ) : (
          <div>
            <h2 className="font-display text-xl font-bold">{dict.job.description}</h2>
            <div className="prose prose-gray mt-4 max-w-none prose-h3:text-lg prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-2 prose-li:my-0.5 prose-p:my-2">
              {job.description ? (
                <div dangerouslySetInnerHTML={{ __html: cleanDescription(job.description) }} />
              ) : (
                <p className="text-muted-foreground">No description provided.</p>
              )}
            </div>
          </div>
        )}

        {/* Apply CTA — editorial treatment */}
        <div className="mt-14 rounded-[28px] border-2 border-gt-black bg-white p-8 md:p-10 text-center shadow-[6px_6px_0px_#000]">
          <h3 className="font-display text-2xl font-bold">Interested in this role?</h3>
          <p className="mt-2 text-[15px] text-gray-500">Apply now and hear back within days, not weeks.</p>
          <div className="mt-5">
            <ApplyButton
              jobId={job.id}
              applyUrl={job.applyUrl}
              label={dict.job.apply}
              loginLabel={dict.job.applyLogin}
            />
          </div>
        </div>

        {/* Company Info — only for non-rich jobs (rich has its own company intel section) */}
        {!richData && (
          <aside className="mt-12 rounded-3xl border-2 border-black/[0.06] bg-gt-cream/20 p-7">
            <h2 className="font-display text-xl font-bold">{dict.job.aboutCompany}</h2>
            <div className="mt-4 flex items-center gap-4">
              <CompanyLogo
                name={job.company.name}
                logoUrl={job.company.logoUrl}
                domain={job.company.domain}
                size={48}
              />
              <div>
                <Link
                  href={`/${dict.companiesPath}/${job.company.slug}`}
                  className="font-semibold transition-colors hover:text-gt-purple"
                >
                  {job.company.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {[job.company.industry, job.company.size].filter(Boolean).join(" \u00b7 ")}
                </p>
              </div>
            </div>
            {job.company.about && <p className="mt-4 text-[14px] leading-relaxed text-gray-600">{job.company.about}</p>}
            {job.company.website && (
              <a
                href={job.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-gt-purple hover:underline"
              >
                {job.company.website}
              </a>
            )}
          </aside>
        )}

        {/* Job alert CTA */}
        <div className="mt-12">
          <JobAlertCta category={job.category} />
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl font-bold tracking-tight">{dict.job.similarJobs}</h2>
            <div className="mt-6 space-y-3">
              {similarJobs.map((sj) => (
                <JobCard key={sj.id} job={sj} dict={dict} jobsPath={dict.jobsPath} />
              ))}
            </div>
          </div>
        )}
        {/* SEO content — category context for ranking on long-tail keywords */}
        {CATEGORY_SEO[job.category] && (
          <div className="mt-14 rounded-3xl border-2 border-black/[0.04] bg-gray-50/50 p-7 md:p-8">
            <h2 className="font-display text-lg font-bold text-gray-700">
              About {dict.categories[job.category] ?? job.category} Roles
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-gray-500">
              {CATEGORY_SEO[job.category].what}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORY_SEO[job.category].topSkills.map((skill) => (
                <span key={skill} className="rounded-full bg-white border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-500">
                  {skill}
                </span>
              ))}
            </div>
            <Link
              href={`/${dict.jobsPath}/${job.category}`}
              className="mt-4 inline-block text-[13px] font-semibold text-gt-purple hover:underline"
            >
              Browse all {dict.categories[job.category] ?? job.category} jobs &rarr;
            </Link>
          </div>
        )}
      </article>

      {/* Sticky mobile Apply bar */}
      <StickyApplyBar
        jobId={job.id}
        applyUrl={job.applyUrl}
        label={dict.job.apply}
        loginLabel={dict.job.applyLogin}
        salary={salary}
      />
    </>
  );
}
