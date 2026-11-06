"use client";

import { ArrowUpRight, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { albumCover, albums } from "@/lib/gallery";
import { formatDate } from "@/lib/i18n/format";
import { fill } from "@/lib/i18n/format";
import { pillars, stories, type PillarKey } from "@/lib/platform";
import { SectionHeading } from "./SectionHeading";
import { useI18n } from "./I18nProvider";

/** "In pictures": the Foundation's photo albums grouped by strategic pillar, each opening its story. */
export function MediaGallery() {
  const { t, locale, href } = useI18n();
  const g = t.galleryUi;
  const groups = pillars
    .map((p) => ({ key: p.key as PillarKey, items: albums.filter((a) => a.category === p.key) }))
    .filter((x) => x.items.length > 0);

  return (
    <div>
      <SectionHeading eyebrow={g.eyebrow} title={g.title} intro={g.intro} />
      <div className="mt-12 space-y-14">
        {groups.map(({ key, items }) => (
          <section key={key} aria-labelledby={`gallery-${key}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-plum/10 pb-3">
              <h3 id={`gallery-${key}`} className="text-2xl">{t.pillars5.items[key].title}</h3>
              <p className="text-sm text-plum/70">{g.categories[key]}</p>
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => {
                const story = stories.find((s) => s.slug === a.slug)!;
                const cover = albumCover(a);
                const thumbs = a.photos.filter((_, i) => i !== a.cover).slice(0, 3);
                return (
                  <li key={a.slug}>
                    <Link href={`${href(`/stories/${a.slug}`)}#in-pictures`} className="card group block overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative aspect-[16/10] overflow-hidden bg-plum/10">
                        <Image src={cover.src} alt={cover.caption[locale]} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-plum shadow">
                          <Images className="h-3.5 w-3.5" aria-hidden />{fill(g.photos, { n: a.photos.length })}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 px-1 pt-1" aria-hidden>
                        {thumbs.map((p) => (
                          <div key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-md bg-plum/10">
                            <Image src={p.src} alt="" fill sizes="10vw" className="object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="p-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{formatDate(locale, story.date)} · <span className="font-normal normal-case tracking-normal text-plum/70">{story.location}</span></p>
                        <h4 className="mt-1.5 text-lg leading-snug">{t.storyEntries[a.slug].title}</h4>
                        <p className="mt-1 text-xs text-plum/70">{fill(g.credit, { credit: a.credit })}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-purple-700">
                          {g.viewStory} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
