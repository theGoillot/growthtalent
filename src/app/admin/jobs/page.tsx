import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  PENDING_REVIEW: "bg-gt-yellow text-gt-black",
  APPROVED: "bg-green-100 text-green-800",
  FLAGGED: "bg-orange-100 text-orange-800",
  REJECTED: "bg-red-100 text-red-800",
  EXPIRED: "bg-gray-100 text-gray-600",
};

async function updateJobStatus(formData: FormData) {
  "use server";
  const jobId = formData.get("jobId") as string;
  const status = formData.get("status") as "APPROVED" | "FLAGGED" | "REJECTED";
  await db.job.update({ where: { id: jobId }, data: { status } });
}

export default async function AdminJobsPage(props: {
  searchParams: Promise<{ status?: string; market?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const status = searchParams.status ?? undefined;
  const market = searchParams.market ?? undefined;
  const page = parseInt(searchParams.page ?? "1");
  const limit = 50;

  const where = {
    ...(status && { status: status as "PENDING_REVIEW" | "APPROVED" | "FLAGGED" | "REJECTED" | "EXPIRED" }),
    ...(market && { market: market as "USA" | "FRANCE" | "LATAM" }),
  };

  const [jobs, total] = await Promise.all([
    db.job.findMany({
      where,
      include: { company: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.job.count({ where }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">
          Jobs {status && <span className="text-muted-foreground">({status.replace("_", " ")})</span>}
        </h1>
        <span className="text-sm text-muted-foreground">{total} total</span>
      </div>

      {/* Filters */}
      <div className="mt-4 flex gap-2">
        {["ALL", "PENDING_REVIEW", "APPROVED", "FLAGGED", "REJECTED"].map((s) => (
          <a
            key={s}
            href={s === "ALL" ? "/admin/jobs" : `/admin/jobs?status=${s}`}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              (s === "ALL" && !status) || s === status
                ? "bg-gt-black text-white"
                : "border bg-white text-muted-foreground hover:bg-gray-50"
            }`}
          >
            {s.replace("_", " ")}
          </a>
        ))}
      </div>

      {/* Job List */}
      <div className="mt-6 space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="flex items-start justify-between rounded-xl border bg-white p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{job.title}</h3>
                <Badge className={STATUS_COLORS[job.status] ?? ""}>{job.status}</Badge>
                <Badge variant="outline">{job.market}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.company.name} &middot; {job.location ?? "No location"} &middot;{" "}
                {job.salaryMin && job.salaryMax
                  ? `${(job.salaryMin / 1000).toFixed(0)}K-${(job.salaryMax / 1000).toFixed(0)}K ${job.salaryCurrency}`
                  : "No salary"}{" "}
                &middot; {job.category} &middot; Score: {job.moderationScore ?? "—"}
              </p>
              {job.moderationNote && (
                <p className="mt-1 text-xs text-muted-foreground italic">{job.moderationNote}</p>
              )}
              {job.moderationFlags.length > 0 && (
                <div className="mt-1 flex gap-1">
                  {job.moderationFlags.map((flag) => (
                    <Badge key={flag} variant="destructive" className="text-xs">
                      {flag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2 ml-4">
              {job.status !== "APPROVED" && (
                <form action={updateJobStatus}>
                  <input type="hidden" name="jobId" value={job.id} />
                  <input type="hidden" name="status" value="APPROVED" />
                  <button className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700">
                    Approve
                  </button>
                </form>
              )}
              {job.status !== "REJECTED" && (
                <form action={updateJobStatus}>
                  <input type="hidden" name="jobId" value={job.id} />
                  <input type="hidden" name="status" value="REJECTED" />
                  <button className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700">
                    Reject
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No jobs found.</p>
        )}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="mt-6 flex justify-center gap-2">
          {page > 1 && (
            <a
              href={`/admin/jobs?${status ? `status=${status}&` : ""}page=${page - 1}`}
              className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50"
            >
              Previous
            </a>
          )}
          <span className="px-4 py-1.5 text-sm text-muted-foreground">
            Page {page} of {Math.ceil(total / limit)}
          </span>
          {page * limit < total && (
            <a
              href={`/admin/jobs?${status ? `status=${status}&` : ""}page=${page + 1}`}
              className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50"
            >
              Next
            </a>
          )}
        </div>
      )}
    </div>
  );
}
