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
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/Logo_GT.svg" alt="Growth.Talent" width={30} height={30} />
          <span className="text-lg tracking-tight">
            <span className="font-extrabold">Growth</span>
            <span className="font-extrabold">.</span>
            <span className="font-light">Talent</span>
          </span>
        </Link>

        {/* Market Switcher */}
        <nav className="hidden items-center gap-1 rounded-full border border-black/10 bg-gray-50/80 p-1 md:flex">
          {MARKET_LINKS.map((m) => (
            <Link
              key={m.locale}
              href={m.jobsPath}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                m.locale === locale
                  ? "bg-gt-black text-white shadow-sm"
                  : "text-gray-500 hover:text-gt-black"
              }`}
            >
              {m.flag} {m.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${dict.companiesPath}`}
            className="hidden text-sm font-medium text-gray-500 transition-colors hover:text-gt-black sm:block"
          >
            {dict.nav.companies}
          </Link>
          <Link
            href="/post-job"
            className="rounded-full border-2 border-gt-black bg-gt-black px-5 py-2 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black"
          >
            {dict.nav.postJob}
          </Link>
        </div>
      </div>
    </header>
  );
}
