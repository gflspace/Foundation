import type { Metadata } from "next";
import { ArrowUpRight, ExternalLink, FileText, Mail, Play } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/content";
import { localePath } from "@/lib/i18n/config";
import { formatDate } from "@/lib/i18n/format";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";
import { activitiesIn, activityYears, stories } from "@/lib/platform";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const u = getDictionary(locale).accountabilityUi;
  return pageMetadata(locale, "/accountability", u.metaTitle, u.metaDescription);
}

export default function AccountabilityPage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const u = t.accountabilityUi;
  const s = t.storiesUi;

  return (
    <>
      <PageHero eyebrow={u.eyebrow} title={u.title} intro={u.intro} />

      <section className="container-page py-20" aria-label={u.project}>
        <ol className="space-y-8">
          {stories.map((story) => {
            const c = t.storyEntries[story.slug];
            const rows: [string, React.ReactNode][] = [
              [u.objective, c.objective],
              [u.beneficiaries, c.reached],
              [u.partners, story.partners.length ? story.partners.join(", ") : u.none],
              [u.resources, <span key="r" className="text-plum/65">{u.resourcesNote}</span>],
              [u.activities, c.action],
              [u.outcomes, c.change],
              [u.evidence, (
                <span key="e" className="flex flex-wrap gap-x-4 gap-y-1">
                  {story.sources.map((src) => (
                    <a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-teal-700 underline-offset-4 hover:underline">
                      {src.label} <ExternalLink className="h-3 w-3" aria-hidden /><span className="sr-only">{t.common.opensNewTab}</span>
                    </a>
                  ))}
                </span>
              )],
              [u.media, story.video ? (
                <a key="m" href={`https://www.youtube.com/watch?v=${story.video}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-teal-700 underline-offset-4 hover:underline"><Play className="h-3.5 w-3.5" aria-hidden />SYNDY EMADE TV<span className="sr-only"> {t.common.opensNewTab}</span></a>
              ) : <span key="m" className="text-plum/65">—</span>],
              [u.next, c.next],
            ];
            return (
              <li key={story.slug} id={story.slug} className="card scroll-mt-28 overflow-hidden">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-plum/10 bg-mist px-6 py-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                      {formatDate(locale, story.date)} · {story.location}{!story.locationConfirmed && ` (${s.locationToConfirm})`} · {t.projects[story.programme].title}
                    </p>
                    <h2 className="mt-1 text-2xl">{c.title}</h2>
                  </div>
                  <Link href={localePath(locale, `/stories/${story.slug}`)} className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 hover:underline">{s.read} <ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
                </div>
                <dl className="grid gap-x-8 gap-y-4 p-6 text-sm sm:grid-cols-[12rem_1fr]">
                  {rows.map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="font-semibold text-plum/70">{k}</dt>
                      <dd className="leading-relaxed text-plum/90">{v}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="bg-mist py-20" aria-labelledby="by-year">
        <div className="container-page">
          <h2 id="by-year" className="text-3xl">{u.yearTitle}</h2>
          <p className="mt-2 text-plum/75">{u.yearIntro}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...activityYears].reverse().map((y) => (
              <div key={y} className="card p-6">
                <p className="font-display text-3xl font-semibold text-teal-600">{y}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {activitiesIn(y).map((a) => (
                    <li key={a.id} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                      <span>{t.journey.entries[a.id as keyof typeof t.journey.entries].title}{!a.dateConfirmed && <span className="text-plum/60"> ({t.journey.dateToConfirm})</span>}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20" aria-labelledby="reports">
        <div className="card flex flex-col gap-6 p-8 sm:flex-row">
          <FileText className="h-10 w-10 shrink-0 text-purple" aria-hidden />
          <div>
            <h2 id="reports" className="text-2xl">{u.reportsTitle}</h2>
            <p className="mt-2 max-w-3xl text-plum/75">{u.reportsText}</p>
            <a href={`mailto:${site.email}`} className="btn-outline mt-6"><Mail className="h-4 w-4" aria-hidden />{u.questions}</a>
          </div>
        </div>
      </section>
    </>
  );
}
