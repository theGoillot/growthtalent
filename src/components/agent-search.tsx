"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SearchItem {
  type: "job" | "company" | "category";
  title: string;
  subtitle?: string;
  href: string;
  logo?: string;
}

const TYPEWRITER_PHRASES = [
  "Head of Growth, Series B, remote, $150K+",
  "Performance Marketing Manager in New York",
  "SEO Lead at a B2B SaaS startup",
  "Growth Engineer, consumer app, $180K+",
  "CRM Manager in Paris, equity included",
  "Social Media Manager, luxury brands",
];

const TRENDING: SearchItem[] = [
  { type: "category", title: "Head of Growth", subtitle: "Most searched", href: "/jobs/head-of-growth" },
  { type: "category", title: "Performance Marketing", subtitle: "Trending", href: "/jobs/performance-marketing" },
  { type: "category", title: "SEO", subtitle: "High demand", href: "/jobs/seo" },
  { type: "category", title: "Product Marketing", subtitle: "Growing", href: "/jobs/product-marketing" },
];

interface AgentSearchProps {
  jobs: { title: string; slug: string; category: string; company: { name: string; slug: string; domain: string | null } }[];
  categories: { category: string; count: number }[];
  jobsPath: string;
}

export function AgentSearch({ jobs, categories, jobsPath }: AgentSearchProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [placeholder, setPlaceholder] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Typewriter effect
  useEffect(() => {
    if (query || focused) return;
    const phrase = TYPEWRITER_PHRASES[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setPlaceholder(phrase.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          if (charIndex + 1 >= phrase.length) {
            setTimeout(() => setIsDeleting(true), 2200);
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
      isDeleting ? 20 : 45
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, query, focused]);

  // Build search results
  const results = useCallback((): SearchItem[] => {
    if (!query.trim()) return TRENDING;

    const q = query.toLowerCase();
    const items: SearchItem[] = [];

    // Match categories
    categories
      .filter((c) => c.category.toLowerCase().includes(q) || q.includes(c.category.replace(/-/g, " ")))
      .slice(0, 3)
      .forEach((c) => {
        items.push({
          type: "category",
          title: c.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          subtitle: `${c.count} jobs`,
          href: `/${jobsPath}/${c.category}`,
        });
      });

    // Match jobs
    jobs
      .filter((j) => j.title.toLowerCase().includes(q) || j.company.name.toLowerCase().includes(q))
      .slice(0, 5)
      .forEach((j) => {
        items.push({
          type: "job",
          title: j.title,
          subtitle: j.company.name,
          href: `/${jobsPath}/${j.category}/${j.company.slug}/${j.slug}`,
          logo: j.company.domain ? `https://img.logo.dev/${j.company.domain}?token=pk_a8C5jGEYR3yhZaKC7wMuvA&size=64&retina=true` : undefined,
        });
      });

    // Match companies (deduplicated)
    const seen = new Set<string>();
    jobs
      .filter((j) => j.company.name.toLowerCase().includes(q) && !seen.has(j.company.slug) && seen.add(j.company.slug))
      .slice(0, 3)
      .forEach((j) => {
        items.push({
          type: "company",
          title: j.company.name,
          subtitle: "Company",
          href: `/companies/${j.company.slug}`,
          logo: j.company.domain ? `https://img.logo.dev/${j.company.domain}?token=pk_a8C5jGEYR3yhZaKC7wMuvA&size=64&retina=true` : undefined,
        });
      });

    return items.length ? items : [{ type: "category", title: `Search for "${query}"`, href: `/${jobsPath}?q=${encodeURIComponent(query)}` }];
  }, [query, jobs, categories, jobsPath]);

  const currentResults = results();
  const showDropdown = focused && (query.length > 0 || focused);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, currentResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && currentResults[selectedIndex]) {
        router.push(currentResults[selectedIndex].href);
        setFocused(false);
      } else if (query.trim()) {
        router.push(`/${jobsPath}?q=${encodeURIComponent(query.trim())}`);
        setFocused(false);
      }
    } else if (e.key === "Escape") {
      setFocused(false);
      inputRef.current?.blur();
    }
  }

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const typeIcons: Record<string, React.ReactNode> = {
    job: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
    company: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>,
    category: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4M12 16V8"/></svg>,
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search input */}
      <div className={`relative rounded-2xl transition-all duration-300 ${
        focused
          ? "shadow-[0_0_40px_rgba(168,170,216,0.15)] ring-1 ring-gt-purple/30"
          : "shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
      }`}>
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.06] px-5 py-4 backdrop-blur-xl">
          <svg className={`shrink-0 transition-colors ${focused ? "text-gt-purple" : "text-white/25"}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1); }}
            onFocus={() => setFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder={focused ? "Search jobs, companies, categories..." : (placeholder || "Search...")}
            className="flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/20"
          />
          {query && (
            <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="text-white/30 hover:text-white/60 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          )}
          <div className={`hidden sm:flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-mono transition-colors ${focused ? "border-white/10 text-white/30" : "border-white/5 text-white/15"}`}>
            <kbd>&#8984;</kbd><kbd>K</kbd>
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/[0.08] bg-[#1a1a1a]/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
            {query ? "Results" : "Trending"}
          </div>
          {currentResults.map((item, i) => (
            <button
              key={`${item.type}-${item.title}-${i}`}
              onClick={() => { router.push(item.href); setFocused(false); }}
              onMouseEnter={() => setSelectedIndex(i)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                i === selectedIndex ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
              }`}
            >
              {item.logo ? (
                <Image src={item.logo} alt="" width={24} height={24} className="rounded-md" />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06] text-white/30">
                  {typeIcons[item.type]}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-white/80 truncate">{item.title}</div>
                {item.subtitle && <div className="text-[11px] text-white/30">{item.subtitle}</div>}
              </div>
              <span className="shrink-0 rounded bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/20">
                {item.type}
              </span>
            </button>
          ))}
          {query && (
            <div className="mt-1 border-t border-white/[0.05] px-3 py-2">
              <button
                onClick={() => { router.push(`/${jobsPath}?q=${encodeURIComponent(query)}`); setFocused(false); }}
                className="text-[12px] text-gt-purple hover:text-gt-purple/80 transition-colors"
              >
                Search all jobs for &ldquo;{query}&rdquo; &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
