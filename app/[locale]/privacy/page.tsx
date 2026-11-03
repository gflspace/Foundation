import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";

// TODO(legal): have counsel review before launch, and add the Foundation's registered name and address.
export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const p = getDictionary(locale).legal.privacy;
  return pageMetadata(locale, "/privacy", p.metaTitle, p.metaDescription);
}

export default function PrivacyPage(props: LocaleParams) {
  const t = getDictionary(pageLocale(props));
  return <LegalPage t={t} doc={t.legal.privacy} />;
}
