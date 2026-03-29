import Image from "next/image";
import Link from "next/link";

const MARKETS = [
  { label: "USA", flag: "\ud83c\uddfa\ud83c\uddf8", href: "/jobs", locale: "en" },
  { label: "France", flag: "\ud83c\uddeb\ud83c\uddf7", href: "/emplois", locale: "fr" },
  { label: "LatAm", flag: "\ud83c\udf0e", href: "/empleos", locale: "es" },
];

const STATS = [
  { value: "2,400+", label: "Growth Jobs" },
  { value: "800+", label: "Companies" },
  { value: "54K+", label: "Community" },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      {/* ── Header ─────────────────────────────────────── */}
      <header className="w-full border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Image src="/Logo_GT.svg" alt="Growth.Talent" width={32} height={32} />
            <span className="font-display text-xl font-bold">Growth.Talent</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {MARKETS.map((m) => (
              <Link
                key={m.locale}
                href={m.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {m.flag} {m.label}
              </Link>
            ))}
            <Link
              href="/post-job"
              className="rounded-full bg-gt-purple px-4 py-2 text-sm font-medium text-gt-black transition-colors hover:bg-gt-purple/80"
            >
              Post a Job
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative w-full bg-gt-cream py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Growth careers
            <br />
            that <span className="text-gt-purple">matter</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Find your next growth marketing role at the best startups and
            scale-ups in the USA, France, and Latin America.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {MARKETS.map((m) => (
              <Link
                key={m.locale}
                href={m.href}
                className="rounded-full border-2 border-gt-black bg-white px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                {m.flag} Browse {m.label} Jobs
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────── */}
      <section className="w-full border-b border-border/50 bg-white py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-12 px-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Placeholder: Featured Jobs ─────────────────── */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold">Featured Jobs</h2>
          <p className="mt-2 text-muted-foreground">
            Coming soon — jobs will appear here once the data pipeline is connected.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="mt-auto w-full bg-gt-dark py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              <Image src="/Logo_GT.svg" alt="Growth.Talent" width={28} height={28} />
              <span className="font-display text-lg font-bold">Growth.Talent</span>
            </div>
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} Growth.Talent. The growth marketing career platform.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
