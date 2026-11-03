import type { Metadata } from "next";
import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import { localePath } from "@/lib/i18n/config";
import { getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  return { title: getDictionary(pageLocale(props)).thankYou.metaTitle, robots: { index: false } };
}

export default function ThankYouPage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-navy px-4 pb-16 pt-32 text-center text-white">
      <div aria-hidden className="grain absolute inset-0" />
      <div className="relative max-w-lg">
        <HeartHandshake className="mx-auto h-14 w-14 text-violet-400" aria-hidden />
        <h1 className="mt-6 text-4xl">{t.thankYou.title}</h1>
        <p className="mt-4 text-lg text-white/75">{t.thankYou.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={localePath(locale, "/projects")} className="btn-gold">{t.thankYou.see}</Link>
          <Link href={localePath(locale, "/")} className="btn border border-white/25 text-white hover:bg-white/10">{t.common.backHome}</Link>
        </div>
      </div>
    </section>
  );
}
