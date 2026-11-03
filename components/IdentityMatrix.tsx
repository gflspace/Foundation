"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Clapperboard, HandHeart } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { films, projectSlugs } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";
import { Portrait } from "./Portrait";

type Tab = "humanitarian" | "icon";
const TABS: Tab[] = ["humanitarian", "icon"];
const FEATURED = ["A Man for the Weekend", "Broken", "Silent Storm", "A Kiss That Kills"];

/** Dual-identity storytelling matrix (enhancement spec §6.2). WAI-ARIA tabs pattern. */
export function IdentityMatrix() {
  const { t, href } = useI18n();
  const m = t.matrix;
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<Tab>("humanitarian");
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({ humanitarian: null, icon: null });

  const onKey = (e: KeyboardEvent) => {
    const i = TABS.indexOf(tab);
    const next = e.key === "ArrowRight" ? TABS[(i + 1) % 2] : e.key === "ArrowLeft" ? TABS[(i + 1) % 2] : e.key === "Home" ? TABS[0] : e.key === "End" ? TABS[1] : null;
    if (!next) return;
    e.preventDefault();
    setTab(next);
    refs.current[next]?.focus();
  };

  const featured = FEATURED.map((title) => films.find((f) => f.title === title)!).filter(Boolean);
  const anim = reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.35 } };

  return (
    <section className="container-page py-24" aria-labelledby="matrix-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{m.eyebrow}</p>
        <h2 id="matrix-title" className="mt-3 text-3xl sm:text-4xl">{m.title}</h2>
        <p className="mt-4 text-lg text-plum/70">{m.intro}</p>
      </div>

      <div role="tablist" aria-label={m.tabsLabel} onKeyDown={onKey} className="mx-auto mt-10 flex w-full max-w-xl rounded-full bg-plum/5 p-1.5">
        {TABS.map((k) => {
          const Icon = k === "humanitarian" ? HandHeart : Clapperboard;
          const active = tab === k;
          return (
            <button
              key={k}
              ref={(el) => { refs.current[k] = el; }}
              id={`matrix-tab-${k}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`matrix-panel-${k}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setTab(k)}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-3 text-sm font-semibold transition sm:px-5",
                active ? "text-white" : "text-plum/70 hover:text-plum",
              )}
            >
              {active && <motion.span layoutId="matrix-pill" className={cn("absolute inset-0 rounded-full", k === "humanitarian" ? "bg-plum" : "bg-purple")} transition={{ type: "spring", damping: 30, stiffness: 380 }} />}
              <Icon className="relative h-4 w-4 shrink-0" aria-hidden />
              <span className="relative">{m.tabs[k]}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-12">
        <AnimatePresence mode="wait" initial={false}>
          {tab === "humanitarian" ? (
            <motion.div key="h" {...anim} id="matrix-panel-humanitarian" role="tabpanel" aria-labelledby="matrix-tab-humanitarian" tabIndex={0} className="grid items-center gap-12 lg:grid-cols-2">
              <Portrait className="mx-auto w-full max-w-md" />
              <div>
                <p className="text-lg leading-relaxed text-plum/75">{m.humanitarianText}</p>
                <h3 className="mt-8 font-sans text-sm font-semibold uppercase tracking-wider text-plum/65">{m.programmesHeading}</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {projectSlugs.map((slug) => (
                    <li key={slug}>
                      <Link href={href(`/projects/${slug}`)} className="group flex h-full items-start gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-plum/5 transition hover:-translate-y-0.5 hover:ring-purple/30">
                        <HandHeart className="mt-0.5 h-5 w-5 shrink-0 text-purple" aria-hidden />
                        <span>
                          <span className="block font-semibold">{t.projects[slug].title}</span>
                          <span className="mt-0.5 block text-xs text-plum/65">{t.projects[slug].regions}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={href("/projects")} className="btn-outline mt-8">{m.seeProgrammes} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key="i" {...anim} id="matrix-panel-icon" role="tabpanel" aria-labelledby="matrix-tab-icon" tabIndex={0} className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-lg leading-relaxed text-plum/75">{m.iconText}</p>
                <h3 className="mt-8 font-sans text-sm font-semibold uppercase tracking-wider text-plum/65">{m.filmsHeading}</h3>
                <ul className="mt-4 grid grid-cols-2 gap-3">
                  {featured.map((f, i) => (
                    <li key={f.title} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-800 via-plum to-plum-900 p-5 text-white shadow-card">
                      <span aria-hidden className="absolute -right-2 -top-4 font-display text-7xl text-white/10">{String(i + 1).padStart(2, "0")}</span>
                      <p className="relative text-xs font-semibold text-teal">{f.year}</p>
                      <p className="relative mt-1 font-display text-lg leading-snug"><cite className="not-italic" lang="en">{f.title}</cite></p>
                      <p className="relative mt-1 text-xs text-white/70">{[f.credit && t.films.credit[f.credit], f.role && `${t.films.as} ${f.role}`].filter(Boolean).join(" · ") || t.films.actress}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-2xl bg-purple-50 p-4 text-sm leading-relaxed text-purple-800">{m.crossBorder}</p>
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-plum/65">{m.awardsHeading}</h3>
                <ol className="mt-4 space-y-3">
                  {t.awards.map((a) => (
                    <li key={a.title} className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-plum/5">
                      <Award className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-hidden />
                      <span><span className="font-display text-teal-700">{a.year}</span> — {a.title}{a.note && <span className="text-plum/65"> · {a.note}</span>}</span>
                    </li>
                  ))}
                </ol>
                <Link href={href("/creative-legacy")} className="btn-purple mt-8">{m.seeFilms} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
