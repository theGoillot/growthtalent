import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import { EmailCapture } from "./email-capture";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-auto w-full" style={{ backgroundColor: "#161616" }}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image src="/Logo_GT.svg" alt="Growth.Talent" width={28} height={28} />
              <span className="text-lg text-white tracking-tight">
                <span className="font-extrabold">Growth</span>
                <span className="font-extrabold">.</span>
                <span className="font-light">Talent</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Le mouvement bien intentionn&eacute; et p&eacute;dagogique qui fait briller les carri&egrave;res dans le growth.
            </p>
            <div className="mt-6">
              <p className="text-sm font-medium text-white/80">{dict.footer.subscribe}</p>
              <EmailCapture
                placeholder={dict.footer.subscribePlaceholder}
                buttonText={dict.footer.subscribeButton}
              />
            </div>
          </div>

          {/* Jobs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Jobs</h4>
            <div className="mt-4 space-y-2.5 text-sm">
              <Link href="/jobs" className="block text-white/50 transition-colors hover:text-white">{"\ud83c\uddfa\ud83c\uddf8"} USA Jobs</Link>
              <Link href="/emplois" className="block text-white/50 transition-colors hover:text-white">{"\ud83c\uddeb\ud83c\uddf7"} Emplois France</Link>
              <Link href="/empleos" className="block text-white/50 transition-colors hover:text-white">{"\ud83c\udf0e"} Empleos LatAm</Link>
              <Link href="/empregos" className="block text-white/50 transition-colors hover:text-white">{"\ud83c\udde7\ud83c\uddf7"} Empregos Brasil</Link>
            </div>
          </div>

          {/* For employers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Employers</h4>
            <div className="mt-4 space-y-2.5 text-sm">
              <Link href="/post-job" className="block text-white/50 transition-colors hover:text-white">Post a Job</Link>
              <Link href="/boost" className="block text-white/50 transition-colors hover:text-white">Boost a Listing</Link>
              <Link href="/companies" className="block text-white/50 transition-colors hover:text-white">Companies</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Growth.Talent. Vivons le growth pleinement.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
