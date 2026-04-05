"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const TYPEWRITER_PHRASES = [
  "Head of Growth at a Series B startup...",
  "Performance Marketing Manager, remote, $120K+...",
  "Growth Engineer in San Francisco...",
  "SEO Lead at a B2B SaaS company...",
  "CRM Manager, Paris, CDI...",
  "Social Media Manager, New York...",
];

const SUGGESTIONS = [
  { label: "Head of Growth", emoji: "🔥", query: "Head of Growth" },
  { label: "$100K+ Salary", emoji: "💰", filter: "salary" },
  { label: "Remote", emoji: "🌍", filter: "remote" },
  { label: "France", emoji: "🇫🇷", path: "/emplois" },
  { label: "Social Media", emoji: "📱", query: "social-media" },
  { label: "SEO", emoji: "🔍", query: "seo" },
  { label: "LatAm", emoji: "🌎", path: "/empleos" },
  { label: "Product Marketing", emoji: "🎯", query: "product-marketing" },
];

export function HeroSearch({ jobsPath }: { jobsPath: string }) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Typewriter effect
  useEffect(() => {
    if (query) return; // stop animation when user types

    const phrase = TYPEWRITER_PHRASES[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setPlaceholder(phrase.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          if (charIndex + 1 >= phrase.length) {
            setTimeout(() => setIsDeleting(true), 2000);
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
      isDeleting ? 30 : 60
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${jobsPath}?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleSuggestion(s: (typeof SUGGESTIONS)[0]) {
    if (s.path) {
      router.push(s.path);
    } else if (s.filter === "remote") {
      router.push(`/${jobsPath}?remote=true`);
    } else if (s.filter === "salary") {
      router.push(`/${jobsPath}?q=`);
    } else if (s.query) {
      router.push(`/${jobsPath}/${s.query}`);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search input */}
      <form onSubmit={handleSubmit} className="relative">
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || "Search jobs..."}
          className="w-full rounded-2xl border-2 border-black/10 bg-white py-4 pl-14 pr-6 text-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all placeholder:text-gray-400 focus:border-gt-purple focus:shadow-[0_4px_30px_rgba(168,170,216,0.2)] focus:outline-none"
        />
      </form>

      {/* Suggestion pills */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => handleSuggestion(s)}
            className="rounded-full border border-black/8 bg-white/80 px-3.5 py-1.5 text-[13px] font-medium text-gray-600 backdrop-blur-sm transition-all hover:-translate-y-px hover:border-gt-purple/30 hover:bg-gt-purple/5 hover:text-gt-black hover:shadow-sm"
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
