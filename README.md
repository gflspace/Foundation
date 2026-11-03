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
| `lib/i18n/dictionaries/en.ts`, `fr.ts` | **All copy, in English and French**: bio, programmes, awards, FAQs, forms, legal pages. `fr.ts` is type-checked against `en.ts`, so a missing translation fails the build. |
| `lib/content.ts` | Language-neutral data: URLs, impact numbers, film list, press links, donation amounts. |
| `middleware.ts` | Serves English at `/…` and French at `/fr/…` (pages live under `app/[locale]/`). |
| `app/[locale]/` | Routes: `/`, `/about`, `/projects`, `/projects/[slug]`, `/creative-legacy`, `/media`, `/donate`, `/donate/thank-you`, `/privacy`, `/donation-policy`. Each exists in English and French (`/fr/about`, …). |
| `components/` | UI: Navbar, Hero (counters and field-log video pop-up), SocialProof, IdentityMatrix, ImpactMap, MediaHub (filters, lightbox, share), PressForm, PillarCards, ProjectCard, FilmTimeline, DonationForm (amount slider) and donation pop-up, InvolveForm, Modal, Footer |
| `lib/cameroon-map.ts` | Generated SVG outline of south-west and central Cameroon (Natural Earth 1:50m), with the four centres plotted |
| `lib/jsonld.ts` | schema.org `NGO` and `Person` structured data, with `sameAs` links to Wikipedia, Wikidata, IMDb and others |
| `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` | SEO |

Design tokens are in `tailwind.config.ts`, following the enhancement spec §3.1:

| Colour | Hex | Used for |
| --- | --- | --- |
| Sovereign Gold | `#D4AF37` | Accents, and button fills with **navy** text (8.5:1). White text on this gold only reaches 2.1:1, so never use it. For gold *text* on light backgrounds use `gold-700` `#7A5C0E` (5.9:1). |
| Deep Humanitarian Navy | `#0F172A` | Text, dark sections |
| Empowerment Violet | `#6D28D9` | Links, secondary buttons, the "film icon" tab (white text: 7.1:1) |
| Warm Humanitarian Sand | `#FDF8F0` | Page background |

Headings use Playfair Display; body text uses Plus Jakarta Sans and Inter. The logo (`components/Logo.tsx`, `app/icon.svg`, the press kit) is a shield with an SE monogram, redrawn from the description in the brief. Replace it with the official vector file once the Foundation supplies one.

## Enhancement spec: status

| Spec item | Status |
| --- | --- |
| §3 Palette, glassmorphism, shield and SE logo | Done (logo redrawn from the brief, see above) |
| §6.1 Hero stage, counters, "Sponsor a child" and "Watch field logs" | Done. The background video slot is ready (`HERO_VIDEO` in `components/Hero.tsx`) but there is no footage yet. "Sponsor a child" opens the donation form with Youth Protection & Care preselected. |
| §6.2 Two-tab founder section (humanitarian / film icon) | Done (`IdentityMatrix`), using the WAI-ARIA tabs pattern |
| §6.3 Media gallery: filters, hover effects, lightbox, sharing, links straight to an item | Done (`MediaHub`). Photo stories show placeholders until photos are added (`photoStories[].image`). No video transcripts exist yet, so YouTube captions are requested in the viewer instead. |
| §6.4 Regional impact map (Buea, Douala, Kumba, Yaoundé) | Done (`ImpactMap`). The activity listed for each city is marked `TODO(verify)`. |
| §6.5 Donation slider ($10 / $25 / $50 / $100 / custom) | Done. What each amount funds is marked `TODO(verify)`. |
| §2 "As featured in" carousel, press enquiry form | Done. The carousel lists only real press coverage, and Orange InstaVoice appears as a brand ambassadorship, not as a Foundation sponsor. |
| §4.1 Gamma image enhancement | **Not done.** There are no source photos. Generating "field" scenes with AI would show events that never happened, so real photos are needed first. |
| §4.2 Canva video studio | **Not done.** No footage has been supplied. |
| §5.2 Base44 CMS | **Not done.** Content stays in typed files (`lib/content.ts` and the dictionaries), shaped so they can be swapped for a CMS loader later. |
| §5.1 Figma prototype | **Not done.** The site itself is the working prototype. |
| §7 Next.js 15 / Tailwind v4 | **Not done.** The site stays on Next.js 14 and Tailwind 3.4. Every spec feature works on this stack, and upgrading is a separate migration. |

## Languages

