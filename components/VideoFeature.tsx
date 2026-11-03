"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ytThumb } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";
import { YouTubeEmbed } from "./Modal";

/** Click-to-load YouTube player: a thumbnail until the visitor presses play (no third-party load before that). */
export function VideoFeature({ id, title, className }: { id: string; title: string; className?: string }) {
  const { t, locale } = useI18n();
  const [playing, setPlaying] = useState(false);
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-plum shadow-card", className)}>
      {playing ? (
        <YouTubeEmbed id={id} title={title} lang={locale} />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group relative block aspect-video w-full" aria-label={`${t.project.watchFilm}: ${title}`}>
          <Image src={ytThumb(id).src} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className={cn("object-cover transition duration-700", ytThumb(id).letterboxed ? "scale-[1.13] group-hover:scale-[1.18]" : "group-hover:scale-105")} />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-plum/80 via-plum/10 to-transparent" />
          <span aria-hidden className="absolute inset-0 grid place-items-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-teal-600 shadow-glow transition duration-300 group-hover:scale-110">
              <Play className="h-8 w-8 translate-x-0.5 fill-current" />
            </span>
          </span>
          <span className="absolute bottom-4 left-5 right-5 text-left font-display text-lg font-semibold text-white">{title}</span>
        </button>
      )}
    </div>
  );
}
