import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminLoginPage() {
  async function login(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;
    if (password === process.env.ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      redirect("/admin");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold">GT Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter admin password to continue</p>
        <form action={login} className="mt-6 space-y-4">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
            required
            autoFocus
          />
          <button
            type="submit"
            className="w-full rounded-full bg-gt-black py-2.5 text-sm font-semibold text-white hover:bg-gt-black/90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
