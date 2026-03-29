import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import { EmailCapture } from "./email-capture";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-auto w-full bg-gt-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image src="/Logo_GT.svg" alt="Growth.Talent" width={28} height={28} className="invert" />
              <span className="font-display text-lg font-bold">Growth.Talent</span>
            </div>
            <p className="mt-3 text-sm text-white/60">
              The growth marketing career platform. Find your next role at the best startups worldwide.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <Link href="/jobs" className="block text-white/60 hover:text-white">{"\ud83c\uddfa\ud83c\uddf8"} USA Jobs</Link>
              <Link href="/emplois" className="block text-white/60 hover:text-white">{"\ud83c\uddeb\ud83c\uddf7"} Emplois France</Link>
              <Link href="/empleos" className="block text-white/60 hover:text-white">{"\ud83c\udf0e"} Empleos LatAm</Link>
            </div>
            <div className="space-y-2">
              <Link href="/post-job" className="block text-white/60 hover:text-white">Post a Job</Link>
              <Link href="/companies" className="block text-white/60 hover:text-white">Companies</Link>
            </div>
          </div>

          {/* Email Capture */}
          <div>
            <p className="text-sm font-medium">{dict.footer.subscribe}</p>
            <EmailCapture
              placeholder={dict.footer.subscribePlaceholder}
              buttonText={dict.footer.subscribeButton}
            />
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} {dict.footer.copyright}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
