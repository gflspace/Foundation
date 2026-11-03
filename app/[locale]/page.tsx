import { ArrowRight, Award } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FilmTimeline } from "@/components/FilmTimeline";
import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { PillarCards } from "@/components/PillarCards";
import { Portrait } from "@/components/Portrait";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projectSlugs } from "@/lib/content";
import { localePath } from "@/lib/i18n/config";
import { alternatesFor, getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  return { alternates: alternatesFor(pageLocale(props), "/") };
}

export default function HomePage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const h = t.home;
  const href = (p: string) => localePath(locale, p);
  return (
    <>
      <Hero />
      <ImpactStrip />

      <section className="container-page py-24">
        <SectionHeading eyebrow={h.pillarsEyebrow} title={h.pillarsTitle} intro={h.pillarsIntro} />
        <div className="mt-12"><PillarCards /></div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={h.programmesEyebrow} title={h.programmesTitle} />
            <Link href={href("/projects")} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline">
              {t.common.allProgrammes} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projectSlugs.map((slug, i) => (
              <Reveal key={slug} delay={i * 0.08} className="h-full"><ProjectCard slug={slug} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid items-center gap-12 py-24 lg:grid-cols-2">
        <Reveal>
          <Portrait className="mx-auto max-w-md" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">{h.founderEyebrow}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">{t.founder.name}</h2>
          <p className="mt-2 text-sm text-navy/65">{t.founder.roles.join(" · ")}</p>
          <p className="mt-6 text-lg leading-relaxed text-navy/75">{t.founder.summary}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.awards.slice(0, 4).map((a) => (
              <li key={a.title} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card ring-1 ring-navy/5">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <span className="text-sm"><span className="font-semibold">{a.year}</span> — {a.title}</span>
              </li>
            ))}
          </ul>
          <Link href={href("/about")} className="btn-outline mt-8">{h.readStory}</Link>
        </Reveal>
      </section>

      <section className="bg-navy py-24 text-white">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading tone="dark" eyebrow={h.legacyEyebrow} title={h.legacyTitle} intro={h.legacyIntro} />
            <Link href={href("/creative-legacy")} className="btn-gold mt-8">{h.fullFilmography}</Link>
          </div>
          <div className="rounded-3xl bg-ivory p-6 text-navy sm:p-10 lg:col-span-8">
            <FilmTimeline limit={6} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
