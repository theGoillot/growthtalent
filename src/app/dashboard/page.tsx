import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/auth/signin");

  const candidate = await db.candidate.findUnique({
    where: { email: session.user.email },
    include: {
      applications: {
        include: {
          job: {
            include: { company: { select: { name: true, slug: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!candidate) redirect("/auth/signin");

  if (!candidate.isProfileComplete) redirect("/profile/edit");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/Logo_GT.svg" alt="Growth.Talent" width={32} height={32} />
            <span className="font-display text-xl font-bold">Growth.Talent</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{candidate.name}</span>
            <Link href="/profile/edit" className="text-sm text-gt-purple hover:underline">
              Edit Profile
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="font-display text-3xl font-bold">My Applications</h1>
        <p className="mt-2 text-muted-foreground">
          {candidate.applications.length} application{candidate.applications.length !== 1 && "s"}
        </p>

        <div className="mt-6 space-y-3">
          {candidate.applications.length > 0 ? (
            candidate.applications.map((app) => (
              <div key={app.id} className="rounded-xl border bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{app.job.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {app.job.company.name} &middot;{" "}
                      {app.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline">{app.status}</Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border bg-white p-12 text-center">
              <p className="text-muted-foreground">No applications yet.</p>
              <Link
                href="/jobs"
                className="mt-4 inline-block rounded-full bg-gt-black px-6 py-2.5 text-sm font-semibold text-white"
              >
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
