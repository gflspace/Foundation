export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** English lives at the root (no prefix); other locales are prefixed: /fr/about. */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** "/fr/about" → { locale: "fr", path: "/about" } */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const seg = pathname.split("/")[1] ?? "";
  if (isLocale(seg) && seg !== defaultLocale) {
    const rest = pathname.slice(seg.length + 1);
    return { locale: seg, path: rest || "/" };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}

export const intlLocale: Record<Locale, string> = { en: "en-US", fr: "fr-FR" };
export const ogLocale: Record<Locale, string> = { en: "en_US", fr: "fr_FR" };

export const formatNumber = (locale: Locale, n: number) => n.toLocaleString(intlLocale[locale]);
