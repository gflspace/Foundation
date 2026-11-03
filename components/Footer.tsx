import { Facebook, Mail, MapPin, Youtube } from "lucide-react";
import Link from "next/link";
import { nav, profiles, projects, site } from "@/lib/content";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{site.description}</p>
          <div className="mt-6 flex gap-3">
            <a href={profiles.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/5 p-2.5 hover:bg-white/10 hover:text-white">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={profiles.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube — Syndy Emade TV" className="rounded-full bg-white/5 p-2.5 hover:bg-white/10 hover:text-white">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="md:col-span-2">
          <h2 className="font-sans text-sm font-semibold text-white">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
            ))}
            <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <h2 className="font-sans text-sm font-semibold text-white">Programmes</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {projects.map((p) => (
              <li key={p.slug}><Link href={`/projects/${p.slug}`} className="hover:text-white">{p.title}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h2 className="font-sans text-sm font-semibold text-white">Field notes, monthly</h2>
          <p className="mt-4 text-sm">Stories from our missions and how your support is used.</p>
          <NewsletterForm />
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold-400" aria-hidden /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-400" aria-hidden />{site.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/donation-policy" className="hover:text-white">Donation terms</Link>
            <span>Registered non-profit · Cameroon</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
