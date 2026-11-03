"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cameroonPath, cityPoints, mapViewBox, neighbourPaths } from "@/lib/cameroon-map";
import { impactCentres, type CentreId } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";

const [, , VB_W, VB_H] = mapViewBox.split(" ").map(Number);
/** Buea and Limbe are ~15 km apart: nudge their pins apart slightly so both stay tappable, and put Buea's label on its left. */
const nudge: Partial<Record<CentreId, [number, number]>> = { buea: [4, -6], limbe: [-6, 6] };
const pos = (id: CentreId): [number, number] => {
  const [x, y] = cityPoints[id];
  const [dx, dy] = nudge[id] ?? [0, 0];
  return [x + dx, y + dy];
};
const labelLeft = new Set<CentreId>(["buea"]);

const pin = {
  work: "h-5 w-5 border-2 border-white bg-teal",
  origin: "h-4 w-4 border-[3px] border-purple-400 bg-plum",
  hometown: "h-3.5 w-3.5 border-2 border-white bg-purple-400",
};

/** "From the crisis regions to Douala": documented work, and where displaced families come from. */
export function ImpactMap() {
  const { t, href } = useI18n();
  const m = t.map;
  const reduce = useReducedMotion();
  const [active, setActive] = useState<CentreId>("douala");
  const centre = impactCentres.find((c) => c.id === active)!;
  const copy = m.centres[active];
  const [dx, dy] = cityPoints.douala;

  return (
    <section className="relative overflow-hidden bg-plum py-24 text-white" aria-labelledby="map-title">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full border-[18px] border-teal/20" />
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-purple/30 blur-2xl" />
      <div className="container-page relative">
        <div className="max-w-2xl">
          <p className="eyebrow text-teal">{m.eyebrow}</p>
          <h2 id="map-title" className="mt-3 text-3xl sm:text-4xl">{m.title}</h2>
          <p className="mt-4 text-lg text-white/80">{m.intro}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
              <svg viewBox={mapViewBox} className="block h-auto w-full" role="img" aria-label={m.mapLabel}>
                <defs>
                  <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#0E3B47" />
                    <stop offset="1" stopColor="#1C0B26" />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M0 0 10 5 0 10z" fill="#B48ACB" />
                  </marker>
                </defs>
                <rect width={VB_W} height={VB_H} fill="url(#sea)" />
                {neighbourPaths.map((d, i) => <path key={i} d={d} fill="#2A1238" stroke="#4E2A63" strokeWidth="0.8" />)}
                <path d={cameroonPath} fill="#3A1C4D" stroke="#00A8A0" strokeWidth="1.6" strokeLinejoin="round" />
                {impactCentres.filter((c) => c.kind === "origin").map((c) => {
                  const [x, y] = pos(c.id);
                  const mx = (x + dx) / 2 + 40;
                  const my = (y + dy) / 2;
                  return (
                    <path key={c.id} d={`M${x} ${y} Q${mx} ${my} ${dx} ${dy - 10}`} fill="none" stroke="#B48ACB" strokeWidth="2" strokeDasharray="6 6" markerEnd="url(#arrow)" opacity="0.85" />
                  );
                })}
              </svg>

              {impactCentres.map((c) => {
                const [x, y] = pos(c.id);
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
                    <span className="relative flex h-6 w-6 items-center justify-center">
                      {on && !reduce && <span className="absolute inset-0 animate-ping rounded-full bg-teal/50" />}
                      <span className={cn("relative rounded-full transition", pin[c.kind], on && "scale-125 ring-4 ring-teal/40")} />
                    </span>
                    <span className={cn("absolute whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold transition", labelLeft.has(c.id) ? "right-full top-1/2 -translate-y-1/2" : "left-1/2 top-full -translate-x-1/2", on ? "bg-teal-600 text-white" : "bg-plum/85 text-white ring-1 ring-white/25")}>
                      {m.centres[c.id].name}
                    </span>
                  </button>
                );
              })}
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {(Object.keys(m.legend) as (keyof typeof m.legend)[]).map((k) => (
                <li key={k} className="flex items-center gap-2"><span aria-hidden className={cn("rounded-full", pin[k])} />{m.legend[k]}</li>
              ))}
            </ul>
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
                <p className="flex items-center gap-2 text-sm text-teal-300"><MapPin className="h-4 w-4" aria-hidden />{copy.region}</p>
                <h3 className="mt-2 text-3xl">{copy.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-purple-400">{m.legend[centre.kind]}</p>
                <p className="mt-4 text-white/85">{copy.headline}</p>

                {centre.programmes.length > 0 && (
                  <>
                    <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-white/70">{m.programmesLabel}</h4>
                    <ul className="mt-3 space-y-2">
                      {centre.programmes.map((slug) => (
                        <li key={slug}>
                          <Link href={href(`/projects/${slug}`)} className="group flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium ring-1 ring-white/10 transition hover:bg-white/10">
                            {t.projects[slug].title}
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-teal transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {centre.journey.length > 0 && (
                  <>
                    <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-white/70">{m.storiesLabel}</h4>
                    <ul className="mt-3 space-y-2">
                      {centre.journey.map((id) => (
                        <li key={id}>
                          <Link href={`${href("/media")}#story-${id}`} className="flex items-start gap-3 text-sm text-white/90 underline-offset-4 hover:text-white hover:underline">
                            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                            <span><span className="text-white/60">{t.journey.entries[id as keyof typeof t.journey.entries].when} · </span>{t.journey.entries[id as keyof typeof t.journey.entries].title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