The site is fully bilingual. English is at the root (`/about`) and French under `/fr` (`/fr/about`). The EN/FR switch in the header keeps visitors on the same page.

- French addresses are fully translated: `/fr/a-propos`, `/fr/projets` (with `/fr/projets/protection-des-jeunes`, `intervention-mobile-de-crise`, `bourses-d-etudes` and `autonomisation-des-femmes`), `/fr/heritage-creatif`, `/fr/medias`, `/fr/faire-un-don`, `/fr/faire-un-don/merci`, `/fr/confidentialite` and `/fr/conditions-de-don`. The mapping is `translatedSegments` in `lib/i18n/config.ts`; `localePath()` applies it to every link, canonical URL, `hreflang` tag, sitemap entry and Stripe return URL. Untranslated forms such as `/fr/about` redirect permanently (308) to the French address.
- Every page sets `<html lang>` and a canonical URL, plus `hreflang` links to its translation (`x-default` points to English). The sitemap lists both versions.
- French visitors see amounts in FCFA first, with French number formatting (`30 000 FCFA`). Stripe checkout opens in French and returns to `/fr/faire-un-don/merci`.
- Form submissions include a `locale` field, so replies can go out in the right language.
- Press coverage keeps each article's original language and marks it "En anglais" or "In French" when that differs from the page.
- To change any wording, edit the same key in both `en.ts` and `fr.ts`. To add a language, add it to `lib/i18n/config.ts`, create a new dictionary file and update `middleware.ts`.
- **Before launch:** have a native French speaker review `fr.ts`, ideally someone familiar with Cameroonian usage.

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
4. **Photography.** The founder portrait is a CC BY-SA 4.0 photo from Wikimedia Commons, credited under the image (settings: `founderPhoto` in `lib/content.ts`). Every other image slot is a branded gradient (`components/ArtPanel.tsx`). Replace each with `next/image` using photos you own or have licensed: Foundation field photos, Blue Rain stills used with permission, or CC-licensed Wikimedia Commons images with attribution. Don't use scraped press or film images without the rights.
5. **Hero video.** Add `public/media/hero.mp4` (muted, 4 MB or less) and `public/images/hero-poster.jpg`, then set `HERO_VIDEO = true` in `components/Hero.tsx`.
6. **YouTube.** Add video IDs to `featuredVideos` in `lib/content.ts`. They embed on `/media` in privacy-enhanced mode.
7. **Gamma decks.** Set `GAMMA_EMBED_URL` in `app/about/page.tsx` and in `app/donate/page.tsx`.
8. **Press kit.** `public/press/` contains a generated fact sheet PDF and a logo pack, in English and French (`-fr` files). If the facts change, regenerate them with `NODE_PATH=$(npm root -g) node scripts/build-press-kit.mjs` (requires Playwright).
9. **Domain.** Set `NEXT_PUBLIC_SITE_URL` to the production domain.
10. **Legal pages.** `/privacy` and `/donation-policy` are sensible defaults. Have a lawyer review them (search for `TODO(legal)`) and add the Foundation's registered name and address.

## Quality

- WCAG 2.1 AA: axe-core reports no violations on any page at 1440px and 390px wide. Gold and emerald buttons use the darker `gold-600` and `emerald-700` shades so white text stays at 4.5:1 contrast or better.
- Content works without JavaScript: impact figures are server-rendered, and the fade-in sections fall back to fully visible.
- Preview deployments set `NEXT_PUBLIC_NOINDEX=true`, which adds `noindex` and blocks crawlers in robots.txt.

## Deploy (Hostinger preview, current)

The preview runs at https://forestgreen-owl-883522.hostingersite.com on the Hostinger Cloud Professional plan. The target is recorded in `.hostinger/site.json`. It isn't connected to a Hostinger Git installation, so deploys are done from an archive:

1. `git archive --format=zip -o app.zip HEAD`, then commit `app.zip` alone to the `hostinger-archive` branch and push.
2. Hostinger API: `POST /accounts/{user}/websites/{domain}/git/repositories/deploy` with `branch: hostinger-archive` and `directory: _deploy`. This pulls the archive into `public_html/_deploy/`.
3. Hostinger API: `POST /accounts/{user}/websites/{domain}/nodejs/builds` with `app_type: next`, `source_type: archive` and `archive_path: _deploy/app.zip`.

Environment variables on the preview are `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_NOINDEX=true` and `NEXT_TELEMETRY_DISABLED=1`. If GitHub is later connected to this website in hPanel (Advanced → Git), switch to `source_type: git` on `main` so every push deploys automatically.

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
