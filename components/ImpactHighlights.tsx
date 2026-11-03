"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { indicators, type IndicatorKey } from "@/lib/platform";
import { Counter } from "./Counter";
import { useI18n } from "./I18nProvider";

const tones = ["text-teal-600", "text-purple", "text-teal-600", "text-purple", "text-teal-600", "text-purple"];

/** Verified indicators as cards; each links to the story or page that documents it. */
export function ImpactHighlights({ keys, className }: { keys: IndicatorKey[]; className?: string }) {
  const { t, href } = useI18n();
  const u = t.impactUi;
  const list = keys.map((k) => indicators.find((i) => i.key === k)!).filter(Boolean);
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", list.length >= 4 && !className?.includes("lg:grid-cols") && "lg:grid-cols-4", className)}>
      {list.map((ind, i) => {
        const target = ind.story ? href(`/stories/${ind.story}`) : ind.href ? href(ind.href) : undefined;
        return (
          <li key={ind.key}>
            <Link href={target ?? href("/impact")} className="card group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-xl">
              <span className={cn("font-display text-5xl font-semibold leading-none", tones[i % tones.length])}>
                <Counter value={ind.value} suffix={ind.suffix} />
              </span>
              <span className="mt-3 flex-1 text-sm font-medium leading-snug text-plum/80">{u.labels[ind.key]}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-purple-700">
                {u.evidence} <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
