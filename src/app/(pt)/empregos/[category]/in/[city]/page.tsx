import { CityJobsPage, generateCityJobsMetadata } from "@/components/pages/city-jobs-page";
import type { Metadata } from "next";

export const revalidate = 1800;

export async function generateMetadata(props: {
  params: Promise<{ category: string; city: string }>;
}): Promise<Metadata> {
  const { category, city } = await props.params;
  return generateCityJobsMetadata("pt", category, city);
}

export default async function Page(props: {
  params: Promise<{ category: string; city: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const [{ category, city }, searchParams] = await Promise.all([props.params, props.searchParams]);
  return <CityJobsPage locale="pt" category={category} citySlug={city} searchParams={searchParams} />;
}
