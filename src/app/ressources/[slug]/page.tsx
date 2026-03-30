import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CONTENT_PAGES } from "@/lib/content";
import { getDictionary } from "@/dictionaries";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export async function generateStaticParams() {
  return Object.keys(CONTENT_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const page = CONTENT_PAGES[slug];
  if (!page) return { title: "Not Found" };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `https://www.growthtalent.org/ressources/${slug}`,
    },
  };
}

export default async function RessourcePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = CONTENT_PAGES[slug];
  if (!page) notFound();

  const dict = getDictionary("fr");

  return (
    <>
      <Header dict={dict} locale="fr" />

      {/* Hero */}
      <section className="w-full bg-gt-cream py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gt-black">Accueil</Link>
            <span>/</span>
            <Link href="/emplois" className="hover:text-gt-black">Emplois</Link>
            <span>/</span>
            <span className="text-gt-black">Ressources</span>
          </nav>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {page.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            {page.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 py-12">
        <div
          className="prose prose-lg prose-gray max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-gt-purple prose-strong:text-gt-black"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* CTA to related jobs */}
        <div className="mt-12 rounded-2xl border-2 border-gt-black bg-gt-purple-light/20 p-8 text-center">
          <h3 className="font-display text-2xl font-bold">
            Tu cherches un poste en {page.title.toLowerCase().includes("head") ? "leadership growth" : "growth"} ?
          </h3>
          <p className="mt-2 text-gray-600">
            D&eacute;couvre les offres disponibles sur Growth.Talent.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={`/emplois/${page.relatedCategory}`}
              className="rounded-full border-2 border-gt-black bg-gt-black px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-gt-black"
            >
              Voir les offres &rarr;
            </Link>
            <Link
              href="/emplois"
              className="rounded-full border-2 border-gt-black px-6 py-3 text-sm font-bold transition-all hover:shadow-[3px_3px_0px_#000]"
            >
              Tous les emplois
            </Link>
          </div>
        </div>
      </article>

      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: page.title,
            description: page.metaDescription,
            publisher: {
              "@type": "Organization",
              name: "Growth.Talent",
              url: "https://www.growthtalent.org",
            },
            mainEntityOfPage: `https://www.growthtalent.org/ressources/${slug}`,
          }),
        }}
      />

      <Footer dict={dict} />
    </>
  );
}
