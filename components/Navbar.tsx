"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localePath, splitLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/cn";
import { DonateButton } from "./DonateProvider";
import { useI18n } from "./I18nProvider";
import { Logo } from "./Logo";

export function Navbar() {
  const { t, href } = useI18n();
  const pathname = usePathname();
  const { path } = splitLocale(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = [
    { path: "/about", label: t.nav.about },
    { path: "/projects", label: t.nav.projects },
    { path: "/creative-legacy", label: t.nav.legacy },
    { path: "/media", label: t.nav.media },
  ];
  const other = t.nav.switchLang as Locale;
  const switchHref = localePath(other, path);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open;
  const LangSwitch = ({ className }: { className?: string }) => (
    <Link
      href={switchHref}
      hrefLang={other}
      lang={other}
      title={t.nav.switchLong}
      className={cn("inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-plum/80 hover:text-plum", className)}
    >
      <Languages className="h-4 w-4" aria-hidden />
      <span aria-hidden>{t.nav.switchShort}</span>
      <span className="sr-only">{t.nav.switchLong}</span>
    </Link>
  );

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300", solid ? "shadow-card" : "")}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-teal-600 focus:px-4 focus:py-2 focus:text-white">
        {t.nav.skip}
      </a>
      <nav aria-label={t.nav.primary} className="container-page flex h-20 items-center justify-between sm:h-24">
        <Link href={href("/")} aria-label={t.nav.home}>
          <Logo priority className="h-16 w-auto sm:h-20" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = path === item.path || path.startsWith(item.path + "/");
            return (
              <li key={item.path}>
                <Link
                  href={href(item.path)}
                  aria-current={active ? "page" : undefined}
                  className={cn("rounded-full px-3 py-2 text-sm font-medium transition lg:px-4", active ? "bg-teal-50 text-teal-700" : "text-plum/80 hover:text-plum")}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <LangSwitch className="px-2 py-2" />
          <Link href={href("/donate")} className="hidden text-sm font-medium text-plum/80 hover:text-plum xl:inline">
            {t.nav.getInvolved}
          </Link>
          <DonateButton className="btn-teal hidden px-5 py-2.5 sm:inline-flex">{t.nav.donate}</DonateButton>
          <button
            type="button"
            className="rounded-full p-2 text-plum md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="border-t border-plum/10 bg-white md:hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <ul className="container-page space-y-1 py-4">
              {[...nav, { path: "/donate", label: t.nav.getInvolved }].map((item) => (
                <li key={item.path}>
                  <Link href={href(item.path)} className="block rounded-xl px-4 py-3 text-base font-medium text-plum hover:bg-teal-50">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <DonateButton className="btn-teal w-full">{t.nav.donate}</DonateButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
