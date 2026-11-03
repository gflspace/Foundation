import { impact } from "@/lib/content";
import { Counter } from "./Counter";

export function ImpactStrip() {
  return (
    <section aria-labelledby="impact-heading" className="relative z-10 -mt-16">
      <div className="container-page">
        <div className="card grid grid-cols-2 divide-navy/10 overflow-hidden lg:grid-cols-4 lg:divide-x">
          <h2 id="impact-heading" className="sr-only">Our impact</h2>
          {impact.stats.map((s) => (
            <div key={s.label} className="p-6 text-center sm:p-8">
              <p className="font-display text-4xl text-navy sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-navy/60">{s.label}</p>
            </div>
          ))}
        </div>
        {impact.isPlaceholder && (
          <p className="mt-3 text-center text-xs text-navy/45">Illustrative figures — audited impact data coming soon.</p>
        )}
      </div>
    </section>
  );
}
