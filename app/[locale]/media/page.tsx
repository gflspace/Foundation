import type { Metadata } from "next";
import { Download, ExternalLink, Images, Youtube } from "lucide-react";
import { ArtPanel } from "@/components/ArtPanel";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredVideos, press, profiles, site } from "@/lib/content";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const m = getDictionary(locale).media;
  return pageMetadata(locale, "/media", m.metaTitle, m.metaDescription);
}

const tones = ["emerald", "gold", "navy", "gold", "emerald", "navy"] as const;

export default function MediaPage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const m = t.media;
  return (
    <>
      <PageHero eyebrow={m.eyebrow} title={m.title} intro={m.intro} />

      <section className="container-page py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={m.videoEyebrow} title={m.videoTitle} intro={m.videoIntro} />
          <a href={profiles.youtube} target="_blank" rel="noopener noreferrer" className="btn-gold"><Youtube className="h-4 w-4" aria-hidden />{m.subscribe}</a>
        </div>
        {featuredVideos.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredVideos.map((v) => (
              <div key={v.id} className="overflow-hidden rounded-2xl shadow-card">
                <iframe
                  className="aspect-video w-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.id}?hl=${locale}`}
                  title={v.title[locale]}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        ) : (
          <a href={profiles.youtube} target="_blank" rel="noopener noreferrer" className="group mt-12 block">
            <ArtPanel label={m.watchChannel} tone="navy" className="grid aspect-[21/9] w-full place-items-center" />
          </a>
        )}
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading eyebrow={m.galleryEyebrow} title={m.galleryTitle} />
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {m.gallery.map((label, i) => (
              <li key={label}>
                <Reveal delay={(i % 3) * 0.06}>
                  <figure>
                    <ArtPanel label={label} tone={tones[i % tones.length]} className={i % 4 === 0 ? "aspect-[4/5]" : "aspect-square"} monogram={String(i + 1).padStart(2, "0")} />
                    <figcaption className="mt-2 text-sm text-navy/65">{label}</figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
          <a href={profiles.commons} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">
            <Images className="h-4 w-4" aria-hidden />{m.commons}
          </a>
        </div>
      </section>

      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionHeading eyebrow={m.pressEyebrow} title={m.pressTitle} />
          <ul className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
            {press.map((p) => (
              <li key={p.url}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" hrefLang={p.lang} className="group flex items-center gap-4 py-5">
                  <span className="hidden w-28 shrink-0 rounded-full bg-gold/10 px-3 py-1 text-center text-xs font-semibold text-gold-700 sm:block">{m.tags[p.tag]}</span>
                  <span className="flex-1">
                    <span className="block font-medium group-hover:text-emerald-700" lang={p.lang}>{p.title}</span>
                    <span className="text-sm text-navy/65">
                      {p.source}
                      {p.lang !== locale && <> · {p.lang === "fr" ? m.inFrench : m.inEnglish}</>}
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-navy/30 group-hover:text-emerald-700" aria-hidden />
                  <span className="sr-only">{t.common.opensNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4">
          <div className="card sticky top-28 bg-navy p-8 text-white">
            <h2 className="text-2xl">{m.kitTitle}</h2>
            <p className="mt-3 text-sm text-white/70">{m.kitText}</p>
            {/* Regenerate with: NODE_PATH=$(npm root -g) node scripts/build-press-kit.mjs */}
            <a href={`/press/syndy-emade-foundation-press-kit${locale === "fr" ? "-fr" : ""}.zip`} download className="btn-gold mt-6 w-full"><Download className="h-4 w-4" aria-hidden />{m.kitDownload}</a>
            <a href={`/press/fact-sheet${locale === "fr" ? "-fr" : ""}.pdf`} className="btn mt-3 w-full border border-white/25 text-white hover:bg-white/10">{m.kitFactSheet}</a>
            <p className="mt-6 text-sm text-white/70">{m.enquiries} <a href={`mailto:${site.email}`} className="text-gold-400 underline">{site.email}</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
