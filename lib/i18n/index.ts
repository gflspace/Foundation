import "server-only";
import en from "./dictionaries/en";
import fr from "./dictionaries/fr";
import { localePath, locales, ogLocale, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";
import { site } from "@/lib/content";

const dictionaries: Record<Locale, Dictionary> = { en, fr };
export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

/** canonical + hreflang alternates for a locale-agnostic path like "/about" */
export function alternatesFor(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localePath(l, path);
  languages["x-default"] = localePath("en", path);
  return { canonical: localePath(locale, path), languages };
}

/** Standard page metadata with localized canonical, hreflang and Open Graph. */
export function pageMetadata(locale: Locale, path: string, title: string, description: string) {
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: { title, description, url: `${site.url}${localePath(locale, path)}`, locale: ogLocale[locale] },
  };
}

export type LocaleParams = { params: { locale: string } };
/** Pages sit under the validated [locale] layout, so the param is always a Locale. */
export const pageLocale = ({ params }: LocaleParams) => params.locale as Locale;
