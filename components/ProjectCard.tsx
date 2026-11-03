import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { ArtPanel } from "./ArtPanel";

const tone = { philanthropist: "emerald", humanitarian: "gold", icon: "navy" } as const;

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <ArtPanel label="" tone={tone[project.pillar]} className="aspect-[16/10] rounded-none" monogram={project.title.slice(0, 1)} />
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{project.regions}</p>
        <h3 className="mt-2 text-xl">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">{project.short}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
          Learn more <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
