import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

function detectLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return "en";
  const lang = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();
  if (lang === "fr") return "fr";
  if (lang === "es") return "es";
  if (lang === "pt") return "pt";
  return "en";
}

const PATHS: Record<string, string> = {
  en: "/jobs",
  fr: "/emplois",
  es: "/empleos",
  pt: "/empregos",
};

export default async function RootPage() {
  const headersList = await headers();
  const locale = detectLocale(headersList.get("accept-language"));
  redirect(PATHS[locale] ?? "/jobs");
}
