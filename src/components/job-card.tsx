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
  return `${symbol}${fmt(min)} - ${symbol}${fmt(max)}`;
}

function timeAgo(date: Date) {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const REMOTE_LABELS: Record<string, string> = {
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
        className={`relative rounded-xl border p-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md ${
          job.isBoosted ? "border-gt-purple bg-gt-purple-light/20" : "bg-white"
        }`}
      >
        {job.isBoosted && (
          <Badge className="absolute right-4 top-4 bg-gt-purple text-gt-black text-xs">
            Featured
          </Badge>
        )}

        <div className="flex items-start gap-4">
          {/* Company logo placeholder */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-gray-50 text-lg font-bold text-gray-400">
            {job.company.name.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-gt-purple transition-colors truncate">
              {job.title}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground truncate">
              {job.company.name}
              {job.location && ` \u00b7 ${job.location}`}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {dict.categories[job.category] ?? job.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {dict.seniority[job.seniority] ?? job.seniority}
              </Badge>
              {job.remote !== "ONSITE" && (
                <Badge variant="outline" className="text-xs">
                  {REMOTE_LABELS[job.remote] ?? job.remote}
                </Badge>
              )}
              {salary && (
                <span className="text-xs font-medium text-green-700">{salary}</span>
              )}
              <span className="ml-auto text-xs text-muted-foreground">{timeAgo(job.postedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
