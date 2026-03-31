import { JobsListPage } from "@/components/pages/jobs-list-page";
import { MarketHomepage } from "@/components/pages/market-homepage";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Empleos Growth Marketing LatAm | Growth.Talent",
  description: "Empleos growth en las mejores startups de Latinoam\u00e9rica y empresas de EEUU y Europa que contratan remoto.",
};

export default async function Page(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  const hasFilters = Object.keys(searchParams).length > 0;

  if (!hasFilters) {
    return <MarketHomepage locale="es" />;
  }

  return <JobsListPage locale="es" searchParams={searchParams} />;
}
