import type { Metadata } from "next";
import { ArrowRight, Award, ExternalLink, GraduationCap, MapPin, Quote } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { IdentityMatrix } from "@/components/IdentityMatrix";
import { PageHero } from "@/components/PageHero";
import { Portrait } from "@/components/Portrait";
import { PressHighlights } from "@/components/PressHighlights";
import { Reveal } from "@/components/Reveal";
import { profiles } from "@/lib/content";
import { localePath } from "@/lib/i18n/config";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";
import { founderQuotes, founderStatement } from "@/lib/platform";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const u = getDictionary(locale).founderUi;
  return pageMetadata(locale, "/founder", u.metaTitle, u.metaDescription);
}

export default function FounderPage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const u = t.founderUi;
  const a = t.about;
  const f = t.founder;
  const [vision, ...others] = founderQuotes;

  return (
    <>
      <PageHero eyebrow={u.eyebrow} title={u.title} intro={u.intro} />

      <section className="container-page grid gap-12 py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Portrait priority />
          <dl className="card mt-4 divide-y divide-plum/10 text-sm">
            {[
              { icon: MapPin, k: a.factBorn, v: `${f.born}, ${f.birthplace}` },
              { icon: GraduationCap, k: a.factEducation, v: f.education },
              { icon: Award, k: a.factFullName, v: f.legalName },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="grid grid-cols-[1rem_1fr] gap-x-3 p-4">
                <dt className="col-span-2 flex items-center gap-3 font-semibold"><Icon className="h-4 w-4 shrink-0 text-teal-600" aria-hidden />{k}</dt>
                <dd className="col-start-2 text-plum/70">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="text-3xl">{u.journeyTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-plum/80">{f.summary}</p>
            <p className="mt-4 leading-relaxed text-plum/75">{a.founderExtra}</p>

            <h2 className="mt-12 text-3xl">{u.motivationTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-plum/80">{u.motivationText}</p>

            <h2 className="mt-12 text-3xl">{u.visionTitle}</h2>
            <figure className="mt-5 rounded-3xl bg-plum p-8 text-white">
              <Quote aria-hidden className="h-8 w-8 fill-current text-teal-300" />
              <blockquote className="mt-4 font-display text-2xl leading-snug">{u.quotes[vision.id]}</blockquote>
              <figcaption className="mt-4 text-sm text-white/75">
                Syndy Emade · <a href={vision.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{vision.source.label}</a>
                {u.quoteTranslated && <span> · {u.quoteTranslated}</span>}
              </figcaption>
            </figure>

            <h2 className="mt-12 text-3xl">{u.commitmentTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-plum/80">{u.commitmentText}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((q) => (
                <figure key={q.id} className="rounded-2xl bg-teal-50 p-6 ring-1 ring-teal/15">
                  <blockquote className="leading-relaxed text-plum">“{u.quotes[q.id]}”</blockquote>
                  <figcaption className="mt-3 text-xs text-plum/70"><a href={q.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{q.source.label}</a></figcaption>
                </figure>
              ))}
            </div>

            {founderStatement.approved && (
              <>
                <h2 className="mt-12 text-3xl">{u.messageTitle}</h2>
                <blockquote className="mt-5 border-l-4 border-teal-600 pl-6 font-display text-2xl leading-snug text-plum">{founderStatement[locale]}</blockquote>
              </>
            )}

            <h3 className="mt-12 text-2xl">{a.honours}</h3>
            <ol className="mt-6 space-y-3">
              {t.awards.map((aw) => (
                <li key={aw.title} className="flex items-baseline gap-4 border-b border-plum/10 pb-3">
                  <span className="w-20 shrink-0 font-display text-lg text-teal-600">{aw.year}</span>
                  <span>{aw.title}{aw.note && <span className="text-plum/70"> · {aw.note}</span>}</span>
                </li>
              ))}
            </ol>
            <h3 className="mt-12 text-2xl">{a.roles}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[...f.roles, ...f.ambassadorships].map((r) => <li key={r} className="rounded-full bg-white px-4 py-2 text-sm shadow-card ring-1 ring-plum/5">{r}</li>)}
            </ul>
            <p className="mt-8 text-sm text-plum/70">
              {a.references}{" "}
              <a className="underline hover:text-plum" href={profiles.wikipedia} target="_blank" rel="noopener noreferrer">Wikipedia</a> ·{" "}
              <a className="underline hover:text-plum" href={profiles.imdb} target="_blank" rel="noopener noreferrer">IMDb</a> ·{" "}
              <a className="underline hover:text-plum" href={profiles.wikidata} target="_blank" rel="noopener noreferrer">Wikidata</a>
              <ExternalLink className="ml-1 inline h-3 w-3" aria-hidden />
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={localePath(locale, "/stories")} className="btn-teal">{u.storiesCta} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
              <Link href={localePath(locale, "/creative-legacy")} className="btn-outline">{u.legacyCta}</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <IdentityMatrix />
      <PressHighlights ids={["cemac-2020-heart-to-heart", "cameroonceo-2022-profile", "pulse-2016-interview"]} title={u.pressTitle} className="py-24" />
      <CtaBand />
    </>
  );
}
