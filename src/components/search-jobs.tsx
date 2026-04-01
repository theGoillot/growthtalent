"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchJobs({ jobsPath, category, placeholder }: { jobsPath: string; category?: string; placeholder: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      const base = `/${jobsPath}${category ? `/${category}` : ""}`;
      router.push(`${base}?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-black/10 bg-white py-3 pl-11 pr-4 text-sm transition-colors placeholder:text-gray-400 focus:border-gt-purple focus:outline-none"
      />
    </form>
  );
}
