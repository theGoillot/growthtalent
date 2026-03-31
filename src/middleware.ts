import { NextRequest, NextResponse } from "next/server";

const LOCALE_PATHS: Record<string, string> = {
  fr: "/emplois",
  es: "/empleos",
  pt: "/empregos",
  en: "/jobs",
};

function detectLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return "en";
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q] = lang.trim().split(";q=");
      return { code: code.split("-")[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of languages) {
    if (code in LOCALE_PATHS) return code;
  }
  return "en";
}

export function middleware(request: NextRequest) {
  // Only redirect the root path
  if (request.nextUrl.pathname !== "/") return NextResponse.next();

  const locale = detectLocale(request.headers.get("accept-language"));
  const target = LOCALE_PATHS[locale] ?? "/jobs";

  return NextResponse.redirect(new URL(target, request.url), 307);
}

export const config = {
  matcher: ["/"],
};
