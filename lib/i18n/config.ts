export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/**
 * Translated URL segments. Pages are built from the internal (English) paths;
 * middleware rewrites the public translated URLs onto them, e.g.
 *   /fr/projets/rentree-scolaire  →  app/[locale]/projects/[slug] (slug "back-to-school")
 *   /fr/faire-un-don/merci             →  app/[locale]/donate/thank-you
 * Keep this file free of server-only imports: middleware (edge) uses it.
 */
type SegmentMap = { sections: Record<string, string>; children: Record<string, Record<string, string>> };

export const translatedSegments: Partial<Record<Locale, SegmentMap>> = {
  fr: {
    sections: {
      about: "a-propos",
      projects: "projets",
      "creative-legacy": "heritage-creatif",
      media: "medias",
      donate: "faire-un-don",
      privacy: "confidentialite",
      "donation-policy": "conditions-de-don",
    },
    children: {
      projects: {
        "back-to-school": "rentree-scolaire",
        "displaced-families": "familles-deplacees",
        "christmas-outreach": "noel-solidaire",
        "child-protection": "protection-de-l-enfance",
        women: "femmes-et-partenariats",
      },

      donate: { "thank-you": "merci" },
    },
  },
};

const invert = (m: Record<string, string>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [v, k]));

function splitTail(path: string): [string[], string] {
  const i = path.search(/[?#]/);
  const [p, tail] = i === -1 ? [path, ""] : [path.slice(0, i), path.slice(i)];
  return [p.split("/").filter(Boolean), tail];
}

/** Internal path ("/donate/thank-you") → public path for that locale ("/faire-un-don/merci"). */
export function publicPath(locale: Locale, internal: string): string {
  const t = translatedSegments[locale];
  if (!t) return internal;
  const [segs, tail] = splitTail(internal);
  const section = segs[0] && t.sections[segs[0]];
  if (!section) return internal;
  const out = [section];
  if (segs[1]) out.push(t.children[segs[0]]?.[segs[1]] ?? segs[1]);
  out.push(...segs.slice(2));
  return "/" + out.join("/") + tail;
}

/** Public path for a locale → internal path, or null when it isn't a translated URL. */
export function internalPath(locale: Locale, pub: string): string | null {
  const t = translatedSegments[locale];
  if (!t) return null;
  const [segs, tail] = splitTail(pub);
  const section = segs[0] && invert(t.sections)[segs[0]];
  if (!section) return null;
  const out = [section];
  if (segs[1]) out.push(invert(t.children[section] ?? {})[segs[1]] ?? segs[1]);
  out.push(...segs.slice(2));
  return "/" + out.join("/") + tail;
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
