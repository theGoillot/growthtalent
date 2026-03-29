import { JobsListPage, generateJobsListMetadata } from "@/components/pages/jobs-list-page";

export const revalidate = 1800;
export const metadata = generateJobsListMetadata("es");

export default async function Page(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  return <JobsListPage locale="es" searchParams={searchParams} />;
}
