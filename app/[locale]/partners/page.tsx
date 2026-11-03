import type { Metadata } from "next";
import { CheckCircle2, Download, Eye, Globe2, MapPinned, Search } from "lucide-react";
import Link from "next/link";
import { EngageForm } from "@/components/EngageForm";
import { ImpactHighlights } from "@/components/ImpactHighlights";
import { PageHero } from "@/components/PageHero";
import { PillarCards } from "@/components/PillarCards";
import { Reveal } from "@/components/Reveal";
import { localePath } from "@/lib/i18n/config";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";
import { documentedPartners, storyForJourney } from "@/lib/platform";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const u = getDictionary(locale).partnersUi;
  return pageMetadata(locale, "/partners", u.metaTitle, u.metaDescription);
}

const whyIcons = [Search, Eye, Globe2, MapPinned];

export default function PartnersPage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const u = t.partnersUi;
  const pdf = locale === "fr" ? "/press/proposition-de-partenariat.pdf" : "/press/partnership-proposal.pdf";

  return (
    <>
      <PageHero eyebrow={u.eyebrow} title={u.title} intro={u.intro} />

      <section className="container-page py-20" aria-labelledby="why">
        <h2 id="why" className="text-3xl sm:text-4xl">{u.whyTitle}</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {u.why.map((w, i) => {
            const Icon = whyIcons[i];
            return (
              <li key={w.title} className="card p-6">
                <Icon className="h-7 w-7 text-teal-600" aria-hidden />
                <h3 className="mt-4 text-lg">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum/75">{w.text}</p>
              </li>
            );
          })}
        </ul>
        <ImpactHighlights keys={["children-school", "first-outreach", "activities", "press"]} className="mt-10" />
      </section>

      <section className="bg-white py-20" aria-labelledby="areas">
        <div className="container-page">
          <h2 id="areas" className="text-3xl sm:text-4xl">{u.areasTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg text-plum/75">{u.areasIntro}</p>
          <div className="mt-10"><PillarCards /></div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-2" aria-labelledby="how">
        <div>
          <h2 id="how" className="text-3xl">{u.howTitle}</h2>
          <ol className="mt-8 space-y-4">
            {u.how.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-600 font-display font-semibold text-white">{i + 1}</span>
                <span className="pt-1.5 text-plum/85">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div id="partners-list" className="scroll-mt-28">
          <h2 className="text-3xl">{u.partnersTitle}</h2>
          <ul className="mt-8 space-y-3">
            {documentedPartners.map((p) => {
              const story = storyForJourney(p.journeyId);
              return (
                <li key={p.name} className="card flex items-start gap-4 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden />
                  <div>
                    <p className="font-display text-lg font-semibold">{p.name}</p>
                    <p className="text-sm text-plum/75">{u.partnerWhat[p.what]}</p>
                    {story && <Link href={localePath(locale, `/stories/${story.slug}`)} className="mt-1 inline-block text-sm font-semibold text-purple-700 hover:underline">{t.storiesUi.read}</Link>}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 rounded-2xl bg-plum p-6 text-white">
            <h3 className="text-xl">{u.proposalTitle}</h3>
            <p className="mt-2 text-sm text-white/80">{u.proposalText}</p>
            <a href={pdf} download className="btn mt-5 bg-white text-plum hover:bg-mist"><Download className="h-4 w-4" aria-hidden />{u.proposalCta}</a>
          </div>
        </div>
      </section>

      <section id="form" className="bg-mist py-20 scroll-mt-28">
        <Reveal className="container-page mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-3xl">{u.formTitle}</h2>
          <EngageForm defaultKind="partner" lockKind />
        </Reveal>
      </section>
    </>
  );
}
