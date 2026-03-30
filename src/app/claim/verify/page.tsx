import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ClaimVerifyPage(props: {
  searchParams: Promise<{ token?: string }>;
}) {
  const searchParams = await props.searchParams;
  const token = searchParams.token;

  if (!token) {
    return <ErrorState message="Missing verification token." />;
  }

  const claim = await db.companyClaim.findUnique({
    where: { token },
    include: { company: true },
  });

  if (!claim) {
    return <ErrorState message="Invalid or expired verification token." />;
  }

  if (claim.status === "VERIFIED") {
    return <ErrorState message="This claim has already been verified." />;
  }

  // Verify the claim
  await db.companyClaim.update({
    where: { id: claim.id },
    data: { status: "VERIFIED", verifiedAt: new Date() },
  });

  await db.company.update({
    where: { id: claim.companyId },
    data: { isClaimed: true },
  });

  // Set company session cookie
  const cookieStore = await cookies();
  cookieStore.set("company_session", claim.companyId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  redirect("/company-dashboard");
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/Logo_GT.svg" alt="Growth.Talent" width={32} height={32} />
            <span className="font-display text-xl font-bold">Growth.Talent</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-md px-6 py-16 text-center">
        <div className="text-4xl">&#9888;&#65039;</div>
        <h1 className="mt-4 font-display text-2xl font-bold">Verification Failed</h1>
        <p className="mt-2 text-muted-foreground">{message}</p>
        <Link href="/" className="mt-6 inline-block text-sm text-gt-purple hover:underline">
          Back to home
        </Link>
      </main>
    </div>
  );
}
