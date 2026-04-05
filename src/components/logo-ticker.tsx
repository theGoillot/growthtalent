"use client";

import Image from "next/image";

interface LogoTickerProps {
  companies: { name: string; domain: string | null }[];
}

export function LogoTicker({ companies }: LogoTickerProps) {
  // Double the array for seamless infinite scroll
  const logos = [...companies, ...companies];

  return (
    <div className="relative w-full overflow-hidden border-y border-black/5 bg-white py-5">
      {/* Gradient masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

      <div className="animate-ticker flex w-max items-center gap-12">
        {logos.map((company, i) => (
          <div key={`${company.name}-${i}`} className="flex shrink-0 items-center gap-2.5 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            {company.domain ? (
              <Image
                src={`https://img.logo.dev/${company.domain}?token=pk_a8C5jGEYR3yhZaKC7wMuvA&size=64&retina=true`}
                alt={company.name}
                width={28}
                height={28}
                className="rounded-md"
              />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-xs font-bold text-gray-400">
                {company.name.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
