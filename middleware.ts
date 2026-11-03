import { NextResponse, type NextRequest } from "next/server";
import { internalPath, localePath, locales, type Locale } from "@/lib/i18n/config";

/**
 * English is served at the root ("/about"), other locales under a prefix ("/fr/about").
 * Pages live under app/[locale]/ with internal English paths, so:
 *  - un-prefixed paths are rewritten to /en/…, and explicit /en/… URLs redirect to the clean root path;
 *  - translated French URLs (/fr/projets/protection-des-jeunes) are rewritten to the internal page
 *    (/fr/projects/back-to-school), and the untranslated form redirects to the translated one.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  for (const locale of locales.filter((l) => l !== "en") as Locale[]) {
    if (pathname !== `/${locale}` && !pathname.startsWith(`/${locale}/`)) continue;
    const rest = pathname.slice(locale.length + 1) || "/";

    // Old/untranslated URL → permanent redirect to the translated one.
    const canonical = localePath(locale, rest);
    if (canonical !== pathname && canonical !== `/${locale}` + rest.replace(/\/$/, "")) {
      url.pathname = canonical;
      return NextResponse.redirect(url, 308);
    }

    const internal = internalPath(locale, rest);
    if (internal) {
      url.pathname = `/${locale}${internal}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Metadata routes Next generates under /en (e.g. the Open Graph image) are served as-is.
  if (pathname.startsWith("/en/opengraph-image")) return NextResponse.next();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, metadata routes and any file with an extension.
  matcher: ["/((?!api|_next|sitemap.xml|robots.txt|icon.svg|press/|images/|media/|.*\\..*).*)"],
};
