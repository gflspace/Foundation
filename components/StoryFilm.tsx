"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { featuredVideos } from "@/lib/content";
import { useI18n } from "./I18nProvider";
import { VideoFeature } from "./VideoFeature";

/** Full-width "Our story" band: the Foundation's introduction film at a proper 16:9 size, with context beside it. */
export function StoryFilm() {
  const { t, locale, href } = useI18n();
  const h = t.hero;
  const story = featuredVideos.find((v) => v.id === "G9f7qKhNiwU") ?? featuredVideos[0];
  return (
    <section id="our-story" className="relative isolate scroll-mt-28 overflow-hidden bg-plum py-20 text-white sm:py-24" aria-labelledby="story-title">
      <span aria-hidden className="absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full border-[18px] border-teal/20" />
      <span aria-hidden className="absolute -bottom-20 right-10 -z-10 h-56 w-56 rounded-full bg-purple/30 blur-2xl" />
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-8">
          <VideoFeature id={story.id} title={story.title[locale]} className="ring-1 ring-white/15" />
        </div>
        <div className="lg:col-span-4">
          <p className="eyebrow text-teal-300">{t.home2.missionEyebrow}</p>
          <h2 id="story-title" className="mt-3 text-3xl sm:text-4xl">{t.home2.missionTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80">{t.home2.missionText}</p>
          <p className="mt-4 text-sm text-white/65">{story.title[locale]} · SYNDY EMADE TV</p>
          <Link href={href("/founder")} className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-300 underline-offset-4 hover:underline">
            {t.home2.missionCta} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
