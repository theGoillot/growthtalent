import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getCompanyBySlug } from "@/lib/queries";
import { companyUrl } from "@/lib/seo";
import { JobCard } from "@/components/job-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateCompanyMetadata(locale: Locale, slug: string): Promise<Metadata> {
  const company = await getCompanyBySlug(slug);
  if (!company) return { title: "Company Not Found" };

  return {
    title: `${company.name} — Growth Jobs`,
    description: `${company.jobs.length} open growth marketing positions at ${company.name}. ${company.industry ?? ""} ${company.size ?? ""}`.trim(),
    alternates: { canonical: companyUrl(locale, slug) },
  };
}

export async function CompanyPage({ locale, slug }: { locale: Locale; slug: string }) {
  const dict = getDictionary(locale);
  const company = await getCompanyBySlug(slug);

  if (!company) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Header */}
      <div className="flex items-start gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border bg-gray-50 text-2xl font-bold text-gray-400">
          {company.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">{company.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {company.industry && <Badge variant="outline">{company.industry}</Badge>}
            {company.size && <Badge variant="outline">{company.size} employees</Badge>}
            {company.market && <Badge variant="outline">{company.market}</Badge>}
          </div>
        </div>
      </div>

      {company.about && (
        <div className="mt-6">
          <h2 className="font-display text-xl font-bold">{dict.company.about}</h2>
          <p className="mt-2 text-muted-foreground">{company.about}</p>
        </div>
      )}

      {company.website && (
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-gt-purple hover:underline"
        >
          {company.website}
        </a>
      )}

      {/* Claim banner */}
      {!company.isClaimed && (
        <div className="mt-6 rounded-xl border-2 border-dashed border-gt-purple/40 bg-gt-purple-light/20 p-4 text-center">
          <p className="text-sm">
            {dict.company.claimPage}{" "}
            <Link href={`/claim/${company.slug}`} className="font-medium text-gt-purple hover:underline">
              Claim &rarr;
            </Link>
          </p>
        </div>
      )}

      {/* Jobs */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-bold">
          {dict.company.jobs} ({company.jobs.length})
        </h2>
        <div className="mt-4 space-y-3">
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
            <p className="py-8 text-center text-muted-foreground">{dict.company.noJobs}</p>
          )}
        </div>
      </div>
    </div>
  );
}
