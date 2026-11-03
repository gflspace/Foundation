import type { Metadata } from "next";
import { Download, FileText, Mail } from "lucide-react";
import { FacebookEmbeds } from "@/components/FacebookEmbeds";
import { MediaHub } from "@/components/MediaHub";
import { PageHero } from "@/components/PageHero";
import { PressForm } from "@/components/PressForm";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/content";
import { getDictionary, pageLocale, pageMetadata, type LocaleParams } from "@/lib/i18n";

export function generateMetadata(props: LocaleParams): Metadata {
  const locale = pageLocale(props);
  const m = getDictionary(locale).media;
  return pageMetadata(locale, "/media", m.metaTitle, m.metaDescription);
}

export default function MediaPage(props: LocaleParams) {
  const locale = pageLocale(props);
  const t = getDictionary(locale);
  const m = t.media;
  const suffix = locale === "fr" ? "-fr" : "";
  return (
    <>
      <PageHero eyebrow={m.eyebrow} title={m.title} intro={m.intro} />

      <section className="container-page py-20">
        <MediaHub />
      </section>

      <section id="facebook" className="scroll-mt-28 bg-mist py-20" aria-labelledby="facebook-title">
        <div className="container-page">
          <p className="eyebrow">{t.facebookUi.eyebrow}</p>
          <h2 id="facebook-title" className="mt-3 text-3xl sm:text-4xl">{t.facebookUi.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-plum/75">{t.facebookUi.intro}</p>
          <div className="mt-10"><FacebookEmbeds /></div>
        </div>
      </section>

      <section id="press" className="scroll-mt-28 bg-plum py-24 text-white">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading tone="dark" eyebrow={m.pressEyebrow} title={m.kitTitle} intro={m.kitText} />
            {/* Regenerate with: NODE_PATH=$(npm root -g) node scripts/build-press-kit.mjs */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a href={`/press/syndy-emade-foundation-press-kit${suffix}.zip`} download className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:bg-white/15">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal text-plum"><Download className="h-5 w-5" aria-hidden /></span>
                <span><span className="block font-semibold">{m.kitDownload}</span><span className="text-sm text-white/65">PDF · PNG</span></span>
              </a>
              <a href={`/press/fact-sheet${suffix}.pdf`} className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:bg-white/15">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-purple text-white"><FileText className="h-5 w-5" aria-hidden /></span>
                <span><span className="block font-semibold">{m.kitFactSheet}</span><span className="text-sm text-white/65">A4 · PDF</span></span>
              </a>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-white/75">
              <Mail className="h-4 w-4 text-teal" aria-hidden />{m.enquiries}{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-teal underline underline-offset-4">{site.email}</a>
            </p>
          </div>
          <div className="glass rounded-3xl p-6 sm:p-8 lg:col-span-7">
            <h2 className="text-2xl">{m.pressFormTitle}</h2>
            <p className="mt-2 text-sm text-white/70">{m.pressFormText}</p>
            <div className="mt-6"><PressForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
