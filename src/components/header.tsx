import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/dictionaries";

const MARKET_LINKS: { locale: Locale; flag: string; label: string; jobsPath: string }[] = [
  { locale: "en", flag: "\ud83c\uddfa\ud83c\uddf8", label: "USA", jobsPath: "/jobs" },
  { locale: "fr", flag: "\ud83c\uddeb\ud83c\uddf7", label: "France", jobsPath: "/emplois" },
  { locale: "es", flag: "\ud83c\udf0e", label: "LatAm", jobsPath: "/empleos" },
];

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/Logo_GT.svg" alt="Growth.Talent" width={32} height={32} />
          <span className="font-display text-xl font-bold tracking-tight">Growth.Talent</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {MARKET_LINKS.map((m) => (
            <Link
              key={m.locale}
              href={m.jobsPath}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                m.locale === locale
                  ? "bg-gt-purple/20 font-medium text-gt-black"
                  : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              }`}
            >
              {m.flag} {m.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${dict.companiesPath}`}
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            {dict.nav.companies}
          </Link>
          <Link
            href="/post-job"
            className="rounded-full bg-gt-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gt-black/85"
          >
            {dict.nav.postJob}
          </Link>
        </div>
      </div>
    </header>
  );
}
