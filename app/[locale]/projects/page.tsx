import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Journey } from "@/components/Journey";
import { PageHero } from "@/components/PageHero";
import { PillarCards } from "@/components/PillarCards";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projectSlugs } from "@/lib/content";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const p = getDictionary(locale).projectsPage;
  return pageMetadata(locale, "/projects", p.metaTitle, p.metaDescription);
}

export default function ProjectsPage(props: LocaleParams) {
  const t = getDictionary(pageLocale(props));
  const p = t.projectsPage;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} />
      <section className="container-page py-24" aria-labelledby="programmes-heading">
        <h2 id="programmes-heading" className="sr-only">{p.listHeading}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectSlugs.map((slug, i) => (
            <Reveal key={slug} delay={i * 0.08} className="h-full"><ProjectCard slug={slug} /></Reveal>
          ))}
        </div>
      </section>
      <section id="journey" className="scroll-mt-24 bg-mist py-24" aria-labelledby="journey-heading">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">{t.journey.eyebrow}</p>
          <h2 id="journey-heading" className="mt-3 text-3xl sm:text-4xl">{t.journey.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-plum/75">{t.journey.intro}</p>
          <div className="mt-10"><Journey /></div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading eyebrow={p.frameworkEyebrow} title={p.frameworkTitle} />
          <div className="mt-12"><PillarCards /></div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
