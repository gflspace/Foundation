"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

/** Everything except the legal texts, which only server components use. */
export type ClientDictionary = Omit<Dictionary, "legal">;
type Ctx = { locale: Locale; t: ClientDictionary };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ locale, t, children }: Ctx & { children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return { ...ctx, href: (path: string) => localePath(ctx.locale, path) };
}
