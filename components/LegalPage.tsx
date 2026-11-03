import { site } from "@/lib/content";
import type { Dictionary, LegalSection } from "@/lib/i18n/dictionaries/en";
import { PageHero } from "./PageHero";

/** Renders text, turning {email} into a mailto link. */
function Rich({ text }: { text: string }) {
  const parts = text.split("{email}");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <a href={`mailto:${site.email}`}>{site.email}</a>}
        </span>
      ))}
    </>
  );
}

export function LegalPage({ t, doc }: { t: Dictionary; doc: { title: string; intro: string; sections: LegalSection[] } }) {
  return (
    <>
      <PageHero eyebrow={t.legal.eyebrow} title={doc.title} />
      <article className="container-page max-w-3xl py-20">
        <p className="text-sm text-plum/65">{t.legal.updatedLabel} {t.legal.updated}</p>
        <div className="mt-8 space-y-6 leading-relaxed text-plum/80 [&_a]:text-purple-700 [&_a]:underline [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:text-plum [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          <p><Rich text={doc.intro} /></p>
          {doc.sections.map((s) => (
            <section key={s.h} className="space-y-4">
              <h2>{s.h}</h2>
              {s.items && (
                <ul>
                  {s.items.map((it, i) => (
                    <li key={i}>{it.b && <strong>{it.b} </strong>}<Rich text={it.t} /></li>
                  ))}
                </ul>
              )}
              {s.p?.map((para, i) => <p key={i}><Rich text={para} /></p>)}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
