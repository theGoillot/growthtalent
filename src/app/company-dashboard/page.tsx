import { cookies } from "next/headers";
import { db } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CompanyDashboardPage() {
  const cookieStore = await cookies();
  const companyId = cookieStore.get("company_session")?.value!;

  const [company, jobCount, applicationCount, activeBoost] = await Promise.all([
    db.company.findUnique({ where: { id: companyId } }),
    db.job.count({ where: { companyId, status: "APPROVED" } }),
    db.application.count({ where: { job: { companyId } } }),
    db.boost.findFirst({ where: { companyId, isActive: true }, orderBy: { expiresAt: "desc" } }),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">{company?.name} Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border bg-white p-5">
          <div className="text-sm text-muted-foreground">Active Jobs</div>
          <div className="mt-1 font-display text-3xl font-bold">{jobCount}</div>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="text-sm text-muted-foreground">Applications</div>
          <div className="mt-1 font-display text-3xl font-bold">{applicationCount}</div>
        </div>
        <div className={`rounded-xl border p-5 ${activeBoost ? "bg-gt-yellow/10 border-gt-yellow" : "bg-white"}`}>
          <div className="text-sm text-muted-foreground">Boost Status</div>
          <div className="mt-1 font-display text-xl font-bold">
            {activeBoost ? `Active until ${activeBoost.expiresAt?.toLocaleDateString()}` : "Not boosted"}
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <div className="text-sm text-muted-foreground">Candidate Access</div>
          <div className="mt-1 font-display text-xl font-bold">
            {activeBoost ? "Unlocked" : "Locked"}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/company-dashboard/jobs" className="rounded-full bg-gt-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gt-black/85">
          View Jobs & Applicants
        </Link>
        {!activeBoost && (
          <Link href="/boost" className="rounded-full bg-gt-purple px-6 py-2.5 text-sm font-semibold text-gt-black hover:bg-gt-purple/80">
            Boost Your Listings
          </Link>
        )}
        <Link href="/post-job" className="rounded-full border-2 border-gt-black px-6 py-2.5 text-sm font-semibold hover:bg-gray-50">
          Post New Job
        </Link>
      </div>
    </div>
  );
}
