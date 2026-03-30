import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/dictionaries";

interface JobCardProps {
  job: {
    slug: string;
    title: string;
    category: string;
    seniority: string;
    remote: string;
    location: string | null;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    isBoosted: boolean;
    postedAt: Date;
    company: {
      name: string;
      slug: string;
      logoUrl: string | null;
    };
  };
  dict: Dictionary;
  jobsPath: string;
}

function formatSalary(min: number | null, max: number | null, currency: string | null) {
  if (!min || !max) return null;
  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n.toString());
  const symbol = currency === "EUR" ? "\u20ac" : currency === "BRL" ? "R$" : "$";
  return `${symbol}${fmt(min)}\u2013${symbol}${fmt(max)}`;
}

function timeAgo(date: Date) {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "1d";
  if (days < 7) return `${days}d`;
  if (days < 30) return `${Math.floor(days / 7)}w`;
  return `${Math.floor(days / 30)}mo`;
}

const REMOTE_SHORT: Record<string, string> = {
  REMOTE: "Remote",
  REMOTE_FRANCE: "Remote FR",
  REMOTE_EU: "Remote EU",
  REMOTE_US: "Remote US",
  REMOTE_WORLD: "Remote \ud83c\udf0d",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

export function JobCard({ job, dict, jobsPath }: JobCardProps) {
  const salary = formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency);
  const href = `/${jobsPath}/${job.category}/${job.company.slug}/${job.slug}`;

  return (
    <Link href={href} className="group block">
      <div
        className={`relative rounded-2xl border-2 p-5 transition-all group-hover:-translate-y-0.5 ${
          job.isBoosted
            ? "border-gt-black bg-white shadow-[4px_4px_0px_#000]"
            : "border-black/10 bg-white group-hover:border-gt-black group-hover:shadow-[3px_3px_0px_#000]"
        }`}
      >
        {/* Featured badge */}
        {job.isBoosted && (
          <div
            className="absolute -top-3 right-5 rounded-full border-2 border-gt-black bg-gt-yellow px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ transform: "rotate(-2deg)" }}
          >
            Featured
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Company initial */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-black/10 bg-gray-50 font-display text-lg font-bold text-gray-400">
            {job.company.name.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            {/* Title + Company */}
            <h3 className="font-bold text-gt-black group-hover:text-gt-black truncate text-[15px]">
              {job.title}
            </h3>
            <p className="mt-0.5 text-sm text-gray-500 truncate">
              {job.company.name}
              {job.location && <span className="text-gray-300"> &bull; </span>}
              {job.location}
            </p>

            {/* Tags row */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <Badge className="rounded-full bg-gt-purple-light/60 text-[11px] font-semibold text-gt-black border-0 px-2.5 py-0.5">
                {dict.categories[job.category] ?? job.category}
              </Badge>
              <Badge className="rounded-full bg-gt-pink/40 text-[11px] font-semibold text-gt-black border-0 px-2.5 py-0.5">
                {dict.seniority[job.seniority] ?? job.seniority}
              </Badge>
              {job.remote !== "ONSITE" && (
                <Badge className="rounded-full bg-gt-cream text-[11px] font-semibold text-gt-black border-0 px-2.5 py-0.5">
                  {REMOTE_SHORT[job.remote] ?? job.remote}
                </Badge>
              )}
              {salary && (
                <span className="ml-auto text-sm font-bold text-green-700">{salary}</span>
              )}
              <span className="text-[11px] text-gray-400 ml-1">{timeAgo(job.postedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
