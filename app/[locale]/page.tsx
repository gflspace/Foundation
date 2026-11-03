import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { IdentityMatrix } from "@/components/IdentityMatrix";
import { ImpactMap } from "@/components/ImpactMap";
import { PillarCards } from "@/components/PillarCards";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialProof } from "@/components/SocialProof";
import { projectSlugs } from "@/lib/content";
import { localePath } from "@/lib/i18n/config";
import { alternatesFor, getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  return { alternates: alternatesFor(pageLocale(props), "/") };
}

/**
 * Home — module order follows the enhancement spec §5.1:
 * 01 hero stage · social proof · pillars & programmes · 02 dual-identity matrix · 03 impact map · CTA.
 * Module 04 (media engine) lives on /media; 05 (micro-donations) in the donate modal and /donate.
 */
export default function HomePage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const h = t.home;
  return (
    <>
      <Hero />
      <SocialProof />

      <section className="container-page py-24">
        <SectionHeading eyebrow={h.pillarsEyebrow} title={h.pillarsTitle} intro={h.pillarsIntro} />
        <div className="mt-12"><PillarCards /></div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={h.programmesEyebrow} title={h.programmesTitle} />
            <Link href={localePath(locale, "/projects")} className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:underline">
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

      <IdentityMatrix />
      <ImpactMap />
      <CtaBand />
    </>
  );
}
