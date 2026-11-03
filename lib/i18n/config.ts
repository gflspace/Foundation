export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/**
 * Translated URL segments. Pages are built from the internal (English) paths;
 * middleware rewrites the public French URLs onto them.
 *   /fr/projets/protection-des-jeunes  →  app/[locale]/projects/[slug] (slug "youth-welfare")
 * Keep this file free of server-only imports: middleware (edge) uses it.
 */
export const translatedSegments: Partial<Record<Locale, { section: Record<string, string>; projects: Record<string, string> }>> = {
  fr: {
    section: { projects: "projets" },
    projects: {
      "youth-welfare": "protection-des-jeunes",
      "mobile-crisis": "intervention-mobile-de-crise",
      education: "bourses-d-etudes",
      women: "autonomisation-des-femmes",
    },
  },
};

const invert = (m: Record<string, string>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [v, k]));

function splitHash(path: string): [string, string] {
  const i = path.search(/[?#]/);
  return i === -1 ? [path, ""] : [path.slice(0, i), path.slice(i)];
}

/** Internal path ("/projects/youth-welfare") → public path for that locale ("/projets/protection-des-jeunes"). */
export function publicPath(locale: Locale, internal: string): string {
  const t = translatedSegments[locale];
  if (!t) return internal;
  const [p, tail] = splitHash(internal);
  const m = p.match(/^\/projects(?:\/([^/]+))?\/?$/);
  if (!m) return internal;
  const section = `/${t.section.projects}`;
  return (m[1] ? `${section}/${t.projects[m[1]] ?? m[1]}` : section) + tail;
}

/** Public path for a locale → internal path, or null when it isn't a translated URL. */
export function internalPath(locale: Locale, pub: string): string | null {
  const t = translatedSegments[locale];
  if (!t) return null;
  const [p, tail] = splitHash(pub);
  const m = p.match(new RegExp(`^/${t.section.projects}(?:/([^/]+))?/?$`));
  if (!m) return null;
  const slugs = invert(t.projects);
  return (m[1] ? `/projects/${slugs[m[1]] ?? m[1]}` : "/projects") + tail;
}

/** English lives at the root (no prefix); other locales are prefixed and use translated segments: /fr/projets/… */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  const translated = publicPath(locale, clean);
  return translated === "/" ? `/${locale}` : `/${locale}${translated}`;
}

/** "/fr/projets/bourses-d-etudes" → { locale: "fr", path: "/projects/education" } (internal path) */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const seg = pathname.split("/")[1] ?? "";
  if (isLocale(seg) && seg !== defaultLocale) {
    const rest = pathname.slice(seg.length + 1) || "/";
    return { locale: seg, path: internalPath(seg, rest) ?? rest };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}

export const intlLocale: Record<Locale, string> = { en: "en-US", fr: "fr-FR" };
export const ogLocale: Record<Locale, string> = { en: "en_US", fr: "fr_FR" };

export const formatNumber = (locale: Locale, n: number) => n.toLocaleString(intlLocale[locale]);
