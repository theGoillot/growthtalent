import { SalaryDetailPage, generateSalaryPageMetadata } from "@/components/pages/salary-page";
import type { Metadata } from "next";

export const revalidate = 86400; // 24h

export async function generateMetadata(props: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await props.params;
  return generateSalaryPageMetadata(role);
}

export default async function Page(props: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await props.params;
  return <SalaryDetailPage slug={role} />;
}
