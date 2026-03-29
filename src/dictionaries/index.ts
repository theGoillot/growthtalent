import { en, type Dictionary } from "./en";
import { fr } from "./fr";
import { es } from "./es";
import { pt } from "./pt";

export type Locale = "en" | "fr" | "es" | "pt";

const dictionaries: Record<Locale, Dictionary> = { en, fr, es, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export type { Dictionary };
