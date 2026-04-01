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
        dangerouslySetInnerHTML={{ __html: jobJsonLd(job) }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(breadcrumbs) }}
      />

      <article
        className="mx-auto max-w-4xl px-6 py-8"
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

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/${dict.jobsPath}`} className="hover:text-foreground">
            {dict.nav.jobs}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${dict.jobsPath}/${job.category}`} className="hover:text-foreground">
            {dict.categories[job.category] ?? job.category}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground" aria-current="page">{job.title}</span>
        </nav>

        {/* Job Header */}
        <header className="flex items-start gap-5">
          <CompanyLogo
            name={job.company.name}
            logoUrl={job.company.logoUrl}
            domain={job.company.domain}
            size={64}
          />
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold md:text-4xl" itemProp="title">{job.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              <Link
                href={`/${dict.companiesPath}/${job.company.slug}`}
                className="font-medium text-foreground hover:text-gt-purple"
                itemProp="hiringOrganization"
              >
                {job.company.name}
              </Link>
              {job.location && ` \u00b7 ${job.location}`}
            </p>
          </div>
        </header>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className="bg-gt-purple/15 text-gt-black">
            {dict.categories[job.category] ?? job.category}
          </Badge>
          <Badge variant="outline">{dict.seniority[job.seniority] ?? job.seniority}</Badge>
          <Badge variant="outline">{REMOTE_LABELS[job.remote] ?? job.remote}</Badge>
          <Badge variant="outline">{job.contractType ?? "Full-time"}</Badge>
          {salary && <Badge className="bg-green-100 text-green-800">{salary}</Badge>}
          {job.isBoosted && <Badge className="bg-gt-yellow text-gt-black">Featured</Badge>}
        </div>

        {/* Apply Button + Posted date + Share */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ApplyButton
            jobId={job.id}
            applyUrl={job.applyUrl}
            label={dict.job.apply}
            loginLabel={dict.job.applyLogin}
          />
          <time dateTime={job.postedAt.toISOString()} className="text-sm text-muted-foreground">
            {dict.job.posted} {timeAgo(job.postedAt)}
          </time>
          <div className="ml-auto">
            <ShareJob title={job.title} company={job.company.name} />
          </div>
        </div>

        {/* Key Facts Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {salary && (
            <div className="rounded-xl border bg-green-50/50 p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Salary</p>
              <p className="mt-0.5 text-sm font-bold text-green-700">{salary}</p>
            </div>
          )}
          <div className="rounded-xl border p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Location</p>
            <p className="mt-0.5 text-sm font-semibold">{job.location ?? "Not specified"}</p>
          </div>
          <div className="rounded-xl border p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Work Type</p>
            <p className="mt-0.5 text-sm font-semibold">{REMOTE_LABELS[job.remote] ?? job.remote}</p>
          </div>
          <div className="rounded-xl border p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Seniority</p>
            <p className="mt-0.5 text-sm font-semibold">{dict.seniority[job.seniority] ?? job.seniority}</p>
          </div>
          <div className="rounded-xl border p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Contract</p>
            <p className="mt-0.5 text-sm font-semibold">{job.contractType?.replace(/_/g, "-").toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase()) ?? "Full-time"}</p>
          </div>
          <div className="rounded-xl border p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Category</p>
            <p className="mt-0.5 text-sm font-semibold">{dict.categories[job.category] ?? job.category}</p>
          </div>
          {job.company.size && (
            <div className="rounded-xl border p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Company Size</p>
              <p className="mt-0.5 text-sm font-semibold">{job.company.size} employees</p>
            </div>
          )}
          {job.company.industry && (
            <div className="rounded-xl border p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Industry</p>
              <p className="mt-0.5 text-sm font-semibold">{job.company.industry}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold">{dict.job.description}</h2>
          <div className="prose prose-gray mt-4 max-w-none prose-h3:text-lg prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-2 prose-li:my-0.5 prose-p:my-2">
            {job.description ? (
              <div dangerouslySetInnerHTML={{ __html: cleanDescription(job.description) }} />
            ) : (
              <p className="text-muted-foreground">No description provided.</p>
            )}
          </div>
        </div>

        {/* Second Apply CTA */}
        <div className="mt-8 rounded-xl border-2 border-gt-black/10 bg-gray-50 p-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">Interested in this role?</p>
          <ApplyButton
            jobId={job.id}
            applyUrl={job.applyUrl}
            label={dict.job.apply}
            loginLabel={dict.job.applyLogin}
          />
        </div>

        {/* Company Info */}
        <aside className="mt-10 rounded-xl border bg-gt-cream/30 p-6">
          <h2 className="font-display text-xl font-bold">{dict.job.aboutCompany}</h2>
          <div className="mt-3 flex items-center gap-4">
            <CompanyLogo
              name={job.company.name}
              logoUrl={job.company.logoUrl}
              domain={job.company.domain}
              size={48}
            />
            <div>
              <Link
                href={`/${dict.companiesPath}/${job.company.slug}`}
                className="font-semibold hover:text-gt-purple"
              >
                {job.company.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                {[job.company.industry, job.company.size].filter(Boolean).join(" \u00b7 ")}
              </p>
            </div>
          </div>
          {job.company.about && <p className="mt-3 text-sm">{job.company.about}</p>}
          {job.company.website && (
            <a
              href={job.company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-gt-purple hover:underline"
            >
              {job.company.website}
            </a>
          )}
        </aside>

        {/* Job alert CTA */}
        <div className="mt-8">
          <JobAlertCta category={job.category} />
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl font-bold">{dict.job.similarJobs}</h2>
            <div className="mt-4 space-y-3">
              {similarJobs.map((sj) => (
                <JobCard key={sj.id} job={sj} dict={dict} jobsPath={dict.jobsPath} />
              ))}
            </div>
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
