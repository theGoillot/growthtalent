"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export function HomepageNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/Logo_GT.svg" alt="Growth.Talent" width={26} height={26} className={`transition-all duration-500 ${scrolled ? "" : "brightness-0 invert"}`} />
            <span className={`text-[17px] tracking-tight transition-colors duration-500 ${scrolled ? "text-gt-black" : "text-white"}`}>
              <span className="font-extrabold">Growth</span>
              <span className="font-light">.Talent</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {[
              { label: "Find a Job", href: "/jobs" },
              { label: "Companies", href: "/companies" },
              { label: "Resources", href: "/ressources/fiche-metier-head-of-growth" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  scrolled
                    ? "text-gray-500 hover:text-gt-black hover:bg-gray-50"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/auth/signin"
              className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                scrolled ? "text-gray-500 hover:text-gt-black" : "text-white/60 hover:text-white"
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/post-job"
              className={`rounded-full px-5 py-2 text-[13px] font-bold transition-all ${
                scrolled
                  ? "border-2 border-gt-black bg-gt-black text-white hover:bg-white hover:text-gt-black"
                  : "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              }`}
            >
              Post a Job
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`rounded-lg p-2 transition-colors md:hidden ${
              scrolled ? "text-gt-black hover:bg-gray-50" : "text-white hover:bg-white/10"
            }`}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-gt-dark p-6 pt-20 shadow-2xl">
            <div className="space-y-1">
              {[
                { label: "Find a Job", href: "/jobs" },
                { label: "Companies", href: "/companies" },
                { label: "Resources", href: "/ressources/fiche-metier-head-of-growth" },
                { label: "Post a Job", href: "/post-job" },
                { label: "Sign In", href: "/auth/signin" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-[15px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
