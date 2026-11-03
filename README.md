# Syndy Emade Foundation — Website

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Stripe / PayPal / Flutterwave (MTN & Orange Mobile Money)

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in keys as they become available
npm run dev                  # http://localhost:3000
```

`npm run build` prerenders every page as static HTML. The only server code is `/api/checkout` (Stripe) and `/api/forms` (volunteer, partner and newsletter forms).

## Structure

| Path | Purpose |
| --- | --- |
| `lib/content.ts` | **All copy and data**: bio, awards, films, press, programmes, donation tiers, FAQs. Edit here first. |
| `app/` | Routes: `/`, `/about`, `/projects`, `/projects/[slug]`, `/creative-legacy`, `/media`, `/donate`, `/donate/thank-you` |
| `components/` | UI: Navbar, Hero, ImpactStrip, PillarCards, ProjectCard, FilmTimeline, DonationForm and modal, InvolveForm, Footer |
| `lib/jsonld.ts` | schema.org `NGO` and `Person` structured data, with `sameAs` links to Wikipedia, Wikidata, IMDb and others |
| `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` | SEO |

Design tokens are in `tailwind.config.ts`: Navy `#0F172A`, Emerald `#059669`, Gold `#D97706`, Off-white `#F8FAFC`. Headings use Playfair Display; body text uses Plus Jakarta Sans and Inter.

## Payments

| Method | Setup | Env var |
| --- | --- | --- |
| Card (one-time and monthly) | Stripe account → secret key | `STRIPE_SECRET_KEY` |
| PayPal | PayPal → Donate button → hosted button ID | `NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID` |
| MTN MoMo / Orange Money | Flutterwave → Payment Links (XAF) | `NEXT_PUBLIC_FLUTTERWAVE_PAYMENT_LINK` |

If a key is missing, that payment method shows a friendly "being set up" message instead of failing.
Forms are sent to `FORMS_WEBHOOK_URL` (Zapier, Make, Slack or a CRM). If it isn't set, submissions are only written to the server logs.

## ⚠️ Before launch

1. **Impact numbers.** `impact.stats` in `lib/content.ts` are **placeholders**. Replace them with real figures, then set `isPlaceholder: false`. That also removes the "Illustrative figures" note.
2. **Facts marked `TODO(verify)`.** Check the "Netflix Producer" and "CFI Partner" roles, the contact email and the office location.
3. **Founder quote.** The hero card shows a Foundation promise, not a quote. If you want a quote there, add a real one she has approved.
4. **Photography.** Every image slot is currently a branded gradient (`components/ArtPanel.tsx`). Replace each with `next/image` using photos you own or have licensed: Foundation field photos, Blue Rain stills used with permission, or CC-licensed Wikimedia Commons images with attribution. Don't use scraped press or film images without the rights.
5. **Hero video.** Add `public/media/hero.mp4` (muted, 4 MB or less) and `public/images/hero-poster.jpg`, then set `HERO_VIDEO = true` in `components/Hero.tsx`.
6. **YouTube.** Add video IDs to `featuredVideos` in `lib/content.ts`. They embed on `/media` in privacy-enhanced mode.
7. **Gamma decks.** Set `GAMMA_EMBED_URL` in `app/about/page.tsx` and in `app/donate/page.tsx`.
8. **Press kit.** Put the zip at `public/press/syndy-emade-foundation-press-kit.zip`.
9. **Domain.** Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Quality

- WCAG 2.1 AA: axe-core reports no violations on any page at 1440px and 390px wide. Gold and emerald buttons use the darker `gold-600` and `emerald-700` shades so white text stays at 4.5:1 contrast or better.
- Content works without JavaScript: impact figures are server-rendered, and the fade-in sections fall back to fully visible.
- Preview deployments set `NEXT_PUBLIC_NOINDEX=true`, which adds `noindex` and blocks crawlers in robots.txt.

## Deploy (Vercel)

```bash
npm i -g vercel
vercel                                        # link the project
vercel env add STRIPE_SECRET_KEY production   # repeat for each env var
vercel --prod
```

Netlify works too, since it supports Next.js natively. Point Cloudflare DNS at whichever host you use and SSL is issued automatically.

## Moving content to a CMS

Each export in `lib/content.ts` has a type (`Project`, `Film`, `Pillar`, …). To move to Sanity or Strapi:

1. Create document types that match those types.
2. Replace each export with an async fetcher.
3. Add `export const revalidate = 3600` to the pages.

The components don't need to change.
