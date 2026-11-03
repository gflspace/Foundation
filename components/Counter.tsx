"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { intlLocale } from "@/lib/i18n/config";
import { useI18n } from "./I18nProvider";

/**
 * Server-renders the real figure (for crawlers, no-JS and reduced motion),
 * then counts up from zero (`plain` skips digit grouping, e.g. for years) the first time it scrolls into view.
 */
export function Counter({ value, suffix = "", plain = false }: { value: number; suffix?: string; plain?: boolean }) {
  const { locale } = useI18n();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const fmt = (n: number) => (plain ? String(n) : n.toLocaleString(intlLocale[locale]));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden>{fmt(display)}{suffix}</span>
      <span className="sr-only">{fmt(value)}{suffix}</span>
    </span>
  );
}
