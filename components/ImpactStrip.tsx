"use client";

import { impact } from "@/lib/content";
import { Counter } from "./Counter";
import { useI18n } from "./I18nProvider";

export function ImpactStrip() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="impact-heading" className="relative z-10 -mt-16">
      <div className="container-page">
        <div className="card grid grid-cols-2 divide-navy/10 overflow-hidden lg:grid-cols-4 lg:divide-x">
          <h2 id="impact-heading" className="sr-only">{t.impact.heading}</h2>
          {impact.values.map((s, i) => (
            <div key={i} className="p-6 text-center sm:p-8">
              <p className="font-display text-4xl text-navy sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-navy/65">{t.impact.labels[i]}</p>
            </div>
          ))}
        </div>
        {impact.isPlaceholder && <p className="mt-3 text-center text-xs text-navy/65">{t.impact.placeholderNote}</p>}
      </div>
    </section>
  );
}
