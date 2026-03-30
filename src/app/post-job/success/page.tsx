import Image from "next/image";
import Link from "next/link";

export default function PostJobSuccessPage() {
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
        <div className="text-5xl">&#9989;</div>
        <h1 className="mt-6 font-display text-4xl font-bold">Job submitted!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your listing is being reviewed by our AI moderation system.
          It will be live within minutes if everything looks good.
        </p>

        <div className="mt-8 rounded-xl border bg-gt-cream/30 p-6 text-left">
          <h3 className="font-semibold">What happens next:</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>&rarr; AI reviews your listing for quality and relevance</li>
            <li>&rarr; If approved, it goes live on Growth.Talent immediately</li>
            <li>&rarr; Candidates can browse and apply right away</li>
            <li>&rarr; Want more visibility? Boost your listing for featured placement</li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/boost" className="rounded-full bg-gt-purple px-6 py-3 text-sm font-semibold text-gt-black transition-colors hover:bg-gt-purple/80">
            Boost Your Listing
          </Link>
          <Link href="/jobs" className="rounded-full border-2 border-gt-black px-6 py-3 text-sm font-semibold hover:bg-gray-50">
            Browse Jobs
          </Link>
        </div>
      </main>
    </div>
  );
}
