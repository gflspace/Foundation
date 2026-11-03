"use client";

import Image from "next/image";
import { founderPhoto } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";

export function Portrait({ className, priority = false }: { className?: string; priority?: boolean }) {
  const { t } = useI18n();
  const p = founderPhoto;
  return (
    <figure className={cn("relative", className)}>
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-gradient-to-br from-teal/50 to-purple/50" />
      <div className="relative overflow-hidden rounded-2xl bg-plum-800 shadow-card">
        <Image
          src={p.src}
          alt={t.founder.photoAlt}
          width={p.width}
          height={p.height}
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="aspect-[4/5] h-auto w-full object-cover object-top"
        />
      </div>
      <figcaption className="mt-5 text-xs text-plum/65">
        {t.founder.photoCredit}{" "}
        <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-plum">{p.credit}</a>,{" "}
        <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-plum">{p.license}</a>, {t.founder.photoVia}
      </figcaption>
    </figure>
  );
}
