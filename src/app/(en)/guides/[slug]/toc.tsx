"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
}

export function GuideTableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="sticky top-24">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block rounded-lg px-3 py-1.5 text-[13px] leading-snug transition-all ${
                activeId === h.id
                  ? "bg-gt-purple/10 font-semibold text-gt-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
