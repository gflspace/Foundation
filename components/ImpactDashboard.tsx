"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { projectMeta } from "@/lib/content";
import { cn } from "@/lib/cn";
import { activitiesIn, activityYears, storyForJourney } from "@/lib/platform";
import { useI18n } from "./I18nProvider";

/** Year filter over the documented activities, with a count per programme for the selected year. */
export function ImpactDashboard() {
  const { t, href } = useI18n();
  const u = t.impactUi;
  const [year, setYear] = useState<string>("all");
  const list = activitiesIn(year);
  const byProgramme = projectMeta
    .map((p) => ({ slug: p.slug, n: list.filter((a) => a.programme === p.slug).length }))
    .filter((x) => x.n > 0);

  return (
    <div>
      <div role="group" aria-label={u.byYearTitle} className="flex flex-wrap gap-2">
        {["all", ...activityYears].map((y) => (
          <button
            key={y}
            type="button"
            aria-pressed={year === y}
            onClick={() => setYear(y)}
            className={cn("rounded-full px-4 py-2 text-sm font-semibold tabular-nums transition", year === y ? "bg-teal-600 text-white shadow" : "bg-white text-plum/80 ring-1 ring-plum/10 hover:text-plum")}
          >
            {y === "all" ? u.all : y}
            <span className={cn("ml-1.5", year === y ? "text-white" : "text-plum/60")}>{activitiesIn(y).length}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12" aria-live="polite">
        <ul className="space-y-2 lg:col-span-4">
          {byProgramme.map(({ slug, n }) => (
            <li key={slug} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm shadow-card ring-1 ring-plum/5">
              <Link href={href(`/projects/${slug}`)} className="font-medium text-plum hover:underline">{t.projects[slug].title}</Link>
              <span className="font-display text-lg font-semibold text-teal-600">{n}</span>
            </li>
          ))}
        </ul>
        <ol className="space-y-3 lg:col-span-8">
          {list.length === 0 && <li className="text-plum/70">{u.byYearEmpty}</li>}
          {list.map((a) => {
            const copy = t.journey.entries[a.id as keyof typeof t.journey.entries];
            const story = storyForJourney(a.id);
            return (
              <li key={a.id} className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-plum/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{copy.when}{!a.dateConfirmed && <span className="ml-1 rounded-full bg-mist-100 px-2 py-0.5 font-normal normal-case tracking-normal text-plum/70">{t.journey.dateToConfirm}</span>}{a.programme && <span className="font-normal normal-case tracking-normal text-plum/65"> · {t.projects[a.programme].title}</span>}</p>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-plum">{copy.title}</p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {story && <Link href={href(`/stories/${story.slug}`)} className="inline-flex items-center gap-1 font-semibold text-purple-700 hover:underline">{t.storiesUi.read} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></Link>}
                  {a.sources.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="text-plum/70 underline-offset-2 hover:underline">{s.label}<span className="sr-only"> {t.common.opensNewTab}</span></a>
                  ))}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
