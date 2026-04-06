import Link from "next/link";
import type { Metadata } from "next";
import { GUIDE_PAGES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Growth Marketing Guides | Growth.Talent",
  description: "In-depth guides on growth marketing careers, strategies, salaries, and interviews. Featuring insights from Elena Verna, Enzo Avigo, and top growth leaders.",
};

export default function GuidesPage() {
  const guides = Object.values(GUIDE_PAGES);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold md:text-5xl">Growth Guides</h1>
      <p className="mt-4 text-lg text-gray-500">
        In-depth articles on growth marketing careers, strategies, and salaries. Written by practitioners, not bloggers.
      </p>

      <div className="mt-12 space-y-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group block rounded-2xl border-2 border-black/[0.06] bg-white p-6 transition-all hover:border-gt-black hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {guide.targetKeywords.slice(0, 3).map((kw) => (
                <span key={kw} className="rounded-full bg-gt-purple/10 px-2.5 py-0.5 text-[11px] font-semibold text-gt-black">
                  {kw}
                </span>
              ))}
            </div>
            <h2 className="font-display text-xl font-bold group-hover:text-gt-purple transition-colors">
              {guide.title}
            </h2>
            <p className="mt-2 text-[14px] text-gray-500 line-clamp-2">
              {guide.heroSubtitle}
            </p>
            {guide.speakers && (
              <div className="mt-3 flex gap-2">
                {guide.speakers.map((s) => (
                  <span key={s.name} className="text-[12px] text-gray-400">
                    {s.name}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
