"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/dictionaries";
import { CONTENT_SLUGS, CONTENT_PAGES } from "@/lib/content";

// ── Data ────────────────────────────────────────────────

const MARKETS = [
  { flag: "\ud83c\uddfa\ud83c\uddf8", label: "USA", path: "/jobs" },
  { flag: "\ud83c\uddeb\ud83c\uddf7", label: "France", path: "/emplois" },
  { flag: "\ud83c\udf0e", label: "LatAm", path: "/empleos" },
  { flag: "\ud83c\udde7\ud83c\uddf7", label: "Brasil", path: "/empregos" },
];

const TOP_CATEGORIES = [
  { label: "Growth Marketing", path: "/jobs/growth-marketing" },
  { label: "Head of Growth", path: "/jobs/head-of-growth" },
  { label: "Performance Marketing", path: "/jobs/performance-marketing" },
  { label: "SEO", path: "/jobs/seo" },
  { label: "Product Marketing", path: "/jobs/product-marketing" },
  { label: "CRM & Lifecycle", path: "/jobs/crm-lifecycle" },
];

const RESSOURCES = CONTENT_SLUGS.slice(0, 6).map((slug) => ({
  label: CONTENT_PAGES[slug].title.replace(/^(Fiche m\u00e9tier |Zoom sur le m\u00e9tier de )/, "").replace(/ : .*$/, ""),
  path: `/ressources/${slug}`,
}));

const RESSOURCE_EXTRAS = [
  { label: "Salaires Growth", path: "/ressources/analyse-des-salaires-growth" },
  { label: "\u00c0 quoi sert l\u2019equity", path: "/ressources/a-quoi-sert-lequity" },
  { label: "R\u00e9ussir son entretien", path: "/ressources/6-reussir-son-entretien-dans-le-growth" },
];

// ── Header ──────────────────────────────────────────────

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { data: session } = useSession();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${dict.jobsPath}?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-1 px-4 lg:px-6" ref={dropdownRef}>
          {/* Logo */}
          <Link href="/" className="mr-4 flex shrink-0 items-center gap-2">
            <Image src="/Logo_GT.svg" alt="Growth.Talent" width={28} height={28} />
            <span className="hidden text-[17px] tracking-tight sm:inline">
              <span className="font-extrabold">Growth</span>
              <span className="font-extrabold">.</span>
              <span className="font-light">Talent</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {/* Jobs Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "jobs" ? null : "jobs")}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  openDropdown === "jobs" ? "bg-gray-100 text-gt-black" : "text-gray-600 hover:bg-gray-50 hover:text-gt-black"
                }`}
              >
                {dict.nav.jobs}
                <ChevronDown />
              </button>
              {openDropdown === "jobs" && (
                <div className="absolute left-0 top-full mt-1 w-72 rounded-xl border bg-white p-2 shadow-lg">
                  <p className="px-3 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    By market
                  </p>
                  {MARKETS.map((m) => (
                    <Link
                      key={m.path}
                      href={m.path}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-50"
                    >
                      <span className="text-base">{m.flag}</span>
                      <span className="font-medium">{m.label} Jobs</span>
                    </Link>
                  ))}
                  <div className="my-1.5 border-t" />
                  <p className="px-3 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    By category
                  </p>
                  {TOP_CATEGORIES.map((c) => (
                    <Link
                      key={c.path}
                      href={c.path}
                      onClick={() => setOpenDropdown(null)}
                      className="block rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gt-black"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Ressources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "ressources" ? null : "ressources")}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  openDropdown === "ressources" ? "bg-gray-100 text-gt-black" : "text-gray-600 hover:bg-gray-50 hover:text-gt-black"
                }`}
              >
                Ressources
                <ChevronDown />
              </button>
              {openDropdown === "ressources" && (
                <div className="absolute left-0 top-full mt-1 w-72 rounded-xl border bg-white p-2 shadow-lg">
                  <p className="px-3 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Fiches m\u00e9tier
                  </p>
                  {RESSOURCES.map((r) => (
                    <Link
                      key={r.path}
                      href={r.path}
                      onClick={() => setOpenDropdown(null)}
                      className="block rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gt-black"
                    >
                      {r.label}
                    </Link>
                  ))}
                  <div className="my-1.5 border-t" />
                  <p className="px-3 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Guides
                  </p>
                  {RESSOURCE_EXTRAS.map((r) => (
                    <Link
                      key={r.path}
                      href={r.path}
                      onClick={() => setOpenDropdown(null)}
                      className="block rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gt-black"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Companies */}
            <Link
              href={`/${dict.companiesPath}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gt-black"
            >
              {dict.nav.companies}
            </Link>
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <div className="hidden items-center md:flex">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={dict.filters.search}
                  autoFocus
                  onBlur={() => !searchQuery && setSearchOpen(false)}
                  className="w-48 rounded-lg border bg-gray-50 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
                />
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gt-black"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
            )}
          </div>

          {/* Login / User */}
          {session?.user ? (
            <Link href="/dashboard" className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50">
              {session.user.image ? (
                <Image src={session.user.image} alt="" width={24} height={24} className="rounded-full" />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gt-purple text-[10px] font-bold text-white">
                  {session.user.name?.charAt(0) ?? "U"}
                </div>
              )}
              <span className="hidden text-sm font-medium lg:inline">{session.user.name?.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gt-black md:block"
            >
              {dict.nav.signIn}
            </Link>
          )}

          {/* Post a Job CTA */}
          <Link
            href="/post-job"
            className="hidden rounded-full border-2 border-gt-black bg-gt-black px-4 py-1.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black md:block"
          >
            {dict.nav.postJob}
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-50 md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-sm font-bold">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1 hover:bg-gray-100">
                <XIcon />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className="border-b p-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={dict.filters.search}
                className="w-full rounded-lg border bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
              />
            </form>

            <div className="p-4 space-y-6">
              {/* Markets */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Jobs by Market</p>
                <div className="mt-2 space-y-0.5">
                  {MARKETS.map((m) => (
                    <Link
                      key={m.path}
                      href={m.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                    >
                      <span>{m.flag}</span> {m.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Categories</p>
                <div className="mt-2 space-y-0.5">
                  {TOP_CATEGORIES.map((c) => (
                    <Link
                      key={c.path}
                      href={c.path}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Ressources */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Ressources</p>
                <div className="mt-2 space-y-0.5">
                  {[...RESSOURCES, ...RESSOURCE_EXTRAS].map((r) => (
                    <Link
                      key={r.path}
                      href={r.path}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 border-t pt-4">
                <Link
                  href="/post-job"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-full bg-gt-black py-3 text-center text-sm font-bold text-white"
                >
                  {dict.nav.postJob}
                </Link>
                {!session?.user && (
                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full rounded-full border-2 border-gt-black py-3 text-center text-sm font-bold"
                  >
                    {dict.nav.signIn}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Icons ────────────────────────────────────────────────

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-50">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
