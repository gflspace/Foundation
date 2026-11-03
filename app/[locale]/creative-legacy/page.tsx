import type { Metadata } from "next";
import { Award, Clapperboard, Globe2, Users } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { FilmTimeline } from "@/components/FilmTimeline";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { films, profiles } from "@/lib/content";
import { fill } from "@/lib/i18n/format";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const l = getDictionary(locale).legacy;
  return pageMetadata(locale, "/creative-legacy", l.metaTitle, l.metaDescription);
}

const advocacyIcons = [Clapperboard, Users, Globe2];

export default function CreativeLegacyPage(props: LocaleParams) {
  const t = getDictionary(pageLocale(props));
  const l = t.legacy;
  const first = Math.min(...films.map((f) => f.year));
  return (
    <>
      <PageHero eyebrow={l.eyebrow} title={l.title} intro={fill(l.intro, { count: films.length, year: first })} />

      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow={l.studioEyebrow} title={l.studioTitle} intro={l.studioIntro} />
            <div className="card mt-8 p-6">
              <h3 className="flex items-center gap-2 font-sans text-sm font-semibold"><Award className="h-4 w-4 text-gold" aria-hidden />{l.awards}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {t.awards.map((a) => (
                  <li key={a.title} className="flex gap-3"><span className="w-16 shrink-0 font-semibold text-gold-600">{a.year}</span>{a.title}</li>
                ))}
              </ul>
            </div>
            <a href={profiles.imdb} target="_blank" rel="noopener noreferrer" className="btn-outline mt-6">{l.imdb}</a>
          </div>
        </div>
        <div className="lg:col-span-8">
          <h2 className="sr-only">{t.films.timelineHeading}</h2>
          <FilmTimeline />
        </div>
      </section>

      <section className="bg-navy py-24 text-white">
        <div className="container-page">
          <SectionHeading tone="dark" eyebrow={l.advocacyEyebrow} title={l.advocacyTitle} align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {l.advocacy.map(({ title, text }, i) => {
              const Icon = advocacyIcons[i];
              return (
                <Reveal key={title} delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
                    <Icon className="h-7 w-7 text-gold-400" aria-hidden />
                    <h3 className="mt-4 text-xl">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
