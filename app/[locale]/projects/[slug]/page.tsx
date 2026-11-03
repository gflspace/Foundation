import type { Metadata } from "next";
import { CheckCircle2, MapPin, Sprout } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtPanel } from "@/components/ArtPanel";
import { DonateButton } from "@/components/DonateProvider";
import { Journey } from "@/components/Journey";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { VideoFeature } from "@/components/VideoFeature";
import { featuredVideos, journey, projectMeta, type ProjectSlug } from "@/lib/content";
import { localePath, locales, type Locale } from "@/lib/i18n/config";
import { fill } from "@/lib/i18n/format";
import { getDictionary, pageMetadata } from "@/lib/i18n";

type Props = { params: { locale: string; slug: string } };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => projectMeta.map((p) => ({ locale, slug: p.slug })));
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = params.locale as Locale;
  const p = getDictionary(locale).projects[params.slug as ProjectSlug];
  if (!p) return {};
  return pageMetadata(locale, `/projects/${params.slug}`, p.title, p.short);
}

export default function ProjectPage({ params }: Props) {
  const locale = params.locale as Locale;
  const meta = projectMeta.find((p) => p.slug === params.slug);
  if (!meta) notFound();
  const t = getDictionary(locale);
  const p = t.projects[meta.slug];
  const pt = t.project;
  const video = meta.video ? featuredVideos.find((v) => v.id === meta.video) : undefined;
  const hasJourney = journey.some((e) => e.programme === meta.slug);
  const others = projectMeta.filter((x) => x.slug !== meta.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={pt.eyebrow} title={p.title} intro={p.short} />

      <section className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <Reveal>
            {video ? (
              <VideoFeature id={video.id} title={video.title[locale]} className="w-full" />
            ) : (
              <ArtPanel label={fill(pt.photoLabel, { title: p.title })} tone={meta.tone} className="aspect-[16/9] w-full" monogram={p.title.slice(0, 1)} />
            )}
            <p className="mt-8 flex items-center gap-2 text-sm font-medium text-plum/70"><MapPin className="h-4 w-4 text-teal-600" aria-hidden />{pt.where}: {p.regions}</p>
            <p className="mt-4 text-lg leading-relaxed text-plum/80">{p.intro}</p>

            <h2 className="mt-12 text-2xl">{pt.whatWeDo}</h2>
            <ul className="mt-6 space-y-3">
              {p.delivered.map((a) => (
                <li key={a} className="flex gap-3 rounded-xl bg-white p-4 shadow-card ring-1 ring-plum/5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" aria-hidden />{a}
                </li>
              ))}
            </ul>

            {p.planned.length > 0 && (
              <>
                <h2 className="mt-12 text-2xl">{pt.planned}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {p.planned.map((a) => (
                    <li key={a} className="flex gap-3 rounded-xl border border-dashed border-purple/30 bg-purple-50/60 p-4 text-sm">
                      <Sprout className="h-5 w-5 shrink-0 text-purple" aria-hidden />{a}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-plum/65">{pt.plannedNote}</p>
              </>
            )}
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <div className="card sticky top-28 overflow-hidden">
            <div className="bubbles relative bg-gradient-to-br from-teal-50 to-purple-50 p-8">
              <p className="font-display text-5xl font-semibold text-teal-700">{p.keyFact}</p>
              <p className="mt-2 text-plum/80">{p.keyFactLabel}</p>
            </div>
            <div className="p-8">
              <DonateButton programme={meta.slug} className="btn-teal w-full">{pt.support}</DonateButton>
              <Link href={localePath(locale, "/donate#involve")} className="btn-outline mt-3 w-full">{t.common.volunteer}</Link>
            </div>
          </div>
        </div>
      </section>

      {hasJourney && (
        <section className="bg-mist py-20" aria-labelledby="programme-journey">
          <div className="container-page max-w-4xl">
            <p className="eyebrow">{t.journey.eyebrow}</p>
            <h2 id="programme-journey" className="mt-3 text-3xl">{pt.journeyTitle}</h2>
            <div className="mt-10"><Journey programme={meta.slug} showFilters={false} /></div>
          </div>
        </section>
      )}

      <section className="bg-white py-20">
        <div className="container-page">
          <h2 className="text-2xl">{pt.others}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((o) => <ProjectCard key={o.slug} slug={o.slug} />)}
          </div>
        </div>
      </section>
    </>
  );
}
