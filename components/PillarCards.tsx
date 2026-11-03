"use client";

import { Check, Clapperboard, HandHeart, Siren } from "lucide-react";
import { pillarKeys } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useI18n } from "./I18nProvider";
import { Reveal } from "./Reveal";

const icons = { philanthropist: HandHeart, humanitarian: Siren, icon: Clapperboard };
const styles = {
  emerald: { chip: "bg-emerald/10 text-emerald-700", bar: "bg-emerald" },
  gold: { chip: "bg-gold/10 text-gold-700", bar: "bg-gold" },
  navy: { chip: "bg-navy/10 text-navy", bar: "bg-navy" },
};

export function PillarCards() {
  const { t } = useI18n();
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {pillarKeys.map(({ key, accent }, i) => {
        const Icon = icons[key];
        const s = styles[accent];
        const p = t.pillars[key];
        return (
          <Reveal key={key} delay={i * 0.1} className="h-full">
            <article className="card group relative h-full overflow-hidden p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100", s.bar)} />
              <span className={cn("inline-grid h-12 w-12 place-items-center rounded-2xl", s.chip)}>
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <p className="eyebrow mt-6">{p.kicker}</p>
              <h3 className="mt-2 text-2xl">{p.title}</h3>
              <p className="mt-3 text-navy/65">{p.summary}</p>
              <ul className="mt-6 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-navy/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden /> {pt}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
