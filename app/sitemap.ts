import type { MetadataRoute } from "next";
import { projectSlugs, site } from "@/lib/content";
import { localePath, locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["/", "/about", "/projects", "/creative-legacy", "/media", "/donate", "/privacy", "/donation-policy", ...projectSlugs.map((s) => `/projects/${s}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}${localePath(locale, path)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.startsWith("/projects/") ? 0.7 : 0.8,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localePath(l, path)}`])) },
    })),
  );
}
