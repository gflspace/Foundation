"use client";

import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projectMeta, type ProjectSlug } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ArtPanel } from "./ArtPanel";
import { useI18n } from "./I18nProvider";

const badge = { teal: "bg-teal-600", purple: "bg-purple", plum: "bg-plum" } as const;

/** Programme card: film still when we have one, otherwise the brand panel; headline figure as a badge. */
export function ProjectCard({ slug }: { slug: ProjectSlug }) {
  const { t, href } = useI18n();
  const meta = projectMeta.find((p) => p.slug === slug)!;
  const p = t.projects[slug];
  return (
    <Link href={href(`/projects/${slug}`)} className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        {meta.video ? (
          <>
            <Image src={`https://i.ytimg.com/vi/${meta.video}/hqdefault.jpg`} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-plum/60 to-transparent" />
            <span aria-hidden className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-teal-600"><Play className="h-4 w-4 translate-x-px fill-current" /></span>
          </>
        ) : (
          <ArtPanel label="" tone={meta.tone} className="h-full w-full rounded-none transition duration-700 group-hover:scale-105" monogram={p.title.slice(0, 1)} />
        )}
        <span className={cn("absolute bottom-4 left-4 rounded-2xl px-3 py-1.5 text-white shadow-lg", badge[meta.tone])}>
          <span className="block font-display text-xl font-semibold leading-none">{p.keyFact}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{p.regions}</p>
        <h3 className="mt-2 text-xl">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-plum/75">{p.short}</p>
        <p className="mt-4 text-xs text-plum/65"><span className="font-semibold text-plum/80">{p.keyFact}</span> {p.keyFactLabel}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-purple-700">
          {t.common.learnMore} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
