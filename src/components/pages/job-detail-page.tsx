import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getJobBySlug, getSimilarJobs } from "@/lib/queries";
import { jobJsonLd, breadcrumbJsonLd, hreflangLinks, jobUrl, categoryUrl } from "@/lib/seo";
import { JobCard } from "@/components/job-card";
import { ApplyButton } from "@/components/apply-button";
import { CompanyLogo } from "@/components/company-logo";
import { StickyApplyBar } from "@/components/sticky-apply-bar";
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

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/${dict.jobsPath}`} className="hover:text-foreground">
            {dict.nav.jobs}
          </Link>
          <span>/</span>
          <Link href={`/${dict.jobsPath}/${job.category}`} className="hover:text-foreground">
            {dict.categories[job.category] ?? job.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{job.title}</span>
        </nav>

        {/* Job Header */}
        <div className="flex items-start gap-5">
          <CompanyLogo
            name={job.company.name}
            logoUrl={job.company.logoUrl}
            domain={job.company.domain}
            size={64}
          />
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold md:text-4xl">{job.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              <Link
                href={`/${dict.companiesPath}/${job.company.slug}`}
                className="font-medium text-foreground hover:text-gt-purple"
              >
                {job.company.name}
              </Link>
              {job.location && ` \u00b7 ${job.location}`}
            </p>
          </div>
        </div>

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

        {/* Apply Button + Posted date */}
        <div className="mt-6 flex items-center gap-4">
          <ApplyButton
            jobId={job.id}
            applyUrl={job.applyUrl}
            label={dict.job.apply}
            loginLabel={dict.job.applyLogin}
          />
          <span className="text-sm text-muted-foreground">
            {dict.job.posted} {timeAgo(job.postedAt)}
          </span>
        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold">{dict.job.description}</h2>
          <div className="prose prose-gray mt-4 max-w-none">
            {job.description ? (
              <div dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, "<br/>") }} />
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
        <div className="mt-10 rounded-xl border bg-gt-cream/30 p-6">
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
      </div>

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
