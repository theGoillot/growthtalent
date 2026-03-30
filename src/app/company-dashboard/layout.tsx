import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

export default async function CompanyDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const companyId = cookieStore.get("company_session")?.value;

  if (!companyId) redirect("/");

  const company = await db.company.findUnique({ where: { id: companyId } });
  if (!company || !company.isClaimed) redirect("/");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/Logo_GT.svg" alt="Growth.Talent" width={28} height={28} />
              <span className="font-display text-lg font-bold">Growth.Talent</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/company-dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
              <Link href="/company-dashboard/jobs" className="text-muted-foreground hover:text-foreground">Jobs</Link>
              <Link href="/boost" className="text-gt-purple font-medium hover:underline">Boost</Link>
            </nav>
          </div>
          <span className="text-sm text-muted-foreground">{company.name}</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
