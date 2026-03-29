import type { Locale } from "@/dictionaries";
import { getDictionary } from "@/dictionaries";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function createLocaleLayout(locale: Locale) {
  return function LocaleLayout({ children }: { children: React.ReactNode }) {
    const dict = getDictionary(locale);
    return (
      <>
        <Header dict={dict} locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
      </>
    );
  };
}
