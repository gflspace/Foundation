"use client";

import { Facebook, Instagram, Mail, MapPin, Youtube } from "lucide-react";
import Link from "next/link";
import { profiles, projectSlugs, site } from "@/lib/content";
import { useI18n } from "./I18nProvider";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const { t, href } = useI18n();
  const nav = [
    { path: "/about", label: t.nav.about },
    { path: "/projects", label: t.nav.projects },
    { path: "/creative-legacy", label: t.nav.legacy },
    { path: "/media", label: t.nav.media },
    { path: "/donate", label: t.nav.donate },
  ];
  return (
    <footer className="bg-plum-900 text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href={href("/")} className="inline-block rounded-2xl bg-white p-3 shadow-card"><Logo className="h-16 w-auto" /></Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{t.meta.description}</p>
          <div className="mt-6 flex gap-3">
            <a href={profiles.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/5 p-2.5 hover:bg-white/10 hover:text-white">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={profiles.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-white/5 p-2.5 hover:bg-white/10 hover:text-white">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={profiles.youtube} target="_blank" rel="noopener noreferrer" aria-label={t.footer.youtube} className="rounded-full bg-white/5 p-2.5 hover:bg-white/10 hover:text-white">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="md:col-span-2">
          <h2 className="font-sans text-sm font-semibold text-white">{t.footer.explore}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.path}><Link href={href(n.path)} className="hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h2 className="font-sans text-sm font-semibold text-white">{t.footer.programmes}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {projectSlugs.map((slug) => (
              <li key={slug}><Link href={href(`/projects/${slug}`)} className="hover:text-white">{t.projects[slug].title}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h2 className="font-sans text-sm font-semibold text-white">{t.footer.newsletterTitle}</h2>
          <p className="mt-4 text-sm">{t.footer.newsletterText}</p>
          <NewsletterForm />
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-teal-400" aria-hidden /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-400" aria-hidden />{t.meta.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {t.meta.siteName}. {t.footer.rights}</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href={href("/privacy")} className="hover:text-white">{t.footer.privacy}</Link>
            <Link href={href("/donation-policy")} className="hover:text-white">{t.footer.terms}</Link>
            <span>{t.footer.registered}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
