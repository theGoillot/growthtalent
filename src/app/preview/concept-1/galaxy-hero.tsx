"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Keyword {
  text: string;
  href: string;
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
  delay: number;
}

const KEYWORDS: Omit<Keyword, "x" | "y" | "delay">[] = [
  { text: "Head of Growth", href: "/jobs/head-of-growth", size: "lg" },
  { text: "SEO", href: "/jobs/seo", size: "md" },
  { text: "Performance Marketing", href: "/jobs/performance-marketing", size: "lg" },
  { text: "$120K+", href: "/jobs?q=", size: "sm" },
  { text: "Remote", href: "/jobs?remote=true", size: "md" },
  { text: "Paris", href: "/emplois", size: "sm" },
  { text: "New York", href: "/jobs?q=new+york", size: "md" },
  { text: "B2B SaaS", href: "/jobs?q=saas", size: "sm" },
  { text: "CRM", href: "/jobs/crm-lifecycle", size: "md" },
  { text: "Product Marketing", href: "/jobs/product-marketing", size: "lg" },
  { text: "Growth Engineer", href: "/jobs/growth-engineering", size: "md" },
  { text: "TikTok", href: "/jobs/social-media", size: "sm" },
  { text: "Series B", href: "/jobs?q=", size: "sm" },
  { text: "Demand Gen", href: "/jobs/demand-generation", size: "md" },
  { text: "PLG", href: "/jobs?q=product+led", size: "sm" },
  { text: "San Francisco", href: "/jobs?q=san+francisco", size: "md" },
  { text: "Content", href: "/jobs/content-marketing", size: "sm" },
  { text: "Analytics", href: "/jobs/data-analytics", size: "sm" },
  { text: "Partnerships", href: "/jobs/partnerships", size: "md" },
  { text: "Brand", href: "/jobs/brand-marketing", size: "sm" },
];

function generatePositions(): Keyword[] {
  return KEYWORDS.map((kw, i) => ({
    ...kw,
    x: 5 + Math.random() * 85,
    y: 8 + Math.random() * 75,
    delay: i * 0.15,
  }));
}

export function GalaxyHero({ jobsPath }: { jobsPath: string }) {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [highlighted, setHighlighted] = useState(0);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setKeywords(generatePositions());
  }, []);

  // Rotate highlighted keyword
  useEffect(() => {
    const timer = setInterval(() => {
      setHighlighted((h) => (h + 1) % KEYWORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${jobsPath}?q=${encodeURIComponent(query.trim())}`);
    }
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-[12px]",
    md: "px-4 py-2 text-[14px]",
    lg: "px-5 py-2.5 text-[16px] font-bold",
  };

  return (
    <section className="relative min-h-[100vh] overflow-hidden" style={{
      background: "linear-gradient(135deg, #F8EADD 0%, #fff 35%, #A8AAD8 60%, #FEB9CE 100%)",
    }}>
      {/* Floating keywords */}
      <div className="absolute inset-0 pointer-events-none">
        {keywords.map((kw, i) => (
          <a
            key={kw.text}
            href={kw.href}
            className={`absolute pointer-events-auto rounded-full border bg-white/80 font-medium text-gray-600 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-white hover:text-gt-black hover:shadow-lg ${sizeClasses[kw.size]} ${
              i === highlighted
                ? "!border-gt-purple !border-2 border-dashed !bg-gt-purple/10 !text-gt-black shadow-[0_0_20px_rgba(168,170,216,0.3)] scale-110"
                : "border-black/10"
            }`}
            style={{
              left: `${kw.x}%`,
              top: `${kw.y}%`,
              transform: `translate(-50%, -50%)`,
              animationDelay: `${kw.delay}s`,
              animation: `float-gentle ${6 + i % 4}s ease-in-out infinite`,
            }}
          >
            {kw.text}
          </a>
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex min-h-[100vh] flex-col items-center justify-center px-6">
        <h1 className="font-display text-center text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.9] tracking-tight text-gt-black">
          Find your next<br />growth role
        </h1>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-xl">
          <div className="relative">
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by role, company, city..."
              className="w-full rounded-2xl border-2 border-white/60 bg-white/90 py-4 pl-14 pr-6 text-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-gt-black focus:bg-white focus:shadow-[0_8px_40px_rgba(0,0,0,0.12)] focus:outline-none"
            />
          </div>
        </form>

        {/* Dual CTAs */}
        <div className="mt-6 flex gap-4">
          <a href={`/${jobsPath}`} className="rounded-full border-2 border-gt-black bg-gt-black px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black hover:shadow-[4px_4px_0px_#000]">
            Browse Jobs &rarr;
          </a>
          <a href="/post-job" className="rounded-full border-2 border-gt-black/30 bg-white/80 px-8 py-3 text-sm font-bold text-gt-black backdrop-blur-sm transition-all hover:border-gt-black hover:shadow-[4px_4px_0px_#000]">
            Post a Job (Free)
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-12px); }
        }
      `}</style>
    </section>
  );
}
