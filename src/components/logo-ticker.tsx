"use client";

import { useState } from "react";

interface LogoTickerProps {
  companies: { name: string; domain: string | null }[];
}

function LogoItem({ company }: { company: { name: string; domain: string | null } }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex shrink-0 items-center gap-2 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0">
      {company.domain && !imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`}
          alt={`${company.name} logo`}
          width={24}
          height={24}
          loading="lazy"
          decoding="async"
          className="rounded"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-400">
          {company.name.charAt(0)}
        </div>
      )}
      <span className="text-[13px] font-medium text-gray-400 whitespace-nowrap">{company.name}</span>
    </div>
  );
}

export function LogoTicker({ companies }: LogoTickerProps) {
  const logos = [...companies, ...companies];

  return (
    <div className="relative w-full overflow-hidden border-y border-black/5 bg-white py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

      <div className="animate-ticker flex w-max items-center gap-8">
        {logos.map((company, i) => (
          <LogoItem key={`${company.name}-${i}`} company={company} />
        ))}
      </div>
    </div>
  );
}
