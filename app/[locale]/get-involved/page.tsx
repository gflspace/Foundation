import type { Metadata } from "next";
import { HeartHandshake } from "lucide-react";
import { CampaignBanner } from "@/components/CampaignBanner";
import { EngageForm } from "@/components/EngageForm";
import { InvolvePaths } from "@/components/InvolvePaths";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageHero } from "@/components/PageHero";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";
import { campaigns } from "@/lib/platform";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const u = getDictionary(locale).involveUi;
  return pageMetadata(locale, "/get-involved", u.metaTitle, u.metaDescription);
}

export default function GetInvolvedPage(props: LocaleParams) {
  const u = getDictionary(pageLocale(props)).involveUi;
  return (
    <>
      <PageHero eyebrow={u.eyebrow} title={u.title} intro={u.intro} />
      <section className="container-page py-20">
        <h2 className="sr-only">{u.eyebrow}</h2>
        <InvolvePaths />
      </section>

      {campaigns.length > 0 ? (
        <CampaignBanner />
      ) : (
        <section className="container-page pb-4" aria-labelledby="kindness-title">
          <div className="grid gap-8 overflow-hidden rounded-3xl bg-plum p-8 text-white sm:p-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow flex items-center gap-2 text-teal-300"><HeartHandshake className="h-4 w-4" aria-hidden />{u.kindnessEyebrow}</p>
              <h2 id="kindness-title" className="mt-3 text-3xl sm:text-4xl">{u.kindnessTitle}</h2>
              <p className="mt-4 leading-relaxed text-white/80">{u.kindnessText}</p>
            </div>
            <div className="lg:col-span-5">
              <p className="font-semibold">{u.kindnessCta}</p>
              <NewsletterForm id="nl-kindness" />
            </div>
          </div>
        </section>
      )}

      <section id="form" className="container-page scroll-mt-28 py-20">
        <div className="mx-auto max-w-3xl"><EngageForm /></div>
      </section>
    </>
  );
}
