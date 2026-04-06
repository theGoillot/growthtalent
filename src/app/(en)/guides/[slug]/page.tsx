import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { GUIDE_PAGES } from "@/lib/guides";

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

export default async function GuidePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = GUIDE_PAGES[slug];
  if (!page) notFound();

  return (
    <>
      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: page.title,
            description: page.metaDescription,
            datePublished: page.publishedDate,
            author: {
              "@type": "Organization",
              name: "Growth.Talent",
              url: "https://www.growthtalent.org",
            },
            publisher: {
              "@type": "Organization",
              name: "Growth.Talent",
              url: "https://www.growthtalent.org",
            },
            mainEntityOfPage: `https://www.growthtalent.org/guides/${slug}`,
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gt-dark py-16 md:py-24">
        <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-gt-purple/8 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-60 w-60 rounded-full bg-gt-pink/6 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-6">
          <nav className="mb-8 flex items-center gap-2 text-[13px] text-white/30">
            <Link href="/jobs" className="hover:text-white/60">Jobs</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-white/60">Guides</Link>
            <span>/</span>
            <span className="text-white/50">{page.title.slice(0, 40)}...</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-6">
            {page.targetKeywords.slice(0, 4).map((kw) => (
              <span key={kw} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/40 backdrop-blur-sm">
                {kw}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {page.title}
          </h1>

          <p className="mt-6 text-[16px] leading-relaxed text-white/50">
            {page.heroSubtitle}
          </p>

          {/* Speakers */}
          {page.speakers && page.speakers.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {page.speakers.map((speaker) => (
                <div key={speaker.name} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gt-purple/20 text-[12px] font-bold text-white">
                    {speaker.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white/80">{speaker.name}</p>
                    <p className="text-[11px] text-white/30">{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="mt-6 text-[12px] text-white/20">
            Published {page.publishedDate} &bull; By {page.author}
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div
          className="prose prose-lg prose-gray max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-a:text-gt-purple prose-strong:text-gt-black prose-blockquote:border-l-gt-purple prose-blockquote:bg-gt-cream/20 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* CTA to related jobs */}
        <div className="mt-16 rounded-[28px] border-2 border-gt-black bg-white p-8 text-center shadow-[6px_6px_0px_#000]">
          <h3 className="font-display text-2xl font-bold">
            Looking for a growth role?
          </h3>
          <p className="mt-2 text-gray-500">
            Browse {page.relatedCategory.replace(/-/g, " ")} jobs with real salaries on Growth.Talent.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={`/jobs/${page.relatedCategory}`}
              className="rounded-full border-2 border-gt-black bg-gt-black px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black"
            >
              Browse {page.relatedCategory.replace(/-/g, " ")} jobs &rarr;
            </Link>
            <Link
              href="/jobs"
              className="rounded-full border-2 border-gt-black px-6 py-3 text-sm font-bold transition-all hover:shadow-[3px_3px_0px_#000]"
            >
              All jobs
            </Link>
          </div>
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
    </>
  );
}
