import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";

// TODO(legal): confirm tax-deductibility wording for each country before launch.
export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const p = getDictionary(locale).legal.donation;
  return pageMetadata(locale, "/donation-policy", p.metaTitle, p.metaDescription);
}

export default function DonationPolicyPage(props: LocaleParams) {
  const t = getDictionary(pageLocale(props));
  return <LegalPage t={t} doc={t.legal.donation} />;
}
