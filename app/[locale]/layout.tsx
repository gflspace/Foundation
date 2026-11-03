import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { DonateProvider } from "@/components/DonateProvider";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/components/I18nProvider";
import { Navbar } from "@/components/Navbar";
import { site } from "@/lib/content";
import { isLocale, locales, ogLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor, getDictionary } from "@/lib/i18n";
import { founderJsonLd, organizationJsonLd } from "@/lib/jsonld";
import "../globals.css";

// Geometric sans to echo the rounded lettering of the official logo.
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const noindex = process.env.NEXT_PUBLIC_NOINDEX === "true";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale;
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${t.meta.siteName} — ${t.meta.tagline}`, template: `%s · ${t.meta.siteName}` },
    description: t.meta.description,
    keywords: t.meta.keywords,
    openGraph: {
      type: "website",
      siteName: t.meta.siteName,
      title: t.meta.siteName,
      description: t.meta.description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title: t.meta.siteName, description: t.meta.description },
    alternates: alternatesFor(locale, "/"),
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export const viewport: Viewport = { themeColor: "#0F172A", width: "device-width", initialScale: 1 };

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const t = getDictionary(locale);
  // Legal texts render on the server only; keep them out of the client payload.
  const { legal: _legal, ...clientT } = t;
  return (
    <html lang={locale} className={`${poppins.variable} ${jakarta.variable} ${inter.variable}`}>
      <body className="font-sans">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd(locale, t), founderJsonLd(t)]) }}
        />
        <I18nProvider locale={locale} t={clientT}>
          <DonateProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </DonateProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
