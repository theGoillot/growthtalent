import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function CompanyJobsPage() {
  const cookieStore = await cookies();
  const companyId = cookieStore.get("company_session")?.value!;

  const activeBoost = await db.boost.findFirst({
    where: { companyId, isActive: true },
  });

  const jobs = await db.job.findMany({
    where: { companyId, status: "APPROVED" },
    include: {
      _count: { select: { applications: true } },
      applications: activeBoost
        ? {
            include: {
              candidate: {
                select: { name: true, email: true, currentTitle: true, seniority: true, city: true, tools: true },
              },
            },
            orderBy: { createdAt: "desc" },
          }
        : false,
    },
    orderBy: { postedAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Your Jobs</h1>

      <div className="mt-6 space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.location} &middot; {job.category} &middot; {job._count.applications} applications
                </p>
              </div>
              <div className="flex gap-2">
                {job.isBoosted && <Badge className="bg-gt-yellow text-gt-black">Boosted</Badge>}
                <Badge variant="outline">{job.market}</Badge>
              </div>
            </div>

            {/* Candidate profiles (only visible with active boost) */}
            {activeBoost && job.applications && (job.applications as unknown as Array<{ candidate: { name: string | null; email: string; currentTitle: string | null; seniority: string | null; city: string | null; tools: string[] } }>).length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-semibold text-muted-foreground">Candidates who applied:</h4>
                <div className="mt-2 space-y-2">
                  {(job.applications as unknown as Array<{ candidate: { name: string | null; email: string; currentTitle: string | null; seniority: string | null; city: string | null; tools: string[] } }>).map((app, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 text-sm">
                      <div>
                        <span className="font-medium">{app.candidate.name ?? "Anonymous"}</span>
                        <span className="ml-2 text-muted-foreground">{app.candidate.email}</span>
                      </div>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        {app.candidate.currentTitle && <span>{app.candidate.currentTitle}</span>}
                        {app.candidate.seniority && <Badge variant="outline" className="text-xs">{app.candidate.seniority}</Badge>}
                        {app.candidate.city && <span>{app.candidate.city}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!activeBoost && job._count.applications > 0 && (
              <div className="mt-4 rounded-lg border-2 border-dashed border-gt-purple/40 bg-gt-purple-light/10 p-3 text-center text-sm">
                {job._count.applications} candidate{job._count.applications !== 1 && "s"} applied.{" "}
                <a href="/boost" className="font-medium text-gt-purple hover:underline">
                  Boost to unlock profiles &rarr;
                </a>
              </div>
            )}
          </div>
        ))}

        {jobs.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">No active jobs yet.</p>
        )}
      </div>
    </div>
  );
}
