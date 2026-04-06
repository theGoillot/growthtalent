import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getCompanyBySlug } from "@/lib/queries";
import { companyUrl } from "@/lib/seo";
import { JobCard } from "@/components/job-card";
import { CompanyLogo } from "@/components/company-logo";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const COMPANY_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  "early-stage": { label: "Early-Stage Startup", color: "bg-emerald-100 text-emerald-700" },
  "scaleup": { label: "Scaleup", color: "bg-gt-purple/15 text-gt-black" },
  "corporate": { label: "Corporate", color: "bg-gray-100 text-gray-700" },
  "agency": { label: "Agency", color: "bg-gt-yellow/20 text-gt-black" },
  "studio": { label: "Studio", color: "bg-gt-pink/20 text-gt-black" },
  "non-profit": { label: "Non-Profit", color: "bg-blue-100 text-blue-700" },
};

export async function generateCompanyMetadata(locale: Locale, slug: string): Promise<Metadata> {
  const company = await getCompanyBySlug(slug);
  if (!company) return { title: "Company Not Found" };

  const type = company.companyType ? COMPANY_TYPE_LABELS[company.companyType]?.label : null;
  return {
    title: `${company.name} — Jobs & Company Profile | Growth.Talent`,
    description: `${company.name}${type ? ` (${type})` : ""} has ${company.jobs.length} open growth roles. ${company.about?.slice(0, 120) ?? company.industry ?? ""}`,
    alternates: { canonical: companyUrl(locale, slug) },
  };
}

export async function CompanyPage({ locale, slug }: { locale: Locale; slug: string }) {
  const dict = getDictionary(locale);
  const company = await getCompanyBySlug(slug);

  if (!company) notFound();

  const typeInfo = company.companyType ? COMPANY_TYPE_LABELS[company.companyType] : null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Header */}
      <div className="flex items-start gap-6">
        <CompanyLogo
          name={company.name}
          logoUrl={company.logoUrl}
          domain={company.domain}
          size={72}
        />
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold md:text-4xl">{company.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {typeInfo && (
              <span className={`rounded-full px-3 py-1 text-[12px] font-bold ${typeInfo.color}`}>
                {typeInfo.label}
              </span>
            )}
            {company.industry && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-[12px] font-bold text-gray-600">
                {company.industry}
              </span>
            )}
            {company.size && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-[12px] font-bold text-gray-600">
                {company.size} employees
              </span>
            )}
            {company.market && (
              <span className="rounded-full bg-gt-cream px-3 py-1 text-[12px] font-bold text-gt-black">
                {company.market}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Key Facts */}
      {(company.founded || company.funding || company.website) && (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {company.founded && (
            <div className="rounded-xl border p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Founded</p>
              <p className="mt-1 text-sm font-semibold">{company.founded}</p>
            </div>
          )}
          {company.size && (
            <div className="rounded-xl border p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Team Size</p>
              <p className="mt-1 text-sm font-semibold">{company.size}</p>
            </div>
          )}
          {company.funding && (
            <div className="rounded-xl border p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Funding</p>
              <p className="mt-1 text-sm font-semibold">{company.funding}</p>
            </div>
          )}
          {company.industry && (
            <div className="rounded-xl border p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Industry</p>
              <p className="mt-1 text-sm font-semibold">{company.industry}</p>
            </div>
          )}
        </div>
      )}

      {/* About */}
      {company.about && (
        <div className="mt-8">
          <h2 className="font-display text-xl font-bold">{dict.company.about}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-gray-600">{company.about}</p>
        </div>
      )}

      {/* Tech Stack */}
      {company.techStack && company.techStack.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {company.techStack.map((tech) => (
              <span key={tech} className="rounded-xl border bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="mt-8 flex flex-wrap gap-3">
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black/10 px-5 py-2.5 text-sm font-medium transition-all hover:border-gt-black"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            Website
          </a>
        )}
        {company.linkedinUrl && (
          <a
            href={company.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#0A66C2]/20 px-5 py-2.5 text-sm font-medium text-[#0A66C2] transition-all hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        )}
      </div>

      {/* Claim banner */}
      {!company.isClaimed && (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-gt-purple/30 bg-gt-purple/5 p-6 text-center">
          <p className="text-sm text-gray-600">
            {dict.company.claimPage}
          </p>
          <Link href={`/claim/${company.slug}`} className="mt-3 inline-block rounded-full bg-gt-black px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-gt-black/85">
            Claim this page &rarr;
          </Link>
        </div>
      )}

      {/* Jobs */}
      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold">
          {dict.company.jobs} ({company.jobs.length})
        </h2>
        <div className="mt-6 space-y-3">
          {company.jobs.length > 0 ? (
            company.jobs.map((job) => (
              <JobCard
                key={job.id}
                job={{ ...job, company: { name: company.name, slug: company.slug, logoUrl: company.logoUrl, domain: company.domain } }}
                dict={dict}
                jobsPath={dict.jobsPath}
              />
            ))
          ) : (
            <div className="rounded-2xl border p-12 text-center">
              <p className="text-gray-400">{dict.company.noJobs}</p>
              <Link href={`/${dict.jobsPath}`} className="mt-4 inline-block text-sm font-medium text-gt-purple hover:underline">
                Browse all jobs &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
