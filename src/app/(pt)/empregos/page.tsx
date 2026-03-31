import { JobsListPage } from "@/components/pages/jobs-list-page";
import { MarketHomepage } from "@/components/pages/market-homepage";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Empregos Growth Marketing Brasil | Growth.Talent",
  description: "Vagas growth nas melhores startups do Brasil e empresas internacionais com trabalho remoto.",
};

export default async function Page(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  const hasFilters = Object.keys(searchParams).length > 0;

  if (!hasFilters) {
    return <MarketHomepage locale="pt" />;
  }

  return <JobsListPage locale="pt" searchParams={searchParams} />;
}
