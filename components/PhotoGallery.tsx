"use client";

import { ChevronLeft, ChevronRight, ExternalLink, Expand } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { albumFor } from "@/lib/gallery";
import { fill } from "@/lib/i18n/format";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";
import { Modal } from "./Modal";

/** A story's photo album: an editorial grid (first photo featured) with an accessible lightbox. */
export function PhotoGallery({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const u = t.storiesUi;
  const album = albumFor(slug);
  const [open, setOpen] = useState<number | null>(null);
  const count = album?.photos.length ?? 0;
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  if (!album) return null;
  const photo = open === null ? null : album.photos[open];

  return (
    <section className="mt-12 scroll-mt-28" aria-labelledby="in-pictures-title" id="in-pictures">
      <h2 id="in-pictures-title" className="text-2xl sm:text-3xl">{u.gallery}</h2>
      <p className="mt-3 text-plum/75">{u.galleryIntro}</p>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {album.photos.map((p, i) => (
          <li key={p.src} className={cn(i === 0 && "col-span-2 row-span-2")}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-plum/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              <Image
                src={p.src}
                alt={p.caption[locale]}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 44vw, 100vw" : "(min-width: 1024px) 22vw, 50vw"}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span aria-hidden className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-plum opacity-0 shadow transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="h-4 w-4" />
              </span>
              <span className="sr-only">{u.enlarge}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-plum/70">
        <span>{u.photoCredit}: {album.credit}</span>
        <a href={album.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-teal-700 underline-offset-4 hover:underline">
          {u.originalPost}: {album.source.label} <ExternalLink className="h-3 w-3" aria-hidden /><span className="sr-only">{t.common.opensNewTab}</span>
        </a>
      </p>

      <Modal open={photo !== null} onClose={() => setOpen(null)} labelledBy="lightbox-caption" closeLabel={u.closePhoto} tone="dark" className="max-w-5xl">
        {photo && (
          <figure>
            <div className="relative mx-auto bg-black" style={{ aspectRatio: `${photo.w} / ${photo.h}`, width: `min(100%, calc(76vh * ${photo.w / photo.h}))` }}>
              <Image src={photo.src} alt={photo.caption[locale]} fill sizes="(min-width: 1024px) 64rem, 100vw" className="object-contain" priority />
              <button type="button" onClick={() => go(-1)} aria-label={u.prevPhoto} className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30">
                <ChevronLeft className="h-6 w-6" aria-hidden />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={u.nextPhoto} className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30">
                <ChevronRight className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <figcaption id="lightbox-caption" className="flex flex-wrap items-baseline justify-between gap-3 px-6 py-4">
              <span className="font-display text-lg leading-snug">{photo.caption[locale]}</span>
              <span className="text-sm text-white/65" aria-live="polite">{fill(u.photoOf, { n: (open ?? 0) + 1, total: count })} · {album.credit}</span>
            </figcaption>
          </figure>
        )}
      </Modal>
    </section>
  );
}
