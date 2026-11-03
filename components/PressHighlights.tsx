"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { press, type PressTag } from "@/lib/content";
import { useI18n } from "./I18nProvider";
import { CoverArt, type CoverTone } from "./CoverArt";

const tone = (tag: PressTag): CoverTone => (tag === "foundation" || tag === "community" ? "teal" : tag === "ambassador" || tag === "studio" || tag === "event" ? "plum" : "purple");

/** Three hand-picked, verified press pieces with covers, linking into the media library. */
export function PressHighlights({ ids, title, className }: { ids: string[]; title?: string; className?: string }) {
  const { t, locale, href } = useI18n();
  const m = t.media;
  const picks = ids.map((id) => press.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p);
  const monthYear = (d: string) => (d.length >= 7 ? new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(`${d.slice(0, 7)}-01T12:00:00Z`)) : d.slice(0, 4));

  return (
    <section className={className} aria-labelledby="press-highlights-title">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{m.highlightsEyebrow}</p>
            <h2 id="press-highlights-title" className="mt-3 text-3xl sm:text-4xl">{title ?? m.highlightsTitle}</h2>
          </div>
          <Link href={`${href("/media")}#media-library`} className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 hover:underline">
            {m.highlightsAll} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {picks.map((p) => (
            <li key={p.id}>
              <Link href={`${href("/media")}#press-${p.id}`} className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <CoverArt image={p.image} tone={tone(p.tag)} kicker={m.tags[p.tag]} source={p.source} year={p.date.slice(0, 4) || undefined} quote={p.quote} highlight={p.highlight} lang={p.lang} className="h-full w-full transition duration-500 group-hover:scale-105" />
                  {p.image?.status === "approved" && <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-plum shadow">{p.source}</span>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{p.source}{p.date && <span className="font-normal normal-case tracking-normal text-plum/65"> · {monthYear(p.date)}</span>}</p>
                  <h3 className="mt-2 font-display text-lg leading-snug" lang={p.lang}>{p.title}</h3>
                  <span className="mt-auto pt-4 text-sm font-semibold text-purple-700">{m.open} →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
