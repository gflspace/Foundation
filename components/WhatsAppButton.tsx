"use client";

import { MessageCircle } from "lucide-react";
import { whatsappNumber } from "@/lib/platform";
import { useI18n } from "./I18nProvider";

/** Floating WhatsApp contact. Hidden until `whatsappNumber` is set in lib/platform.ts. */
export function WhatsAppButton() {
  const { t } = useI18n();
  if (!whatsappNumber) return null;
  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1f8f4e] text-white shadow-xl transition hover:scale-105"
      aria-label={`WhatsApp ${t.common.opensNewTab}`}
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
