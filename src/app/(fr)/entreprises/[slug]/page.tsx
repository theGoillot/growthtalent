import { CompanyPage, generateCompanyMetadata } from "@/components/pages/company-page";
import type { Metadata } from "next";

export const revalidate = 1800;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  return generateCompanyMetadata("fr", slug);
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  return <CompanyPage locale="fr" slug={slug} />;
}
