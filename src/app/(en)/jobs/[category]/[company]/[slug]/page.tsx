import { JobDetailPage, generateJobDetailMetadata } from "@/components/pages/job-detail-page";
import type { Metadata } from "next";

export const revalidate = 1800;

export async function generateMetadata(props: {
  params: Promise<{ category: string; company: string; slug: string }>;
}): Promise<Metadata> {
  const { company, slug } = await props.params;
  return generateJobDetailMetadata("en", company, slug);
}

export default async function Page(props: {
  params: Promise<{ category: string; company: string; slug: string }>;
}) {
  const { category, company, slug } = await props.params;
  return <JobDetailPage locale="en" category={category} companySlug={company} jobSlug={slug} />;
}
