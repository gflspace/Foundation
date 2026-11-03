"use client";

import { ArrowUpRight, BookOpen, HandHeart, Leaf, Sprout, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { pillars, type PillarKey, type PillarStatus } from "@/lib/platform";
import { useI18n } from "./I18nProvider";

const icons: Record<PillarKey, typeof BookOpen> = { education: BookOpen, relief: HandHeart, women: Sprout, community: Users, environment: Leaf };
const accent = {
  teal: { icon: "bg-teal-50 text-teal-700", bar: "bg-teal-600" },
  purple: { icon: "bg-purple-50 text-purple-700", bar: "bg-purple" },
  plum: { icon: "bg-plum/5 text-plum", bar: "bg-plum" },
} as const;
const badge: Record<PillarStatus, string> = {
  active: "bg-teal-600 text-white",
  emerging: "bg-purple-100 text-purple-800",
  proposed: "border border-dashed border-plum/30 text-plum/75",
};

/** The five strategic pillars, each labelled with its real status (active, emerging, proposed). */
export function PillarCards() {
  const { t, href } = useI18n();
  const p5 = t.pillars5;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {pillars.map(({ key, status, tone, programmes }) => {
        const p = p5.items[key];
        const Icon = icons[key];
        return (
          <li key={key} className={cn("card relative flex flex-col overflow-hidden p-6", status === "proposed" && "bg-white/70")}>
            <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1", accent[tone].bar, status === "proposed" && "opacity-40")} />
            <div className="flex items-center justify-between gap-2">
              <span className={cn("grid h-11 w-11 place-items-center rounded-xl", accent[tone].icon)}><Icon className="h-5 w-5" aria-hidden /></span>
              <span className="font-display text-2xl font-semibold text-plum/70">{p.number}</span>
            </div>
            <h3 className="mt-4 text-lg leading-snug">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-plum/75">{p.summary}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-plum/80">
              {p.focus.map((f) => <li key={f} className="flex gap-2"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />{f}</li>)}
            </ul>
            <div className="mt-auto pt-5">
              <span className={cn("inline-block rounded-full px-2.5 py-1 text-xs font-semibold", badge[status])} title={p5.statusNote[status]}>{p5.status[status]}</span>
              <p className="mt-1.5 text-xs text-plum/65">{p5.statusNote[status]}</p>
              {programmes.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {programmes.map((slug) => (
                    <li key={slug}>
                      <Link href={href(`/projects/${slug}`)} className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 underline-offset-4 hover:underline">
                        {t.projects[slug].title} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
