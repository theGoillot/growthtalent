"use client";

import { useState } from "react";

interface CompanyLogoProps {
  name: string;
  logoUrl: string | null;
  domain: string | null;
  size?: number;
  className?: string;
}

export function CompanyLogo({ name, logoUrl, domain, size = 48, className = "" }: CompanyLogoProps) {
  const [error, setError] = useState(false);

  // Priority: logoUrl > Google favicon (reliable, free, no auth)
  const src = !error
    ? logoUrl || (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null)
    : null;

  if (!src) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-xl border-2 border-black/10 bg-gray-50 font-display font-bold text-gray-400 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`shrink-0 rounded-xl border-2 border-black/10 bg-white object-contain p-1 ${className}`}
      onError={() => setError(true)}
    />
  );
}
