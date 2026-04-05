import { RemoteJobsPage, generateRemoteJobsMetadata } from "@/components/pages/remote-jobs-page";
import type { Metadata } from "next";

export const revalidate = 1800;

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await props.params;
  return generateRemoteJobsMetadata("en", category);
}

export default async function Page(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const [{ category }, searchParams] = await Promise.all([props.params, props.searchParams]);
  return <RemoteJobsPage locale="en" category={category} searchParams={searchParams} />;
}
