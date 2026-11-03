"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { films } from "@/lib/content";
import { cn } from "@/lib/cn";

const filters = [
  { key: "all", label: "All work" },
  { key: "producer", label: "As producer" },
  { key: "highlight", label: "Highlights" },
] as const;

export function FilmTimeline({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");

  const list = useMemo(() => {
    let l = [...films].sort((a, b) => b.year - a.year);
    if (filter === "producer") l = l.filter((f) => f.credit === "Producer & Actress");
    if (filter === "highlight") l = l.filter((f) => f.highlight || f.imdb);
    return limit ? l.slice(0, limit) : l;
  }, [filter, limit]);

  const byYear = useMemo(() => {
    const m = new Map<number, typeof list>();
    list.forEach((f) => m.set(f.year, [...(m.get(f.year) ?? []), f]));
    return [...m.entries()];
  }, [list]);

  return (
    <div>
      {!limit && (
        <div role="group" aria-label="Filter filmography" className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                filter === f.key ? "bg-navy text-white" : "bg-white text-navy/70 ring-1 ring-navy/10 hover:text-navy",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <ol className="relative border-l border-navy/15 pl-6 sm:pl-10">
        <AnimatePresence initial={false}>
          {byYear.map(([year, items]) => (
            <motion.li
              key={year}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="relative pb-10 last:pb-0"
            >
              <span aria-hidden className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-gold ring-4 ring-ivory sm:-left-[47px]" />
              <p className="font-display text-2xl text-gold-600">{year}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {items.map((f) => (
                  <article key={f.title} className="card flex flex-col gap-1 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg leading-snug">
                        <cite className="not-italic">{f.title}</cite>
                      </h3>
                      {f.highlight && <Star className="h-4 w-4 shrink-0 fill-gold text-gold" aria-label="Highlight" />}
                    </div>
                    <p className="text-sm text-navy/65">
                      {[f.credit, f.role && `as ${f.role}`, f.note].filter(Boolean).join(" · ") || "Actress"}
                    </p>
                    {f.imdb && (
                      <a href={f.imdb} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline">
                        View on IMDb <ExternalLink className="h-3 w-3" aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
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
