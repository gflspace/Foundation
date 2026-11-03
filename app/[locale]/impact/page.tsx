import type { Metadata } from "next";
import { ArrowRight, Hourglass } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ImpactDashboard } from "@/components/ImpactDashboard";
import { ImpactHighlights } from "@/components/ImpactHighlights";
import { ImpactMap } from "@/components/ImpactMap";
import { PageHero } from "@/components/PageHero";
import { localePath } from "@/lib/i18n/config";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";
import { indicators } from "@/lib/platform";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const u = getDictionary(locale).impactUi;
  return pageMetadata(locale, "/impact", u.metaTitle, u.metaDescription);
}

export default function ImpactPage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const u = t.impactUi;
  const outcome = indicators.filter((i) => i.story).map((i) => i.key);
  const reach = indicators.filter((i) => !i.story).map((i) => i.key);

  return (
    <>
      <PageHero eyebrow={u.eyebrow} title={u.title} intro={u.intro} />
      <section className="container-page py-20" aria-label={u.title}>
        <ImpactHighlights keys={outcome} className="lg:grid-cols-5" />
        <ImpactHighlights keys={reach} className="mt-4 lg:grid-cols-5" />
        <p className="mt-6 max-w-3xl text-sm text-plum/70">{u.method}</p>
      </section>

      <section className="bg-mist py-20" aria-labelledby="by-year">
        <div className="container-page">
          <h2 id="by-year" className="text-3xl">{u.byYearTitle}</h2>
          <div className="mt-8"><ImpactDashboard /></div>
          <Link href={localePath(locale, "/accountability")} className="btn-outline mt-10">{t.nav2.accountability} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </div>
      </section>

      <section className="container-page py-20" aria-labelledby="pending">
        <div className="card flex flex-col gap-6 p-8 sm:flex-row">
          <Hourglass className="h-10 w-10 shrink-0 text-purple" aria-hidden />
          <div>
            <h2 id="pending" className="text-2xl">{u.pendingTitle}</h2>
            <p className="mt-2 text-plum/75">{u.pendingText}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {u.pending.map((p) => <li key={p} className="rounded-xl border border-dashed border-plum/20 px-4 py-3 text-sm text-plum/80">{p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <ImpactMap />
      <CtaBand />
    </>
  );
}
