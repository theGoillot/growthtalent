import Image from "next/image";
import Link from "next/link";

export default function BoostSuccessPage() {
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

      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="text-5xl">&#127881;</div>
        <h1 className="mt-6 font-display text-4xl font-bold">Your listing is now boosted!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your jobs are now featured at the top of category pages. You&apos;ll also
          get access to candidate profiles who applied to your positions.
        </p>

        <div className="mt-8 rounded-xl border bg-gt-cream/30 p-6 text-left">
          <h3 className="font-semibold">What happens next:</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>&#8594; Your listings appear in positions 1-3 on category pages</li>
            <li>&#8594; Featured badge displayed on all your job cards</li>
            <li>&#8594; Included in this week&apos;s newsletter</li>
            <li>&#8594; Candidate profiles unlocked for 30 days</li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/jobs"
            className="rounded-full bg-gt-black px-6 py-3 text-sm font-semibold text-white hover:bg-gt-black/85"
          >
            View Jobs
          </Link>
          <Link
            href="/"
            className="rounded-full border-2 border-gt-black px-6 py-3 text-sm font-semibold hover:bg-gray-50"
          >
            Go Home
          </Link>
        </div>
      </main>
    </div>
  );
}
