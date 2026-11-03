import type { Metadata } from "next";
import { CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtPanel } from "@/components/ArtPanel";
import { DonateButton } from "@/components/DonateProvider";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projectMeta, type ProjectSlug } from "@/lib/content";
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

const barColor = ["bg-emerald", "bg-gold", "bg-navy"];

export default function ProjectPage({ params }: Props) {
  const locale = params.locale as Locale;
  const meta = projectMeta.find((p) => p.slug === params.slug);
  if (!meta) notFound();
  const t = getDictionary(locale);
  const p = t.projects[meta.slug];
  const pt = t.project;
  const others = projectMeta.filter((x) => x.slug !== meta.slug).slice(0, 3);
  const funding = meta.shares.map((share, i) => ({ label: p.funding[i], share }));

  return (
    <>
      <PageHero eyebrow={pt.eyebrow} title={p.title} intro={p.short} />
      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <ArtPanel label={fill(pt.photoLabel, { title: p.title })} tone={meta.pillar === "humanitarian" ? "gold" : "emerald"} className="aspect-[16/9] w-full" monogram={p.title.slice(0, 1)} />
            <p className="mt-8 flex items-center gap-2 text-sm font-medium text-navy/65"><MapPin className="h-4 w-4 text-gold" aria-hidden />{p.regions}</p>
            <p className="mt-4 text-lg leading-relaxed text-navy/75">{p.intro}</p>
            <h2 className="mt-12 text-2xl">{pt.whatWeDo}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.activities.map((a) => (
                <li key={a} className="flex gap-3 rounded-xl bg-white p-4 text-sm shadow-card ring-1 ring-navy/5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald" aria-hidden />{a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <div className="card sticky top-28 p-8">
            <h2 className="font-sans text-lg font-semibold">{pt.allocation}</h2>
            <div className="mt-5 flex h-3 overflow-hidden rounded-full" role="img" aria-label={funding.map((f) => `${f.label} ${f.share}%`).join(", ")}>
              {funding.map((f, i) => <span key={f.label} className={barColor[i % 3]} style={{ width: `${f.share}%` }} />)}
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {funding.map((f, i) => (
                <li key={f.label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2"><span aria-hidden className={`h-2.5 w-2.5 rounded-full ${barColor[i % 3]}`} />{f.label}</span>
                  <span className="font-semibold tabular-nums">{locale === "fr" ? `${f.share} %` : `${f.share}%`}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-navy/65">{pt.allocationNote}</p>
            <DonateButton programme={meta.slug} className="btn-gold mt-8 w-full">{pt.support}</DonateButton>
            <Link href={localePath(locale, "/donate#involve")} className="btn-outline mt-3 w-full">{t.common.volunteer}</Link>
          </div>
        </div>
      </section>
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
