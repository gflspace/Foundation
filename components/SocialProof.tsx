"use client";

import { Pause, Play, Sparkles } from "lucide-react";
import { useState } from "react";
import { press } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";

/**
 * "As featured in" carousel (enhancement spec §2, social proof). Lists only real coverage
 * from lib/content.ts — add sponsor logos here once partnerships are confirmed.
 */
export function SocialProof() {
  const { t } = useI18n();
  const [paused, setPaused] = useState(false);
  const outlets = Array.from(new Set(press.map((p) => p.source)));
  const items = [...outlets, t.proof.ambassador];

  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul className={cn("flex shrink-0 items-center gap-10 pr-10 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4", hidden && "motion-reduce:hidden")} aria-hidden={hidden || undefined}>
      {items.map((name, i) => (
        <li key={name + i} className="flex items-center gap-10 whitespace-nowrap">
          <span className={cn("font-display text-xl sm:text-2xl", i === items.length - 1 ? "text-violet-700" : "text-navy/70")}>
            {i === items.length - 1 && <Sparkles className="mr-2 inline h-4 w-4 -translate-y-0.5 text-gold-700" aria-hidden />}
            {name}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="proof-title" className="border-y border-navy/5 bg-white py-10">
      <div className="container-page flex items-center justify-between gap-4">
        <h2 id="proof-title" className="eyebrow">{t.proof.eyebrow}</h2>
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          className="rounded-full p-2 text-navy/65 hover:bg-navy/5 hover:text-navy motion-reduce:hidden"
          aria-label={paused ? t.proof.play : t.proof.pause}
          aria-pressed={paused}
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
      <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]">
        <div className={cn("flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center", paused && "[animation-play-state:paused]")}>
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
