import { db } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [totalJobs, pendingJobs, approvedJobs, flaggedJobs, rejectedJobs, totalCompanies, totalCandidates] =
    await Promise.all([
      db.job.count(),
      db.job.count({ where: { status: "PENDING_REVIEW" } }),
      db.job.count({ where: { status: "APPROVED" } }),
      db.job.count({ where: { status: "FLAGGED" } }),
      db.job.count({ where: { status: "REJECTED" } }),
      db.company.count(),
      db.candidate.count(),
    ]);

  const stats = [
    { label: "Total Jobs", value: totalJobs, href: "/admin/jobs" },
    { label: "Pending Review", value: pendingJobs, href: "/admin/jobs?status=PENDING_REVIEW", highlight: pendingJobs > 0 },
    { label: "Approved", value: approvedJobs, href: "/admin/jobs?status=APPROVED" },
    { label: "Flagged", value: flaggedJobs, href: "/admin/jobs?status=FLAGGED", highlight: flaggedJobs > 0 },
    { label: "Rejected", value: rejectedJobs, href: "/admin/jobs?status=REJECTED" },
    { label: "Companies", value: totalCompanies },
    { label: "Candidates", value: totalCandidates },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const content = (
            <div
              key={stat.label}
              className={`rounded-xl border p-5 ${stat.highlight ? "border-gt-yellow bg-gt-yellow/10" : "bg-white"}`}
            >
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="mt-1 font-display text-3xl font-bold">{stat.value}</div>
            </div>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href}>
              {content}
            </Link>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })}
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/admin/jobs?status=PENDING_REVIEW"
          className="rounded-full bg-gt-purple px-6 py-2.5 text-sm font-semibold hover:bg-gt-purple/80"
        >
          Review Pending Jobs ({pendingJobs})
        </Link>
        <Link
          href="/admin/import"
          className="rounded-full border-2 border-gt-black px-6 py-2.5 text-sm font-semibold hover:bg-gt-black hover:text-white"
        >
          Import CSV
        </Link>
      </div>
    </div>
  );
}
