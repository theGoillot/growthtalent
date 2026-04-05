import { db } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Growth Talent Pool — Growth Marketing Professionals | Growth.Talent",
  description: "Browse growth marketing professionals. Find Heads of Growth, Performance Marketers, SEO Managers, and more. The growth talent network.",
};

const SENIORITY_LABELS: Record<string, string> = {
  INTERN: "Intern", JUNIOR: "Junior", MID: "Mid-level",
  SENIOR: "Senior", LEAD: "Lead", MANAGER: "Manager",
  DIRECTOR: "Director", VP: "VP", C_LEVEL: "C-Level",
};

export default async function TalentDirectoryPage(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page ?? "1");
  const seniorityFilter = searchParams.seniority;
  const limit = 24;

  const where = {
    isProfileComplete: true,
    isBanned: false,
    profileVisibility: "PUBLIC",
    slug: { not: null as unknown as undefined },
    ...(seniorityFilter && { seniority: seniorityFilter as "MID" }),
  };

  const [candidates, total] = await Promise.all([
    db.candidate.findMany({
      where,
      select: {
        slug: true,
        name: true,
        avatarUrl: true,
        photoUrl: true,
        currentTitle: true,
        headline: true,
        seniority: true,
        city: true,
        country: true,
        tools: true,
        isVerified: true,
        isInGrowthTeam: true,
        company: { select: { name: true, slug: true } },
      },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.candidate.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-bold md:text-6xl">Talent Pool</h1>
        <p className="mt-3 text-gray-500">
          {total} growth professional{total !== 1 ? "s" : ""} on Growth.Talent
        </p>
      </div>

      {/* Seniority filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <Link
          href="/talent"
          className={`rounded-full border-2 px-4 py-1.5 text-xs font-bold transition-all ${
            !seniorityFilter ? "border-gt-black bg-gt-black text-white" : "border-black/10 bg-white text-gray-500 hover:border-gt-black"
          }`}
        >
          All
        </Link>
        {["JUNIOR", "MID", "SENIOR", "LEAD", "DIRECTOR", "VP", "C_LEVEL"].map((s) => (
          <Link
            key={s}
            href={`/talent?seniority=${s}`}
            className={`rounded-full border-2 px-4 py-1.5 text-xs font-bold transition-all ${
              seniorityFilter === s ? "border-gt-black bg-gt-black text-white" : "border-black/10 bg-white text-gray-500 hover:border-gt-black"
            }`}
          >
            {SENIORITY_LABELS[s] ?? s}
          </Link>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {candidates.map((c) => (
          <Link
            key={c.slug}
            href={`/talent/${c.slug}`}
            className="group rounded-2xl border-2 border-black/[0.06] bg-white p-6 transition-all hover:border-gt-black hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-4">
              {c.photoUrl || c.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.photoUrl ?? c.avatarUrl!}
                  alt={c.name ?? ""}
                  className="h-14 w-14 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gt-purple/10 text-xl font-bold text-gt-purple">
                  {(c.name ?? "?").charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gt-black truncate">{c.name ?? "Growth Pro"}</h3>
                  {c.isVerified && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#059669" stroke="white" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">{c.currentTitle ?? c.headline ?? ""}</p>
                {c.company && (
                  <p className="text-xs text-gray-400 mt-0.5">{c.company.name}</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {c.seniority && (
                <span className="rounded-full bg-gt-pink/15 px-2.5 py-0.5 text-[10px] font-bold text-gt-black">
                  {SENIORITY_LABELS[c.seniority] ?? c.seniority}
                </span>
              )}
              {c.city && (
                <span className="rounded-full bg-gt-cream px-2.5 py-0.5 text-[10px] font-bold text-gt-black">
                  {c.city}
                </span>
              )}
              {c.isInGrowthTeam && (
                <span className="rounded-full bg-gt-yellow/20 px-2.5 py-0.5 text-[10px] font-bold text-gt-black">
                  Growth Team
                </span>
              )}
            </div>

            {c.tools.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {c.tools.slice(0, 4).map((tool) => (
                  <span key={tool} className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                    {tool}
                  </span>
                ))}
                {c.tools.length > 4 && (
                  <span className="text-[10px] text-gray-400">+{c.tools.length - 4}</span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>

      {candidates.length === 0 && (
        <div className="py-20 text-center text-gray-400">
          No profiles found. Be the first to create yours!
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          {page > 1 && (
            <Link href={`/talent?page=${page - 1}${seniorityFilter ? `&seniority=${seniorityFilter}` : ""}`} className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50">
              Previous
            </Link>
          )}
          <span className="text-sm text-gray-400">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/talent?page=${page + 1}${seniorityFilter ? `&seniority=${seniorityFilter}` : ""}`} className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50">
              Next
            </Link>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 rounded-3xl bg-gt-dark p-10 text-center text-white">
        <h2 className="font-display text-3xl font-bold">Join the Growth Talent Pool</h2>
        <p className="mt-3 text-white/40">Create your profile. Get discovered by growth-first companies.</p>
        <Link href="/auth/signin" className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-gt-black transition-all hover:bg-gt-yellow">
          Create Profile
        </Link>
      </div>
    </div>
  );
}
