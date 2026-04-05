import { RemoteJobsPage, generateRemoteJobsMetadata } from "@/components/pages/remote-jobs-page";
import type { Metadata } from "next";

export const revalidate = 1800;
export const metadata: Metadata = generateRemoteJobsMetadata("en");

export default async function Page(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  return <RemoteJobsPage locale="en" searchParams={searchParams} />;
}
