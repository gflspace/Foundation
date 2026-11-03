import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";
import { stories } from "@/lib/platform";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const s = getDictionary(locale).storiesUi;
  return pageMetadata(locale, "/stories", s.metaTitle, s.metaDescription);
}

export default function StoriesPage(props: LocaleParams) {
  const s = getDictionary(pageLocale(props)).storiesUi;
  const [first, ...rest] = stories;
  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
      <section className="container-page py-20">
        <h2 className="sr-only">{s.eyebrow}</h2>
        <Reveal><StoryCard slug={first.slug} featured /></Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((x, i) => (
            <Reveal key={x.slug} delay={i * 0.06} className="h-full"><StoryCard slug={x.slug} /></Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
