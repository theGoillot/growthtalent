"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TYPEWRITER_PHRASES = [
  "Head of Growth at a Series B startup, remote, $150K+",
  "Performance Marketing Manager in NYC, B2B SaaS",
  "SEO Lead, fully remote, European timezone",
  "Growth Engineer at a consumer app, $180K+",
  "CRM Manager in Paris, CDI, equity included",
];

const SUGGESTIONS = [
  { label: "Head of Growth", emoji: "🔥", href: "/jobs/head-of-growth" },
  { label: "$100K+ Salary", emoji: "💰", href: "/jobs?q=" },
  { label: "Remote", emoji: "🌍", href: "/jobs?remote=true" },
  { label: "France", emoji: "🇫🇷", href: "/emplois" },
  { label: "Social Media", emoji: "📱", href: "/jobs/social-media" },
  { label: "SEO", emoji: "🔍", href: "/jobs/seo" },
  { label: "Performance", emoji: "📊", href: "/jobs/performance-marketing" },
  { label: "Product Marketing", emoji: "🎯", href: "/jobs/product-marketing" },
];

export function AgentHero({ jobsPath, jobCount }: { jobsPath: string; jobCount: number }) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // Typewriter
  useEffect(() => {
    if (query) return;
    const phrase = TYPEWRITER_PHRASES[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setPlaceholder(phrase.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          if (charIndex + 1 >= phrase.length) {
            setTimeout(() => setIsDeleting(true), 2500);
          }
        } else {
          setPlaceholder(phrase.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          if (charIndex <= 1) {
            setIsDeleting(false);
            setPhraseIndex((p) => (p + 1) % TYPEWRITER_PHRASES.length);
          }
        }
      },
      isDeleting ? 25 : 50
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${jobsPath}?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      style={{
        backgroundColor: "#161616",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Decorative glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-gt-purple/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-gt-pink/5 blur-[100px]" />

      {/* Badge */}
      <div className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[12px] text-white/50 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {jobCount}+ growth roles live now
      </div>

      {/* Headline */}
      <h1 className="font-display text-center text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
        Tell us what<br />you&apos;re looking for
      </h1>

      {/* Chat-style search input */}
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl">
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-5 py-4">
            <svg className="shrink-0 text-white/30" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="m2 14 6-6 6 6 4-4 4 4"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder || "Describe your dream role..."}
              className="flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/25"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-gt-purple px-4 py-2 text-sm font-bold text-white transition-all hover:bg-gt-purple/80"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Suggestion pills */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="rounded-full border border-white/8 bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/80"
          >
            {s.emoji} {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
