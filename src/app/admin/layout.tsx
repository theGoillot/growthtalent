import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === process.env.ADMIN_PASSWORD;

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <span className="font-display text-lg font-bold">GT Admin</span>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/admin/jobs" className="text-muted-foreground hover:text-foreground">
                Jobs
              </Link>
              <Link href="/admin/import" className="text-muted-foreground hover:text-foreground">
                Import
              </Link>
            </nav>
          </div>
          <form action="/admin/login" method="get">
            <button
              type="submit"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
