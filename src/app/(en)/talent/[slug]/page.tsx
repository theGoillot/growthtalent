import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { CompanyLogo } from "@/components/company-logo";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const candidate = await db.candidate.findUnique({
    where: { slug },
    select: { name: true, headline: true, currentTitle: true, city: true },
  });
  if (!candidate) return { title: "Profile Not Found" };

  return {
    title: `${candidate.name} — ${candidate.currentTitle ?? "Growth Professional"} | Growth.Talent`,
    description: candidate.headline ?? `${candidate.name} is a growth marketing professional${candidate.city ? ` based in ${candidate.city}` : ""}. View their profile on Growth.Talent.`,
    robots: { index: true, follow: true },
  };
}

const SENIORITY_LABELS: Record<string, string> = {
  INTERN: "Intern", JUNIOR: "Junior", MID: "Mid-level",
  SENIOR: "Senior", LEAD: "Lead", MANAGER: "Manager",
  DIRECTOR: "Director", VP: "VP", C_LEVEL: "C-Level",
};

export default async function TalentProfilePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const candidate = await db.candidate.findUnique({
    where: { slug },
    include: { company: { select: { name: true, slug: true, logoUrl: true, domain: true } } },
  });

  if (!candidate || candidate.isBanned || candidate.profileVisibility === "PRIVATE") {
    notFound();
  }

  const isClaimed = candidate.isProfileComplete;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <div className="flex items-start gap-6">
        {/* Photo */}
        <div className="shrink-0">
          {candidate.photoUrl || candidate.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={candidate.photoUrl ?? candidate.avatarUrl!}
              alt={candidate.name ?? "Profile"}
              className="h-24 w-24 rounded-2xl object-cover border-2 border-black/[0.06]"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gt-purple/10 text-3xl font-bold text-gt-purple">
              {(candidate.name ?? "?").charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold">{candidate.name ?? "Growth Professional"}</h1>
            {candidate.isVerified && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                Verified
              </span>
            )}
            {isClaimed && (
              <span className="rounded-full bg-gt-purple/10 px-2.5 py-0.5 text-[10px] font-bold text-gt-purple uppercase tracking-wider">
                Claimed
              </span>
            )}
          </div>

          {candidate.headline && (
            <p className="mt-2 text-lg text-gray-500">{candidate.headline}</p>
          )}

          {candidate.currentTitle && (
            <p className="mt-1 text-[15px] font-medium text-gt-black">{candidate.currentTitle}</p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-400">
            {candidate.seniority && (
              <span className="rounded-full bg-gt-pink/15 px-3 py-0.5 text-[12px] font-bold text-gt-black">
                {SENIORITY_LABELS[candidate.seniority] ?? candidate.seniority}
              </span>
            )}
            {candidate.city && (
              <span>{candidate.city}{candidate.country ? `, ${candidate.country}` : ""}</span>
            )}
            {candidate.isInGrowthTeam && (
              <span className="rounded-full bg-gt-yellow/20 px-3 py-0.5 text-[12px] font-bold text-gt-black">
                Growth Team
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Company */}
      {candidate.company && (
        <div className="mt-8 flex items-center gap-4 rounded-2xl border p-5">
          <CompanyLogo
            name={candidate.company.name}
            logoUrl={candidate.company.logoUrl}
            domain={candidate.company.domain}
            size={40}
          />
          <div>
            <Link href={`/companies/${candidate.company.slug}`} className="font-semibold hover:text-gt-purple transition-colors">
              {candidate.company.name}
            </Link>
            {candidate.reportsTo && (
              <p className="text-sm text-gray-400">Reports to: {candidate.reportsTo}</p>
            )}
          </div>
        </div>
      )}

      {/* Bio */}
      {candidate.bio && (
        <div className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">About</h2>
          <p className="text-[15px] leading-relaxed text-gray-700">{candidate.bio}</p>
        </div>
      )}

      {/* Tools */}
      {candidate.tools.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Tools & Stack</h2>
          <div className="flex flex-wrap gap-2">
            {candidate.tools.map((tool) => (
              <span key={tool} className="rounded-xl border bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Team Scope */}
      {candidate.teamScope && (
        <div className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Team Scope</h2>
          <p className="text-[15px] text-gray-700">{candidate.teamScope} people</p>
        </div>
      )}

      {/* LinkedIn link */}
      {candidate.linkedinUrl && (
        <div className="mt-8">
          <a
            href={candidate.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#0A66C2] px-5 py-2.5 text-sm font-bold text-[#0A66C2] transition-all hover:bg-[#0A66C2] hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            View on LinkedIn
          </a>
        </div>
      )}

      {/* Unclaimed CTA */}
      {!isClaimed && (
        <div className="mt-12 rounded-2xl border-2 border-gt-purple/20 bg-gt-purple/5 p-8 text-center">
          <h3 className="font-display text-xl font-bold">Is this you?</h3>
          <p className="mt-2 text-sm text-gray-500">Sign in with LinkedIn to claim this profile and add your details.</p>
          <Link href="/auth/signin" className="mt-4 inline-block rounded-full bg-gt-black px-6 py-3 text-sm font-bold text-white transition-all hover:bg-gt-black/85">
            Claim Profile
          </Link>
        </div>
      )}
    </div>
  );
}
