import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverArt } from "@/components/CoverArt";
import { FacebookEmbeds } from "@/components/FacebookEmbeds";
import { DonateButton } from "@/components/DonateProvider";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { VideoFeature } from "@/components/VideoFeature";
import { featuredVideos, projectMeta } from "@/lib/content";
import { localePath, locales, type Locale } from "@/lib/i18n/config";
import { fill, formatDate } from "@/lib/i18n/format";
import { getDictionary, pageMetadata } from "@/lib/i18n";
import { facebookPosts, stories, type StorySlug } from "@/lib/platform";

type Props = { params: { locale: string; slug: string } };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => stories.map((s) => ({ locale, slug: s.slug })));
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = params.locale as Locale;
  const copy = getDictionary(locale).storyEntries[params.slug as StorySlug];
  if (!copy) return {};
  return pageMetadata(locale, `/stories/${params.slug}`, copy.title, copy.dek);
}

export default function StoryPage({ params }: Props) {
  const locale = params.locale as Locale;
  const story = stories.find((s) => s.slug === params.slug);
  if (!story) notFound();
  const t = getDictionary(locale);
  const u = t.storiesUi;
  const c = t.storyEntries[story.slug];
  const tone = projectMeta.find((p) => p.slug === story.programme)?.tone ?? "teal";
  const film = story.video ? featuredVideos.find((v) => v.id === story.video) : undefined;
  const more = stories.filter((s) => s.slug !== story.slug).slice(0, 3);
  const pillar = t.pillars5.items[story.pillar];

  const glance: [string, React.ReactNode][] = [
    [u.when, formatDate(locale, story.date)],
    [u.where, <>{story.location}{!story.locationConfirmed && <span className="ml-1 text-xs text-plum/60">({u.locationToConfirm})</span>}</>],
    [u.reached, c.reached],
    [u.programme, <Link key="p" href={localePath(locale, `/projects/${story.programme}`)} className="font-medium text-teal-700 underline-offset-4 hover:underline">{t.projects[story.programme].title}</Link>],
    [u.pillar, `${pillar.number} · ${pillar.title}`],
    ...(story.partners.length ? ([[u.partners, story.partners.join(", ")]] as [string, React.ReactNode][]) : []),
  ];

  return (
    <article>
      <header className="relative overflow-hidden bg-plum pb-16 pt-32 text-white sm:pt-40">
        <span aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-purple/25 blur-3xl" />
        <div className="container-page relative">
          <p className="eyebrow text-teal-300">
            <Link href={localePath(locale, "/stories")} className="hover:underline">{u.eyebrow}</Link> · {formatDate(locale, story.date)}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">{c.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{c.dek}</p>
        </div>
      </header>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-8">
          <Reveal>
            {story.video ? (
              <VideoFeature id={story.video} title={film?.title[locale] ?? c.title} />
            ) : (
              <CoverArt image={story.image} tone={tone} kicker={t.projects[story.programme].title} year={story.date.slice(0, 4)} highlight={c.reached} className="aspect-[16/9] w-full rounded-2xl" sizes="(min-width: 1024px) 66vw, 100vw" />
            )}
          </Reveal>

          {[
            [u.challenge, c.challenge],
            [u.action, c.action],
            [u.change, c.change],
          ].map(([h, body], i) => (
            <section key={h} className="mt-12">
              <p className="font-display text-sm font-semibold text-teal-600">0{i + 1}</p>
              <h2 className="mt-1 text-2xl sm:text-3xl">{h}</h2>
              <p className="mt-4 text-lg leading-relaxed text-plum/80">{body}</p>
            </section>
          ))}

          {story.gallery && story.gallery.length > 0 && (
            <section className="mt-12" aria-labelledby="photos">
              <h2 id="photos" className="text-2xl sm:text-3xl">{u.photos}</h2>
              <ul className={story.gallery.length > 1 ? "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3" : "mt-6"}>
                {story.gallery.map((img, i) => (
                  <li key={img.src} className={story.gallery!.length > 1 && i === 0 ? "col-span-2 row-span-2" : undefined}>
                    <a href={img.sourceUrl} target="_blank" rel="noopener noreferrer" className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-plum/5">
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 40vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" style={img.position ? { objectPosition: img.position } : undefined} />
                      <span className="sr-only">{t.common.opensNewTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-plum/70">{fill(u.photosCredit, { credit: story.gallery[0].credit })}</p>
            </section>
          )}

          {facebookPosts.some((p) => p.story === story.slug) && (
            <section className="mt-12" aria-label={t.facebookUi.eyebrow}>
              <h2 className="text-2xl sm:text-3xl">{t.facebookUi.eyebrow}</h2>
              <div className="mt-6"><FacebookEmbeds story={story.slug} /></div>
            </section>
          )}

          <section className="mt-12" aria-labelledby="voices">
            <h2 id="voices" className="text-2xl sm:text-3xl">{u.voices}</h2>
            <div className="mt-6 space-y-4">
              {c.voices.length === 0 && <p className="text-plum/70">{u.noVoices}</p>}
              {c.voices.map((v) =>
                v.verbatim ? (
                  <figure key={v.text} className="rounded-2xl bg-teal-50 p-6 ring-1 ring-teal/15">
                    <Quote aria-hidden className="h-6 w-6 fill-current text-teal-600" />
                    <blockquote className="mt-3 font-display text-lg leading-snug text-plum">{v.text}</blockquote>
                    <figcaption className="mt-3 text-sm text-plum/70">{v.who}</figcaption>
                  </figure>
                ) : (
                  <div key={v.text} className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-plum/5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-plum/60">{u.reported}</p>
                    <p className="mt-2 text-lg leading-snug text-plum">{v.text}</p>
                    <p className="mt-3 text-sm text-plum/70">{v.who}</p>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-dashed border-purple/30 bg-purple-50/60 p-6">
            <h2 className="text-xl">{u.next}</h2>
            <p className="mt-2 leading-relaxed text-plum/80">{c.next}</p>
          </section>
        </div>

        <aside className="lg:col-span-4" aria-label={u.atAGlance}>
          <div className="card sticky top-32 p-6">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-plum/70">{u.atAGlance}</h2>
            <dl className="mt-4 space-y-4 text-sm">
              {glance.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-plum/60">{k}</dt>
                  <dd className="mt-0.5 font-medium text-plum">{v}</dd>
                </div>
              ))}
              <div>
                <dt className="text-plum/60">{u.sources}</dt>
                <dd className="mt-1 space-y-1">
                  {story.sources.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-medium text-teal-700 underline-offset-4 hover:underline">
                      {s.label} <ExternalLink className="h-3 w-3 shrink-0" aria-hidden /><span className="sr-only">{t.common.opensNewTab}</span>
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
            <DonateButton programme={story.programme} className="btn-teal mt-6 w-full">{u.support}</DonateButton>
            <Link href={`${localePath(locale, "/accountability")}#${story.slug}`} className="btn-outline mt-3 w-full">{u.accountability} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
        </aside>
      </div>

      <section className="bg-mist py-20">
        <div className="container-page">
          <h2 className="text-2xl sm:text-3xl">{u.more}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((s) => <StoryCard key={s.slug} slug={s.slug} />)}
          </div>
        </div>
      </section>
    </article>
  );
}
