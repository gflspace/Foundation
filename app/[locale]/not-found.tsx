"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export default function NotFound() {
  const { t, href } = useI18n();
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-navy px-4 pb-16 pt-32 text-center text-white">
      <div aria-hidden className="grain absolute inset-0" />
      <div className="relative">
        <p className="eyebrow text-gold-400">404</p>
        <h1 className="mt-3 text-4xl">{t.notFound.title}</h1>
        <p className="mt-4 text-white/70">{t.notFound.text}</p>
        <Link href={href("/")} className="btn-gold mt-8">{t.notFound.home}</Link>
      </div>
    </section>
  );
}
