import { NextResponse, type NextRequest } from "next/server";

/**
 * English is served at the root ("/about"), French under "/fr" ("/fr/about").
 * Internally every page lives under app/[locale]/, so un-prefixed paths are
 * rewritten to /en/…, and explicit /en/… URLs redirect to the clean root path.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/fr" || pathname.startsWith("/fr/")) return NextResponse.next();

  // Metadata routes Next generates under /en (e.g. the Open Graph image) are served as-is.
  if (pathname.startsWith("/en/opengraph-image")) return NextResponse.next();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, metadata routes and any file with an extension.
  matcher: ["/((?!api|_next|sitemap.xml|robots.txt|icon.svg|press/|images/|media/|.*\\..*).*)"],
};
