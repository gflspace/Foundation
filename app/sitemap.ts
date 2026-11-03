import type { MetadataRoute } from "next";
import { projectSlugs, site } from "@/lib/content";
import { storySlugs } from "@/lib/platform";
import { localePath, locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["/", "/about", "/founder", "/projects", "/stories", "/impact", "/accountability", "/partners", "/get-involved", "/creative-legacy", "/media", "/donate", "/privacy", "/donation-policy", ...projectSlugs.map((s) => `/projects/${s}`), ...storySlugs.map((s) => `/stories/${s}`)];
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
