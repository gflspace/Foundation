import type { Metadata } from "next";
import { Award, BookOpen, Compass, Eye, GraduationCap, MapPin, ShieldCheck, Target } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Portrait } from "@/components/Portrait";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { gamma, profiles } from "@/lib/content";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const a = getDictionary(locale).about;
  return pageMetadata(locale, "/about", a.metaTitle, a.metaDescription);
}

const governanceIcons = [ShieldCheck, BookOpen, Compass];

export default function AboutPage(props: LocaleParams) {
  const t = getDictionary(pageLocale(props));
  const a = t.about;
  const f = t.founder;
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} intro={a.intro} />

      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Portrait priority />
          <dl className="card mt-4 divide-y divide-plum/10 text-sm">
            {[
              { icon: MapPin, k: a.factBorn, v: `${f.born}, ${f.birthplace}` },
              { icon: GraduationCap, k: a.factEducation, v: f.education },
              { icon: Award, k: a.factFullName, v: f.legalName },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="grid grid-cols-[1rem_1fr] gap-x-3 p-4">
                <dt className="col-span-2 flex items-center gap-3 font-semibold">
                  <Icon className="h-4 w-4 shrink-0 text-teal" aria-hidden />
                  {k}
                </dt>
                <dd className="col-start-2 text-plum/65">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">{a.founderEyebrow}</p>
            <h2 className="mt-3 text-4xl">{f.name}</h2>
            <p className="mt-6 text-lg leading-relaxed text-plum/75">{f.summary}</p>
            <p className="mt-4 leading-relaxed text-plum/75">{a.founderExtra}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-12 text-2xl">{a.honours}</h3>
            <ol className="mt-6 space-y-3">
              {t.awards.map((aw) => (
                <li key={aw.title} className="flex items-baseline gap-4 border-b border-plum/10 pb-3">
                  <span className="w-20 shrink-0 font-display text-lg text-teal-600">{aw.year}</span>
                  <span>{aw.title}{aw.note && <span className="text-plum/65"> — {aw.note}</span>}</span>
                </li>
              ))}
            </ol>
            <h3 className="mt-12 text-2xl">{a.roles}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[...f.roles, ...f.ambassadorships].map((r) => (
                <li key={r} className="rounded-full bg-white px-4 py-2 text-sm shadow-card ring-1 ring-plum/5">{r}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-plum/65">
              {a.references}{" "}
              <a className="underline hover:text-plum" href={profiles.wikipedia} target="_blank" rel="noopener noreferrer">Wikipedia</a> ·{" "}
              <a className="underline hover:text-plum" href={profiles.imdb} target="_blank" rel="noopener noreferrer">IMDb</a> ·{" "}
              <a className="underline hover:text-plum" href={profiles.wikidata} target="_blank" rel="noopener noreferrer">Wikidata</a>
            </p>
          </Reveal>
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
      <CtaBand />
    </>
  );
}
