"use client";

import { ArrowUpRight, MapPin, Play } from "lucide-react";
import Link from "next/link";
import { projectMeta } from "@/lib/content";
import { formatDate } from "@/lib/i18n/format";
import { stories, type StorySlug } from "@/lib/platform";
import { CoverArt } from "./CoverArt";
import { useI18n } from "./I18nProvider";

/** Story of Impact card: cover (film still or approved photo, else editorial cover), date, place, title, dek. */
export function StoryCard({ slug, featured = false }: { slug: StorySlug; featured?: boolean }) {
  const { t, locale, href } = useI18n();
  const s = stories.find((x) => x.slug === slug)!;
  const copy = t.storyEntries[slug];
  const tone = projectMeta.find((p) => p.slug === s.programme)?.tone ?? "teal";
  return (
    <Link href={href(`/stories/${slug}`)} className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className={featured ? "relative aspect-[16/9] overflow-hidden" : "relative aspect-[16/10] overflow-hidden"}>
        <CoverArt image={s.image} youtubeId={s.video} tone={tone} kicker={t.projects[s.programme].title} year={s.date.slice(0, 4)} highlight={copy.reached} className="h-full w-full transition duration-700 group-hover:scale-105" />
        {s.video && (
          <span aria-hidden className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-teal-600 shadow">
            <Play className="h-4 w-4 translate-x-px fill-current" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-wider text-teal-600">
          {formatDate(locale, s.date)}
          <span className="inline-flex items-center gap-1 font-normal normal-case tracking-normal text-plum/70"><MapPin className="h-3.5 w-3.5" aria-hidden />{s.location}</span>
        </p>
        <h3 className={featured ? "mt-2 text-2xl leading-snug" : "mt-2 text-xl leading-snug"}>{copy.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-plum/75">{copy.dek}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-purple-700">
          {t.storiesUi.read} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
