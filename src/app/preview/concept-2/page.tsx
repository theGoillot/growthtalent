import type { Metadata } from "next";
import { MarketHomepage } from "@/components/pages/market-homepage";

export const metadata: Metadata = { title: "Concept 2: The Magazine | Growth.Talent", robots: { index: false } };

export default function Concept2Page() {
  return <MarketHomepage locale="en" />;
}
