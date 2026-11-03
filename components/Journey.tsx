"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { journey, projectMeta, type JourneyEntry, type ProjectSlug } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";
import { Modal, YouTubeEmbed } from "./Modal";

const tone = { teal: "bg-teal-50 text-teal-700 ring-teal/20", purple: "bg-purple-50 text-purple-700 ring-purple/20", plum: "bg-plum/5 text-plum ring-plum/15" } as const;

/**
 * "Our journey" — every documented activity, newest first, filterable by programme.
 * Pass `programme` to lock the list to one programme (programme pages), `limit` for teasers.
 */
export function Journey({ programme, limit, showFilters = true }: { programme?: ProjectSlug; limit?: number; showFilters?: boolean }) {
  const { t, locale, href } = useI18n();
  const j = t.journey;
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<ProjectSlug | "all">(programme ?? "all");
  const [video, setVideo] = useState<JourneyEntry | null>(null);

  const list = useMemo(() => {
    const l = [...journey].sort((a, b) => b.date.localeCompare(a.date)).filter((e) => filter === "all" || e.programme === filter);
    return limit ? l.slice(0, limit) : l;
  }, [filter, limit]);

  const programmesWithEntries = projectMeta.filter((p) => journey.some((e) => e.programme === p.slug));

  return (
    <div>
      {showFilters && !programme && (
        <div role="group" aria-label={j.filterLabel} className="mb-10 flex flex-wrap gap-2">
          {(["all", ...programmesWithEntries.map((p) => p.slug)] as const).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={filter === k}
              onClick={() => setFilter(k)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                filter === k ? "bg-teal-600 text-white shadow" : "bg-white text-plum/80 ring-1 ring-plum/10 hover:text-plum hover:ring-teal/40",
              )}
            >
              {k === "all" ? j.all : t.projects[k].title}
            </button>
          ))}
        </div>
      )}

      <ol className="relative space-y-6 before:absolute before:bottom-2 before:left-[1.05rem] before:top-2 before:w-0.5 before:bg-gradient-to-b before:from-teal before:via-purple/50 before:to-teal/10 sm:before:left-[1.3rem]">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((e) => {
            const copy = j.entries[e.id as keyof typeof j.entries];
            const meta = projectMeta.find((p) => p.slug === e.programme);
            return (
              <motion.li
                key={e.id}
                id={`journey-${e.id}`}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative pl-12 sm:pl-16"
              >
                <span aria-hidden className="absolute left-2 top-6 grid h-5 w-5 place-items-center rounded-full bg-white ring-4 ring-teal/30 sm:left-3 sm:h-6 sm:w-6">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal" />
                </span>
                <article className="card grid gap-5 overflow-hidden p-5 sm:grid-cols-[1fr_auto] sm:p-6">
                  <div>
                    <p className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-display font-semibold text-teal-600">{copy.when}</span>
                      {!e.dateConfirmed && <span className="rounded-full bg-mist-100 px-2 py-0.5 text-xs text-plum/70">{j.dateToConfirm}</span>}
                      {meta && (
                        <Link href={href(`/projects/${meta.slug}`)} className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 transition hover:brightness-95", tone[meta.tone])}>
                          {t.projects[meta.slug].title}
                        </Link>
                      )}
                    </p>
                    <h3 className="mt-2 text-xl leading-snug">{copy.title}</h3>
                    <p className="mt-2 leading-relaxed text-plum/75">{copy.text}</p>
                    <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-plum/70">
                      <span className="font-semibold">{e.sources.length > 1 ? j.sources : j.source}:</span>
                      {e.sources.map((s) => (
                        <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-2 hover:text-plum hover:underline">
                          {s.label} <ExternalLink className="h-3 w-3" aria-hidden /><span className="sr-only">{t.common.opensNewTab}</span>
                        </a>
                      ))}
                    </p>
                  </div>
                  {e.video && (
                    <button type="button" onClick={() => setVideo(e)} className="group relative aspect-video w-full overflow-hidden rounded-xl sm:w-56" aria-label={`${j.watch}: ${copy.title}`}>
                      <Image src={`https://i.ytimg.com/vi/${e.video}/hqdefault.jpg`} alt="" width={480} height={360} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <span aria-hidden className="absolute inset-0 grid place-items-center bg-plum/25 transition group-hover:bg-plum/10">
                        <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-teal-600 shadow-glow"><Play className="h-5 w-5 translate-x-0.5 fill-current" /></span>
                      </span>
                    </button>
                  )}
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>

      {limit && (
        <Link href={`${href("/projects")}#journey`} className="btn-outline mt-8">{j.readMore} <ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
      )}

      <Modal open={!!video} onClose={() => setVideo(null)} labelledBy="journey-video-title" closeLabel={t.media.close} tone="dark">
        {video && (
          <>
            <h2 id="journey-video-title" className="px-6 pb-4 pr-14 pt-6 text-xl">{j.entries[video.id as keyof typeof j.entries].title}</h2>
            <YouTubeEmbed id={video.video!} title={j.entries[video.id as keyof typeof j.entries].title} lang={locale} />
          </>
        )}
      </Modal>
    </div>
  );
}
