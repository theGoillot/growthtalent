"use client";

import { useState } from "react";
import Image from "next/image";

interface CompanyLogoProps {
  name: string;
  logoUrl: string | null;
  domain: string | null;
  size?: number;
  className?: string;
}

export function CompanyLogo({ name, logoUrl, domain, size = 48, className = "" }: CompanyLogoProps) {
  const [error, setError] = useState(false);

  const src = !error
    ? logoUrl || (domain ? `https://img.logo.dev/${domain}?token=pk_a8C5jGEYR3yhZaKC7wMuvA&size=128&retina=true` : null)
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
    <Image
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={`shrink-0 rounded-xl border-2 border-black/10 bg-white object-contain ${className}`}
      onError={() => setError(true)}
    />
  );
}
