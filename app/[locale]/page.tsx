import { ArrowRight, Building2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CampaignBanner } from "@/components/CampaignBanner";
import { Hero } from "@/components/Hero";
import { ImpactHighlights } from "@/components/ImpactHighlights";
import { ImpactMap } from "@/components/ImpactMap";
import { InvolvePaths } from "@/components/InvolvePaths";
import { Journey } from "@/components/Journey";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PillarCards } from "@/components/PillarCards";
import { PressHighlights } from "@/components/PressHighlights";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialProof } from "@/components/SocialProof";
import { StoryCard } from "@/components/StoryCard";
import { StoryFilm } from "@/components/StoryFilm";
import { localePath } from "@/lib/i18n/config";
import { alternatesFor, getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  return { alternates: alternatesFor(pageLocale(props), "/") };
}

/**
 * Home, in the order of the platform brief: hero · mission · impact · featured stories · focus areas ·
 * latest activities (with the impact map) · become a partner · get involved · press & recognition · newsletter.
 */
export default function HomePage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const h = t.home2;
  const link = (path: string) => localePath(locale, path);
  const More = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link href={link(to)} className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 hover:underline">{children} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
  );

  return (
    <>
      <Hero />
      <CampaignBanner />
      <StoryFilm />

      <section className="container-page py-24" aria-labelledby="impact-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">{h.impactEyebrow}</p>
            <h2 id="impact-title" className="mt-3 text-3xl sm:text-4xl">{h.impactTitle}</h2>
            <p className="mt-4 text-lg text-plum/75">{h.impactIntro}</p>
          </div>
          <More to="/impact">{h.impactCta}</More>
        </div>
        <ImpactHighlights keys={["children-school", "school-fees", "first-outreach", "family-housed"]} className="mt-10" />
      </section>

      <section className="bg-white py-24" aria-labelledby="stories-title">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{h.storiesEyebrow}</p>
              <h2 id="stories-title" className="mt-3 text-3xl sm:text-4xl">{h.storiesTitle}</h2>
            </div>
            <More to="/stories">{h.storiesCta}</More>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {(["a-home-for-a-family-2023", "first-outreach-2019", "back-to-school-2019"] as const).map((slug, i) => (
              <Reveal key={slug} delay={i * 0.06} className="h-full"><StoryCard slug={slug} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <SectionHeading eyebrow={h.focusEyebrow} title={h.focusTitle} intro={h.focusIntro} />
        <div className="mt-12"><PillarCards /></div>
      </section>

      <section className="bg-mist py-24" aria-labelledby="latest-title">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">{h.latestEyebrow}</p>
          <h2 id="latest-title" className="mt-3 text-3xl sm:text-4xl">{h.latestTitle}</h2>
          <div className="mt-10"><Journey limit={3} showFilters={false} /></div>
        </div>
      </section>

      <ImpactMap />

      <section className="container-page py-24" aria-labelledby="partner-title">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-teal-700 to-plum px-6 py-14 text-white sm:px-12">
          <span aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[16px] border-white/10" />
          <div className="relative grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow text-teal-100">{h.partnerEyebrow}</p>
              <h2 id="partner-title" className="mt-3 text-3xl sm:text-4xl">{h.partnerTitle}</h2>
              <p className="mt-4 max-w-2xl text-lg text-white/90">{h.partnerText}</p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href={link("/partners")} className="btn bg-white px-7 py-4 text-base text-plum hover:bg-mist"><Building2 className="h-5 w-5" aria-hidden />{h.partnerCta}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24" aria-labelledby="involve-title">
        <div className="container-page">
          <p className="eyebrow">{t.involveUi.eyebrow}</p>
          <h2 id="involve-title" className="mt-3 text-3xl sm:text-4xl">{t.involveUi.title}</h2>
          <InvolvePaths className="mt-10" />
        </div>
      </section>

      <PressHighlights ids={["mmi-2023-visually-impaired-mother", "cemac-2026-big-business", "yafrica-2021-netflix"]} className="pb-10 pt-24" />
      <SocialProof />

      <section className="container-page py-24" aria-labelledby="newsletter-title">
        <div className="card mx-auto max-w-3xl p-8 text-center sm:p-12">
          <h2 id="newsletter-title" className="text-3xl">{h.newsletterTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-plum/75">{h.newsletterText}</p>
          <div className="mx-auto max-w-md text-left"><NewsletterForm id="nl-home" light /></div>
        </div>
      </section>
    </>
  );
}
