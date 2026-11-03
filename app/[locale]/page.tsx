import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { IdentityMatrix } from "@/components/IdentityMatrix";
import { ImpactMap } from "@/components/ImpactMap";
import { Journey } from "@/components/Journey";
import { PillarCards } from "@/components/PillarCards";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialProof } from "@/components/SocialProof";
import { StoryFilm } from "@/components/StoryFilm";
import { VideoFeature } from "@/components/VideoFeature";
import { featuredVideos, projectSlugs } from "@/lib/content";
import { localePath } from "@/lib/i18n/config";
import { alternatesFor, getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  return { alternates: alternatesFor(pageLocale(props), "/") };
}

/**
 * Home: hero · story film · press strip · the five programmes · our films · map · latest journey moments ·
 * founder's two stages · what drives us · CTA. The full media library lives on /media.
 */
export default function HomePage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const h = t.home;
  return (
    <>
      <Hero />
      <StoryFilm />
      <SocialProof />

      <section className="bg-white py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={h.programmesEyebrow} title={h.programmesTitle} />
            <Link href={localePath(locale, "/projects")} className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 hover:underline">
              {t.common.allProgrammes} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectSlugs.map((slug, i) => (
              <Reveal key={slug} delay={i * 0.06} className="h-full"><ProjectCard slug={slug} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bubbles bg-mist py-24" aria-labelledby="videos-title">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">{h.videosEyebrow}</p>
              <h2 id="videos-title" className="mt-3 text-3xl sm:text-4xl">{h.videosTitle}</h2>
              <p className="mt-4 text-lg text-plum/75">{h.videosIntro}</p>
            </div>
            <Link href={localePath(locale, "/media")} className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 hover:underline">
              {h.seeAllMedia} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredVideos.filter((v) => v.home).map((v, i) => (
              <Reveal key={v.id} delay={i * 0.08}>
                <VideoFeature id={v.id} title={v.title[locale]} />
                <Link href={localePath(locale, `/projects/${v.programme}`)} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:underline">
                  {t.projects[v.programme].title} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ImpactMap />

      <section className="py-24" aria-labelledby="journey-teaser">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">{t.journey.eyebrow}</p>
          <h2 id="journey-teaser" className="mt-3 text-3xl sm:text-4xl">{t.journey.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-plum/75">{t.journey.intro}</p>
          <div className="mt-10"><Journey limit={3} showFilters={false} /></div>
        </div>
      </section>

      <IdentityMatrix />

      <section className="container-page py-24">
        <SectionHeading eyebrow={h.pillarsEyebrow} title={h.pillarsTitle} intro={h.pillarsIntro} />
        <div className="mt-12"><PillarCards /></div>
      </section>

      <CtaBand />
    </>
  );
}
