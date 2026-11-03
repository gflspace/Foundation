"use client";

import Link from "next/link";
import { DonateButton } from "./DonateProvider";
import { useI18n } from "./I18nProvider";

export function CtaBand() {
  const { t, href } = useI18n();
  return (
    <section className="container-page py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-purple-700 to-plum px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">{t.cta.title}</h2>
          <p className="mt-4 text-white/85">{t.cta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <DonateButton className="btn bg-white px-8 py-4 text-base text-plum hover:bg-mist">{t.cta.donate}</DonateButton>
            <Link href={href("/donate#involve")} className="btn border border-white/30 px-8 py-4 text-base hover:bg-white/10">{t.cta.involve}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
