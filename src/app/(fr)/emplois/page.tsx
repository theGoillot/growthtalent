import { JobsListPage } from "@/components/pages/jobs-list-page";
import { MarketHomepage } from "@/components/pages/market-homepage";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Emplois Growth Marketing France | Growth.Talent",
  description: "Le mouvement qui fait briller les carri\u00e8res growth. Les meilleures offres en France, salaires affich\u00e9s, sans d\u00e9tour.",
};

export default async function Page(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  const hasFilters = Object.keys(searchParams).length > 0;

  if (!hasFilters) {
    return <MarketHomepage locale="fr" />;
  }

  return <JobsListPage locale="fr" searchParams={searchParams} />;
}
