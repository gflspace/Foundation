"use client";

import { ArrowRight, Building2, HandHeart, Lightbulb, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { DonateButton } from "./DonateProvider";
import { useI18n } from "./I18nProvider";
import { onlineGiving } from "@/lib/giving";

const paths = [
  { key: "volunteer", icon: Users, to: "/get-involved?kind=volunteer#form", tone: "bg-teal-50 text-teal-700" },
  { key: "partner", icon: Building2, to: "/partners", tone: "bg-purple-50 text-purple-700" },
  { key: "support", icon: HandHeart, to: null, tone: "bg-teal-50 text-teal-700" },
  { key: "collaboration", icon: Lightbulb, to: "/get-involved?kind=collaboration#form", tone: "bg-purple-50 text-purple-700" },
] as const;

/** The four ways to take part: volunteer, partner, support a project, propose a collaboration. */
export function InvolvePaths({ className }: { className?: string }) {
  const { t, href } = useI18n();
  const u = t.involveUi;
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {paths.map(({ key, icon: Icon, to, tone }) => {
        const p = u.paths[key];
        const inner = (
          <>
            <span className={cn("grid h-12 w-12 place-items-center rounded-2xl", tone)}><Icon className="h-6 w-6" aria-hidden /></span>
            <span className="mt-5 block font-display text-xl font-semibold text-plum">{p.title}</span>
            <span className="mt-2 block flex-1 text-sm leading-relaxed text-plum/75">{key === "support" && !onlineGiving ? t.giving.supportText : p.text}</span>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-purple-700">{p.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden /></span>
          </>
        );
        const cls = "card group flex h-full w-full flex-col p-6 text-left transition hover:-translate-y-1 hover:shadow-xl";
        return (
          <li key={key}>
            {to ? <Link href={href(to)} className={cls}>{inner}</Link> : <DonateButton className={cls}>{inner}</DonateButton>}
          </li>
        );
      })}
    </ul>
  );
}
