import { JobsListPage, generateJobsListMetadata } from "@/components/pages/jobs-list-page";
import type { Metadata } from "next";

export const revalidate = 1800;

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await props.params;
  return generateJobsListMetadata("fr", category);
}

export default async function Page(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const [{ category }, searchParams] = await Promise.all([props.params, props.searchParams]);
  return <JobsListPage locale="fr" category={category} searchParams={searchParams} />;
}
