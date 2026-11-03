import type { Metadata } from "next";
import { ArrowRight, BookOpen, Compass, Eye, ShieldCheck, Target } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Journey } from "@/components/Journey";
import { PillarCards } from "@/components/PillarCards";
import { PageHero } from "@/components/PageHero";
import { PressHighlights } from "@/components/PressHighlights";
import { Portrait } from "@/components/Portrait";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { gamma } from "@/lib/content";
import { localePath } from "@/lib/i18n/config";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const a = getDictionary(locale).about;
  return pageMetadata(locale, "/about", a.metaTitle, a.metaDescription);
}

const governanceIcons = [ShieldCheck, BookOpen, Compass];

export default function AboutPage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const a = t.about;
  const f = t.founder;
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} intro={a.intro} />

      <section className="container-page grid items-center gap-12 py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Portrait priority />
        </Reveal>
        <Reveal className="lg:col-span-8">
          <p className="eyebrow">{a.founderEyebrow}</p>
          <h2 className="mt-3 text-4xl">{f.name}</h2>
          <p className="mt-6 text-lg leading-relaxed text-plum/80">{t.founderUi.motivationText}</p>
          <Link href={localePath(locale, "/founder")} className="btn-teal mt-8">{t.home2.missionCta} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </Reveal>
      </section>

      <section className="bg-mist py-24" aria-labelledby="history-title">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">{t.journey.eyebrow}</p>
          <h2 id="history-title" className="mt-3 text-3xl sm:text-4xl">{t.journey.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-plum/75">{t.journey.intro}</p>
          <div className="mt-10"><Journey limit={5} showFilters={false} /></div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading eyebrow={a.foundationEyebrow} title={a.foundationTitle} align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="card h-full bg-plum p-8 text-white">
                <Target className="h-8 w-8 text-teal-400" aria-hidden />
                <h3 className="mt-4 text-2xl">{a.missionTitle}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{a.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="card h-full bg-purple-700 p-8 text-white">
                <Eye className="h-8 w-8 text-teal-400" aria-hidden />
                <h3 className="mt-4 text-2xl">{a.visionTitle}</h3>
                <p className="mt-3 leading-relaxed text-white">{a.vision}</p>
              </div>
            </Reveal>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {a.governance.map(({ title, text }, i) => {
              const Icon = governanceIcons[i];
              return (
                <Reveal key={title} delay={i * 0.08} className="h-full">
                  <div className="card h-full p-6">
                    <Icon className="h-6 w-6 text-purple" aria-hidden />
                    <h3 className="mt-3 font-sans text-base font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-plum/65">{text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          {gamma.aboutDeck && (
            <div className="mt-12 overflow-hidden rounded-2xl shadow-card ring-1 ring-plum/5">
              <iframe src={gamma.aboutDeck} title={a.deckTitle} className="aspect-video w-full" allow="fullscreen" loading="lazy" />
            </div>
          )}
        </div>
      </section>
      <section className="container-page py-24">
        <SectionHeading eyebrow={t.home2.focusEyebrow} title={t.home2.focusTitle} intro={t.home2.focusIntro} />
        <div className="mt-12"><PillarCards /></div>
      </section>
      <PressHighlights ids={["yafrica-2021-netflix", "cameroonceo-2022-profile", "dcoded-2017-best-actress"]} title={t.media.highlightsAbout} className="py-24" />
      <CtaBand />
    </>
  );
}
