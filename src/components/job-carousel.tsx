"use client";

import { useRef } from "react";
import Link from "next/link";
import { CompanyLogo } from "@/components/company-logo";

interface CarouselJob {
  slug: string;
  title: string;
  category: string;
  seniority: string;
  location: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  company: {
    name: string;
    slug: string;
    logoUrl: string | null;
    domain: string | null;
  };
}

function formatSalary(min: number | null, max: number | null, currency: string | null) {
  if (!min || !max) return null;
  const symbol = currency === "EUR" ? "\u20ac" : currency === "BRL" ? "R$" : "$";
  return `${symbol}${(min / 1000).toFixed(0)}K\u2013${symbol}${(max / 1000).toFixed(0)}K`;
}

const SENIORITY_LABELS: Record<string, string> = {
  INTERN: "Intern", JUNIOR: "Junior", MID: "Mid-level",
  SENIOR: "Senior", LEAD: "Lead", MANAGER: "Manager",
  DIRECTOR: "Director", VP: "VP", C_LEVEL: "C-Level",
};

export function JobCarousel({ jobs, jobsPath }: { jobs: CarouselJob[]; jobsPath: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  }

  return (
    <div className="relative group/carousel">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black/10 bg-white p-2.5 shadow-lg opacity-0 transition-opacity group-hover/carousel:opacity-100"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black/10 bg-white p-2.5 shadow-lg opacity-0 transition-opacity group-hover/carousel:opacity-100"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      {/* Gradient masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-8 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-8 bg-gradient-to-l from-white to-transparent" />

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-none"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {jobs.map((job) => {
          const salary = formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency);
          const href = `/${jobsPath}/${job.category}/${job.company.slug}/${job.slug}`;

          return (
            <Link
              key={job.slug}
              href={href}
              className="group flex-shrink-0 w-[300px] rounded-2xl border-2 border-black/[0.06] bg-white p-6 transition-all hover:border-gt-black hover:shadow-[4px_4px_0px_#000] hover:-translate-y-1"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex items-center gap-3">
                <CompanyLogo name={job.company.name} logoUrl={job.company.logoUrl} domain={job.company.domain} size={40} />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-gt-black truncate">{job.company.name}</p>
                  <p className="text-[11px] text-gray-400">{job.location ?? "Remote"}</p>
                </div>
              </div>

              <h3 className="mt-4 font-display text-[17px] font-bold leading-tight text-gt-black line-clamp-2">
                {job.title}
              </h3>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-gt-purple/10 px-2.5 py-0.5 text-[11px] font-semibold text-gt-black">
                  {job.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
                <span className="rounded-full bg-gt-pink/15 px-2.5 py-0.5 text-[11px] font-semibold text-gt-black">
                  {SENIORITY_LABELS[job.seniority] ?? job.seniority}
                </span>
              </div>

              {salary && (
                <div className="mt-4 pt-4 border-t border-black/[0.04]">
                  <span className="text-[15px] font-bold text-emerald-600">{salary}</span>
                  <span className="text-[11px] text-gray-400 ml-1">/year</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
