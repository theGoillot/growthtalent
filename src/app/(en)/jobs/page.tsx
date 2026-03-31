import { JobsListPage, generateJobsListMetadata } from "@/components/pages/jobs-list-page";
import { MarketHomepage } from "@/components/pages/market-homepage";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Growth Marketing Jobs USA | Growth.Talent",
  description: "The #1 job board for growth professionals in the US. Top startups, real salaries, zero fluff.",
};

export default async function Page(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  const hasFilters = Object.keys(searchParams).length > 0;

  // Show homepage hero when no filters, show job list when filtering
  if (!hasFilters) {
    return <MarketHomepage locale="en" />;
  }

  return <JobsListPage locale="en" searchParams={searchParams} />;
}
