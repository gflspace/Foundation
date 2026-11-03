"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Images, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cameroonPath, cityPoints, mapViewBox, neighbourPaths } from "@/lib/cameroon-map";
import { impactCentres, type CentreId } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";

const [, , VB_W, VB_H] = mapViewBox.split(" ").map(Number);

/** Interactive regional impact map (enhancement spec §6.4). */
export function ImpactMap() {
  const { t, href } = useI18n();
  const m = t.map;
  const reduce = useReducedMotion();
  const [active, setActive] = useState<CentreId>("buea");
  const centre = impactCentres.find((c) => c.id === active)!;
  const copy = m.centres[active];

  return (
    <section className="bg-navy py-24 text-white" aria-labelledby="map-title">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">{m.eyebrow}</p>
          <h2 id="map-title" className="mt-3 text-3xl sm:text-4xl">{m.title}</h2>
          <p className="mt-4 text-lg text-white/75">{m.intro}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 lg:col-span-7">
            <svg viewBox={mapViewBox} className="block h-auto w-full" role="img" aria-label={m.mapLabel}>
              <defs>
                <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#13203D" />
                  <stop offset="1" stopColor="#0B1222" />
                </linearGradient>
                <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill="#ffffff" opacity="0.06" />
                </pattern>
              </defs>
              <rect width={VB_W} height={VB_H} fill="url(#sea)" />
              <rect width={VB_W} height={VB_H} fill="url(#dots)" />
              {neighbourPaths.map((d, i) => <path key={i} d={d} fill="#1E293B" stroke="#334155" strokeWidth="0.8" />)}
              <path d={cameroonPath} fill="#2A1F5C" stroke="#D4AF37" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>

            {impactCentres.map((c) => {
              const [x, y] = cityPoints[c.id];
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  aria-pressed={on}
                  aria-controls="map-detail"
                  className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
                  style={{ left: `${(x / VB_W) * 100}%`, top: `${(y / VB_H) * 100}%` }}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    {on && !reduce && <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" />}
                    <span className={cn("relative h-4 w-4 rounded-full border-2 transition", on ? "scale-125 border-white bg-gold" : "border-gold bg-navy group-hover:bg-gold")} />
                  </span>
                  <span className={cn("absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold transition", on ? "bg-gold text-navy" : "bg-navy/80 text-white ring-1 ring-white/20")}>
                    {m.centres[c.id].name}
                  </span>
                </button>
              );
            })}
          </div>

          <div id="map-detail" aria-live="polite" className="lg:col-span-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                className="glass h-full rounded-3xl p-7"
              >
                <p className="flex items-center gap-2 text-sm text-gold"><MapPin className="h-4 w-4" aria-hidden />{copy.region}</p>
                <h3 className="mt-2 text-3xl">{copy.name}</h3>
                <p className="mt-3 text-white/80">{copy.headline}</p>

                <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-white/60">{m.programmesLabel}</h4>
                <ul className="mt-3 space-y-2">
                  {centre.programmes.map((slug) => (
                    <li key={slug}>
                      <Link href={href(`/projects/${slug}`)} className="group flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium ring-1 ring-white/10 transition hover:bg-white/10">
                        {t.projects[slug].title}
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>

                <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-white/60">{m.storiesLabel}</h4>
                {centre.stories.length ? (
                  <ul className="mt-3 space-y-2">
                    {centre.stories.map((id) => (
                      <li key={id}>
                        <Link href={`${href("/media")}#story-${id}`} className="flex items-center gap-3 text-sm text-white/85 underline-offset-4 hover:text-white hover:underline">
                          <Images className="h-4 w-4 shrink-0 text-violet-400" aria-hidden />
                          {t.media.stories[id as keyof typeof t.media.stories]?.title ?? id}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-white/60">{m.noStories}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
