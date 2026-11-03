import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

export function LegalPage({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} />
      <article className="container-page max-w-3xl py-20">
        <p className="text-sm text-navy/65">Last updated: {updated}</p>
        <div className="legal mt-8 space-y-6 leading-relaxed text-navy/80 [&_a]:text-emerald-700 [&_a]:underline [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:text-navy [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </article>
    </>
  );
}
