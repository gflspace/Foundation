"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projectMeta, type ProjectSlug } from "@/lib/content";
import { ArtPanel } from "./ArtPanel";
import { useI18n } from "./I18nProvider";

const tone = { philanthropist: "emerald", humanitarian: "gold", icon: "navy" } as const;

export function ProjectCard({ slug }: { slug: ProjectSlug }) {
  const { t, href } = useI18n();
  const meta = projectMeta.find((p) => p.slug === slug)!;
  const p = t.projects[slug];
  return (
    <Link href={href(`/projects/${slug}`)} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <ArtPanel label="" tone={tone[meta.pillar]} className="aspect-[16/10] rounded-none" monogram={p.title.slice(0, 1)} />
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{p.regions}</p>
        <h3 className="mt-2 text-xl">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">{p.short}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
          {t.common.learnMore} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
