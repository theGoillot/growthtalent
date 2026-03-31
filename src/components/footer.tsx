import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import { EmailCapture } from "./email-capture";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-auto w-full" style={{ backgroundColor: "#161616" }}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand + Email */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image src="/Logo_GT.svg" alt="Growth.Talent" width={26} height={26} />
              <span className="text-[17px] text-white tracking-tight">
                <span className="font-extrabold">Growth</span>
                <span className="font-extrabold">.</span>
                <span className="font-light">Talent</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/40">
              Le mouvement bien intentionn&eacute; et p&eacute;dagogique qui fait briller les carri&egrave;res dans le growth.
            </p>

            <div className="mt-6">
              <p className="text-[13px] font-medium text-white/70">{dict.footer.subscribe}</p>
              <EmailCapture
                placeholder={dict.footer.subscribePlaceholder}
                buttonText={dict.footer.subscribeButton}
              />
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-4">
              <a href="https://twitter.com/growthalent" target="_blank" rel="noopener noreferrer" className="text-white/30 transition-colors hover:text-white" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://linkedin.com/company/growthtalent" target="_blank" rel="noopener noreferrer" className="text-white/30 transition-colors hover:text-white" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://instagram.com/growthtalent" target="_blank" rel="noopener noreferrer" className="text-white/30 transition-colors hover:text-white" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>

          {/* Jobs by Market */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">Jobs</h4>
            <div className="mt-4 space-y-2 text-[13px]">
              <Link href="/jobs" className="block text-white/45 transition-colors hover:text-white">{"\ud83c\uddfa\ud83c\uddf8"} USA Jobs</Link>
              <Link href="/emplois" className="block text-white/45 transition-colors hover:text-white">{"\ud83c\uddeb\ud83c\uddf7"} Emplois France</Link>
              <Link href="/empleos" className="block text-white/45 transition-colors hover:text-white">{"\ud83c\udf0e"} Empleos LatAm</Link>
              <Link href="/empregos" className="block text-white/45 transition-colors hover:text-white">{"\ud83c\udde7\ud83c\uddf7"} Empregos Brasil</Link>
              <div className="!mt-4 border-t border-white/5 pt-3" />
              <Link href="/jobs/growth-marketing" className="block text-white/45 transition-colors hover:text-white">Growth Marketing</Link>
              <Link href="/jobs/head-of-growth" className="block text-white/45 transition-colors hover:text-white">Head of Growth</Link>
              <Link href="/jobs/performance-marketing" className="block text-white/45 transition-colors hover:text-white">Performance Marketing</Link>
              <Link href="/jobs/seo" className="block text-white/45 transition-colors hover:text-white">SEO</Link>
              <Link href="/jobs/product-marketing" className="block text-white/45 transition-colors hover:text-white">Product Marketing</Link>
              <Link href="/jobs/crm-lifecycle" className="block text-white/45 transition-colors hover:text-white">CRM &amp; Lifecycle</Link>
            </div>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">Ressources</h4>
            <div className="mt-4 space-y-2 text-[13px]">
              <Link href="/ressources/fiche-metier-growth-operations" className="block text-white/45 transition-colors hover:text-white">Growth Operations</Link>
              <Link href="/ressources/fiche-metier-head-of-growth" className="block text-white/45 transition-colors hover:text-white">Head of Growth</Link>
              <Link href="/ressources/fiche-metier-growth-outbound" className="block text-white/45 transition-colors hover:text-white">Growth Outbound</Link>
              <Link href="/ressources/fiche-metier-product-growth-manager" className="block text-white/45 transition-colors hover:text-white">Product Growth</Link>
              <Link href="/ressources/fiche-metier-demand-generation" className="block text-white/45 transition-colors hover:text-white">Demand Generation</Link>
              <div className="!mt-4 border-t border-white/5 pt-3" />
              <Link href="/ressources/analyse-des-salaires-growth" className="block text-white/45 transition-colors hover:text-white">Salaires Growth</Link>
              <Link href="/ressources/a-quoi-sert-lequity" className="block text-white/45 transition-colors hover:text-white">Guide Equity</Link>
              <Link href="/ressources/6-reussir-son-entretien-dans-le-growth" className="block text-white/45 transition-colors hover:text-white">R&eacute;ussir son entretien</Link>
            </div>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">Employers</h4>
            <div className="mt-4 space-y-2 text-[13px]">
              <Link href="/post-job" className="block text-white/45 transition-colors hover:text-white">Post a Job (Free)</Link>
              <Link href="/boost" className="block text-white/45 transition-colors hover:text-white">Boost a Listing</Link>
              <Link href="/companies" className="block text-white/45 transition-colors hover:text-white">Companies</Link>
            </div>
            <div className="!mt-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">Candidates</h4>
              <div className="mt-4 space-y-2 text-[13px]">
                <Link href="/auth/signin" className="block text-white/45 transition-colors hover:text-white">Sign In</Link>
                <Link href="/dashboard" className="block text-white/45 transition-colors hover:text-white">My Applications</Link>
                <Link href="/profile/complete" className="block text-white/45 transition-colors hover:text-white">Complete Profile</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/25">
            &copy; {new Date().getFullYear()} Growth.Talent. Vivons le growth pleinement.
          </p>
          <div className="flex gap-5 text-[11px] text-white/25">
            <Link href="#" className="transition-colors hover:text-white/50">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-white/50">Terms</Link>
            <Link href="#" className="transition-colors hover:text-white/50">GDPR</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
