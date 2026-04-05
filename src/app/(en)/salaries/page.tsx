import { SalaryHubPage, generateSalaryHubMetadata } from "@/components/pages/salary-page";
import type { Metadata } from "next";

export const metadata: Metadata = generateSalaryHubMetadata();

export default function Page() {
  return <SalaryHubPage />;
}
