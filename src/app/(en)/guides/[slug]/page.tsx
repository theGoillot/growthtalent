import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { GUIDE_PAGES } from "@/lib/guides";
import { GuideTableOfContents } from "./toc";

export async function generateStaticParams() {
  return Object.keys(GUIDE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const page = GUIDE_PAGES[slug];
  if (!page) return { title: "Not Found" };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `https://www.growthtalent.org/guides/${slug}`,
      languages: page.frenchEquivalent
        ? { fr: `https://www.growthtalent.org/ressources/${page.frenchEquivalent}` }
        : undefined,
    },
  };
}

/** Extract H2 headings from HTML for table of contents */
function extractHeadings(html: string): { id: string; text: string }[] {
  const matches = html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi);
  return Array.from(matches).map((m, i) => {
    const text = m[1].replace(/<[^>]+>/g, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `section-${i}`;
    return { id, text };
  });
}

/** Add IDs to H2 tags for anchor linking */
function addHeadingIds(html: string): string {
  let index = 0;
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `section-${index}`;
    index++;
    return `<h2${attrs} id="${id}">${content}</h2>`;
  });
}

/** Estimate reading time */
function readingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 230));
}

export default async function GuidePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = GUIDE_PAGES[slug];
  if (!page) notFound();

  const headings = extractHeadings(page.content);
  const contentWithIds = addHeadingIds(page.content);
  const minutes = readingTime(page.content);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: page.title,
            description: page.metaDescription,
            datePublished: page.publishedDate,
            author: { "@type": "Organization", name: "Growth.Talent", url: "https://www.growthtalent.org" },
            publisher: { "@type": "Organization", name: "Growth.Talent", url: "https://www.growthtalent.org" },
            mainEntityOfPage: `https://www.growthtalent.org/guides/${slug}`,
          }),
        }}
      />

      {/* ── Hero ── */}
      <section className="w-full bg-gt-cream/40 pb-14 pt-8 md:pb-20 md:pt-10">
        <div className="mx-auto max-w-[52rem] px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[13px] text-gray-400">
            <Link href="/jobs" className="transition-colors hover:text-gt-black">Jobs</Link>
            <span className="text-gray-300">/</span>
            <Link href="/guides" className="transition-colors hover:text-gt-black">Guides</Link>
          </nav>

          {/* Keywords */}
          <div className="mb-5 flex flex-wrap gap-2">
            {page.targetKeywords.slice(0, 4).map((kw) => (
              <span key={kw} className="rounded-full bg-gt-purple/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gt-purple">
                {kw}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-gt-black">
            {page.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-gray-500">
            {page.heroSubtitle}
          </p>

          {/* Meta row */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-gray-400">
            <span>{page.publishedDate}</span>
            <span className="text-gray-200">|</span>
            <span>{minutes} min read</span>
            <span className="text-gray-200">|</span>
            <span>By {page.author}</span>
          </div>

          {/* Speakers */}
          {page.speakers && page.speakers.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {page.speakers.map((speaker) => (
                <div
                  key={speaker.name}
                  className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gt-purple/15 font-display text-[14px] font-bold text-gt-black">
                    {speaker.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-gt-black">{speaker.name}</p>
                    <p className="text-[12px] text-gray-400">{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Content with TOC sidebar ── */}
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex gap-12">

          {/* Sticky TOC — desktop only */}
          {headings.length > 2 && (
            <aside className="hidden w-56 shrink-0 lg:block">
              <GuideTableOfContents headings={headings} />
            </aside>
          )}

          {/* Article body */}
          <article className="min-w-0 flex-1">
            <div
              className="guide-prose"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* ── Speaker Bios ── */}
            {page.speakers && page.speakers.length > 0 && (
              <section className="mt-16 border-t border-black/[0.06] pt-12">
                <h2 className="font-display text-2xl font-bold mb-8">About the Speakers</h2>
                <div className="space-y-5">
                  {page.speakers.map((speaker) => (
                    <div
                      key={speaker.name}
                      className="flex items-start gap-5 rounded-2xl border border-black/[0.06] bg-white p-6"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gt-cream font-display text-[18px] font-bold text-gt-black">
                        {speaker.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-display text-[17px] font-bold">{speaker.name}</p>
                        <p className="mt-0.5 text-[14px] text-gray-500">{speaker.role}</p>
                        {speaker.linkedinUrl && (
                          <a
                            href={speaker.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0A66C2] hover:underline"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            Follow on LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── CTA: Related jobs ── */}
            <div className="mt-16 rounded-[28px] border-2 border-gt-black bg-white p-8 text-center shadow-[6px_6px_0px_#000] md:p-10">
              <h3 className="font-display text-2xl font-bold">Looking for a growth role?</h3>
              <p className="mt-2 text-[15px] text-gray-500">
                Browse {page.relatedCategory.replace(/-/g, " ")} jobs with real salaries on Growth.Talent.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href={`/jobs/${page.relatedCategory}`}
                  className="rounded-full border-2 border-gt-black bg-gt-black px-7 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black"
                >
                  Browse jobs &rarr;
                </Link>
                <Link
                  href="/jobs"
                  className="rounded-full border-2 border-gt-black px-7 py-3 text-sm font-bold transition-all hover:shadow-[3px_3px_0px_#000]"
                >
                  All jobs
                </Link>
              </div>
            </div>

            {/* ── Newsletter CTA ── */}
            <div className="mt-10 rounded-2xl bg-gt-cream/40 border border-gt-cream p-8 text-center">
              <p className="font-display text-lg font-bold">Get growth insights weekly</p>
              <p className="mt-1 text-[13px] text-gray-500">Curated roles + guides. Every Monday. Free.</p>
              <form action="/api/subscribe" method="POST" className="mx-auto mt-5 flex max-w-sm gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  className="flex-1 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:border-gt-purple focus:outline-none"
                />
                <button className="shrink-0 rounded-lg bg-gt-black px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-gt-black/85">
                  Subscribe
                </button>
              </form>
            </div>

            {/* FR version link */}
            {page.frenchEquivalent && (
              <div className="mt-8 text-center">
                <Link
                  href={`/ressources/${page.frenchEquivalent}`}
                  className="text-[13px] text-gray-400 hover:text-gt-purple transition-colors"
                >
                  Lire cet article en fran&ccedil;ais &rarr;
                </Link>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  );
}
