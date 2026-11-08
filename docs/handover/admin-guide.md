# Website handover & admin guide

**Syndy Emade Foundation · https://www.syndyemadefoundation.org · 8 November 2026 · Status: LIVE (GO)**

Designed version (Figma): page "Website handover guide" in the Foundation design file
(https://www.figma.com/design/Ca1nmDhzWaE7zYhXrPOtxy/?node-id=14-2). No passwords are written in this guide.

## 1. Work completed
- **Bilingual website:** 28 English + 28 French pages, language switch on every page.
- **Stories of Impact:** 9 documented stories with photo galleries, dates, places and sources.
- **Programmes & pillars:** 5 programme pages, 5 strategic pillars, founder page, creative legacy.
- **Impact & accountability:** impact dashboard and map; accountability centre per project.
- **Media & press hub:** films, press articles, press kit, fact sheets (EN/FR), partnership proposal.
- **Donate (contact to give):** visitors write to support@; online payments can be switched on later.
- **Forms with reference numbers:** volunteer, partner, press, collaboration, project support, donate interest, newsletter. Each sends a confirmation to the visitor and a notification to admin@.
- **Admin dashboard** at /admin: read, search and filter form messages, retry failed emails, see maintenance status.
- **Foundation email:** admin@ mailbox (Titan); contact@, info@, support@ forward to it; branded signature; SPF, DKIM, DMARC.
- **Domain & security:** syndyemadefoundation.org on Hostinger with SSL.
- **Google Search Console:** ownership verified, sitemap submitted.
- **Content repository:** FOUNDATION-CONTENT on Google Drive (7 folders); star a file to approve it.
- **Weekly maintenance:** every Monday; report emailed to admin@.
- **Monitoring:** automatic checks of the live site with alerts.
- **Tested before launch:** 56/56 pages, 66/66 links, 357 buttons, all forms, 0 accessibility issues, mobile OK, live form test passed.

## 2. Website map
All addresses start with https://www.syndyemadefoundation.org.

| Page | English | French | Purpose |
|---|---|---|---|
| Home | / | /fr | Mission, pillars, impact, latest stories |
| About | /about | /fr/a-propos | Who we are |
| Founder | /founder | /fr/fondatrice | Syndy Emade’s story |
| Projects (5) | /projects | /fr/projets | Programmes |
| Stories of Impact (9) | /stories | /fr/histoires | Outreaches with photos |
| Impact | /impact | /fr/impact | Numbers and map |
| Accountability | /accountability | /fr/transparence | Objectives, partners, evidence |
| Partners | /partners | /fr/partenaires | Partners, proposal |
| Get involved | /get-involved | /fr/s-engager | Volunteer / partner / support forms |
| Creative legacy | /creative-legacy | /fr/heritage-creatif | Creative work |
| Media & press | /media | /fr/medias | Films, timeline, press, press kit |
| Donate | /donate | /fr/faire-un-don | Give by getting in touch |
| Privacy · Donation policy | /privacy · /donation-policy | /fr/confidentialite · /fr/conditions-de-don | Legal |
| Admin (private) | /admin | — | Form messages, maintenance status |

## 3. Accounts & access
| Service | Used for | Where | Sign in as |
|---|---|---|---|
| Website admin | Form messages | syndyemadefoundation.org/admin | Admin password (Hostinger setting ADMIN_PASSWORD) |
| Hostinger (hPanel) | Hosting, settings, Redeploy, SSL, email plan | hpanel.hostinger.com | The Foundation's Hostinger account |
| Titan webmail | Foundation mailbox | hPanel → Emails, or Titan webmail | admin@syndyemadefoundation.org |
| GoDaddy | Domain & DNS | godaddy.com → My Products → DNS | Foundation GoDaddy login |
| Content folder | Website content (photos, videos, stories, news) | syndyemadefoundation.org/admin → Upload content | Admin password |
| Google Search Console | Google visibility | search.google.com/search-console | The Foundation's Google account |
| GitHub | Code, history, monitor | Foundation code repository | Ask Tech Support for access |
| Figma | Designs | Foundation design file | Foundation Figma account |

**Email:** admin@ is the mailbox (sends website emails, receives notifications and weekly reports). contact@ (general enquiries from the public, shown in the footer), info@ (information, media and press requests) and support@ (donations and help; also Tech Support) forward to admin@.
**If the admin@ password changes:** update SMTP_PASS in Hostinger → Environment variables, then Redeploy.

## 4. How-to
**A. Answer form messages:** open /admin → sign in → “Needs your attention” → search/filter → reply from admin@ quoting the reference (e.g. SEF-VOL-…) → “Retry emails” if one failed → sign out.

**B. Add content:** open /admin → sign in → Upload content → put the file in the right folder → add context (file description or a “NOTE - …” file: what, where, when, who; consent for children) → star ⭐ the file in Google Drive to approve → published on Monday, report emailed.

| Folder | Appears on | Upload |
|---|---|---|
| Photos | Story galleries · Media → In pictures | Event photos |
| Videos | Media → Films | Clips or YouTube links |
| Blog-Posts | Stories of Impact | Written stories |
| News | Media timeline | Short updates |
| Announcements | Homepage banner | Public notices |
| Press-Releases | Media → Press | Press releases |
| Documents | Accountability · press kit | Reports, receipts, consent forms |

**C. Change the admin password:** hPanel → Websites → syndyemadefoundation.org → Environment variables → ✏️ ADMIN_PASSWORD (value only, 12+ characters) → Save → Deployments → Redeploy.

**D. Switch on online giving:** create a Flutterwave payment link and/or PayPal Donate button → add NEXT_PUBLIC_FLUTTERWAVE_PAYMENT_LINK / NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID → Redeploy.

**Settings (names only):** SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL, MAIL_REPLY_TO, ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_NOINDEX (false), SEF_TIMEZONE (Africa/Douala). Type only the value; always Redeploy after a change.

## 5. Automation, monitoring & support
- **Weekly maintenance:** Mondays 06:17 Douala; report to admin@.
- **Site monitor:** GitHub Actions; alerts as GitHub issues. Health: /api/health.
- **Search Console:** check Performance monthly.

**DNS records at GoDaddy — do not delete:** A @ 145.223.122.250 · CNAME www → @ · MX mx1/mx2.titan.email · TXT SPF `v=spf1 include:spf.titan.email ~all` · TXT titan1._domainkey (DKIM) · TXT _dmarc · TXT google-site-verification.

| If… | Do this |
|---|---|
| Site doesn’t load | Open /api/health; check “Running” in hPanel; Redeploy; then contact Tech Support |
| No confirmation emails | Check spam; if admin@ password changed, update SMTP_PASS and Redeploy |
| Setting change has no effect | Redeploy and wait for “Completed” |
| Forgot admin password | Set a new ADMIN_PASSWORD, Redeploy |
| New content missing | Star it in Drive; it publishes Monday; read the weekly report |

**Still to do:** confirm “CFI Partner”, donation amount descriptions, annual impact report; consent/details for photos on hold; review Hostinger Vulnerabilities; optional online giving and monitor email alerts.

**Reference:** docs/launch-readiness-2026-11-07.md, docs/go-live-regression-2026-11-07.md, ops/maintenance/JOB.md. **Tech Support:** support@syndyemadefoundation.org
