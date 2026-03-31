import Link from "next/link";
import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { getJobs, getCategoriesWithCount, getStats } from "@/lib/queries";
import { JobCard } from "@/components/job-card";
import { DotGrid } from "@/components/dot-grid";
import { StickerFloat } from "@/components/sticker";

const STICKERS: Record<string, { text: string; rotate: number; pos: string }[]> = {
  en: [
    { text: "Free", rotate: -12, pos: "left-[8%] top-[20%]" },
    { text: "Sky is the limit", rotate: 8, pos: "right-[6%] top-[30%]" },
  ],
  fr: [
    { text: "Gratuit", rotate: -12, pos: "left-[8%] top-[20%]" },
    { text: "Brillons ensemble", rotate: 8, pos: "right-[6%] top-[30%]" },
  ],
  es: [
    { text: "Gratis", rotate: -12, pos: "left-[8%] top-[20%]" },
    { text: "Growth sin fronteras", rotate: 8, pos: "right-[6%] top-[30%]" },
  ],
  pt: [
    { text: "Gr\u00e1tis", rotate: -12, pos: "left-[8%] top-[20%]" },
    { text: "Growth sem limites", rotate: 8, pos: "right-[6%] top-[30%]" },
  ],
};

export async function MarketHomepage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [stats, categories, { jobs }] = await Promise.all([
    getStats(locale),
    getCategoriesWithCount(locale),
    getJobs({ locale, limit: 8, boostedFirst: true }),
  ]);

  const stickers = STICKERS[locale] ?? STICKERS.en;

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <DotGrid className="relative overflow-hidden">
        {stickers.map((s) => (
          <StickerFloat key={s.text} text={s.text} rotate={s.rotate} className={`${s.pos} hidden lg:block`} />
        ))}

        <div className="mx-auto max-w-5xl px-6 py-24 md:py-36">
          <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-gt-black md:text-8xl lg:text-9xl whitespace-pre-line">
            {dict.hero.title}
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-gt-black/70">
            {dict.hero.subtitle}
          </p>
          <div className="mt-10">
            <Link
              href={`/${dict.jobsPath}`}
              className="rounded-full border-2 border-gt-black bg-gt-black px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black hover:shadow-[4px_4px_0px_#000]"
            >
              {dict.hero.cta} &rarr;
            </Link>
          </div>
        </div>
      </DotGrid>

      {/* ── Stats ──────────────────────────────────────── */}
      <section className="w-full border-b border-black/5 bg-white py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-16 px-6">
          {[
            { value: stats.jobCount > 0 ? `${stats.jobCount}` : "0", label: dict.nav.jobs },
            { value: stats.companyCount > 0 ? `${stats.companyCount}` : "0", label: dict.nav.companies },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold md:text-3xl">{s.value}</div>
              <div className="mt-0.5 text-xs font-medium uppercase tracking-widest text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="w-full bg-gt-cream py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              {dict.filters.allCategories}
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((c) => (
                <Link
                  key={c.category}
                  href={`/${dict.jobsPath}/${c.category}`}
                  className="group rounded-2xl border-2 border-transparent bg-white p-5 transition-all hover:border-gt-black hover:shadow-[3px_3px_0px_#000]"
                >
                  <div className="font-semibold text-gt-black">
                    {dict.categories[c.category] ?? c.category}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">
                    {c.count} {dict.nav.jobs.toLowerCase()}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Latest Jobs ────────────────────────────────── */}
      {jobs.length > 0 && (
        <section className="w-full bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-4xl font-bold md:text-5xl">{dict.job.allJobs}</h2>
              <Link
                href={`/${dict.jobsPath}`}
                className="hidden rounded-full border-2 border-gt-black px-5 py-2.5 text-sm font-bold transition-all hover:bg-gt-black hover:text-white sm:block"
              >
                {dict.hero.cta} &rarr;
              </Link>
            </div>
            <div className="mt-10 space-y-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} dict={dict} jobsPath={dict.jobsPath} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Employer CTA ───────────────────────────────── */}
      <section className="w-full bg-gt-yellow py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            {dict.nav.postJob}
          </h2>
          <p className="mt-4 text-lg text-gt-black/70">
            {dict.footer.subscribe}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/post-job"
              className="rounded-full border-2 border-gt-black bg-gt-black px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black"
            >
              {dict.nav.postJob}
            </Link>
            <Link
              href="/boost"
              className="rounded-full border-2 border-gt-black bg-white px-8 py-3.5 text-sm font-bold transition-all hover:shadow-[4px_4px_0px_#000]"
            >
              Boost
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
