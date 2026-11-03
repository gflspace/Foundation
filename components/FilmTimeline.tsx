"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { films, type Film } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";

type FilterKey = "all" | "producer" | "highlight";

export function FilmTimeline({ limit }: { limit?: number }) {
  const { t, locale } = useI18n();
  const ft = t.films;
  const [filter, setFilter] = useState<FilterKey>("all");

  const list = useMemo(() => {
    let l = [...films].sort((a, b) => b.year - a.year);
    if (filter === "producer") l = l.filter((f) => f.credit === "producer");
    if (filter === "highlight") l = l.filter((f) => f.highlight || f.imdb);
    return limit ? l.slice(0, limit) : l;
  }, [filter, limit]);

  const byYear = useMemo(() => {
    const m = new Map<number, Film[]>();
    list.forEach((f) => m.set(f.year, [...(m.get(f.year) ?? []), f]));
    return [...m.entries()];
  }, [list]);

  const describe = (f: Film) =>
    [f.credit && ft.credit[f.credit], f.role && `${ft.as} ${f.role}`, f.note && ft.notes[f.note], f.studio].filter(Boolean).join(" · ") || ft.actress;

  return (
    <div>
      {!limit && (
        <div role="group" aria-label={ft.filterLabel} className="mb-10 flex flex-wrap gap-2">
          {(Object.keys(ft.filters) as FilterKey[]).map((k) => (
            <button
              key={k}
              aria-pressed={filter === k}
              onClick={() => setFilter(k)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                filter === k ? "bg-plum text-white" : "bg-white text-plum/70 ring-1 ring-plum/10 hover:text-plum",
              )}
            >
              {ft.filters[k]}
            </button>
          ))}
        </div>
      )}

      <ol className="relative border-l border-plum/15 pl-6 sm:pl-10">
        <AnimatePresence initial={false}>
          {byYear.map(([year, items]) => (
            <motion.li key={year} layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="relative pb-10 last:pb-0">
              <span aria-hidden className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-teal ring-4 ring-mist sm:-left-[47px]" />
              <p className="font-display text-2xl text-teal-600">{year}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {items.map((f) => (
                  <article key={f.title} className="card flex flex-col gap-1 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg leading-snug">
                        <cite className="not-italic" lang="en">{f.title}</cite>
                      </h3>
                      {f.highlight && <Star className="h-4 w-4 shrink-0 fill-teal text-teal" aria-label={ft.highlight} />}
                    </div>
                    <p className="text-sm text-plum/65" lang={locale}>{describe(f)}</p>
                    {f.imdb && (
                      <a href={f.imdb} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-purple-700 hover:underline">
                        {ft.viewImdb} <ExternalLink className="h-3 w-3" aria-hidden />
                        <span className="sr-only">{t.common.opensNewTab}</span>
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </div>
  );
}
