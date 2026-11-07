# Launch readiness: end-to-end test report

**Date:** Saturday 7 November 2026 · **Version tested:** `74048ec` (live on Hostinger) · **Tested by:** automated end-to-end run

## Decision: NO-GO for public launch today · GO for the private preview

The website itself is in very good shape: every page, form, link, the admin area, accessibility and mobile layout passed. Launch is blocked by **two setup items outside the code**: the real domain is not connected, and search engines are still told to stay away. *(Update, same day: the donation blocker B2 is resolved; see below.)* Each is a settings change, not a rebuild. Once they are done and re-tested, the decision becomes **GO**.

## Re-test on the real domain (7 Nov, evening): GO ✅ (launched)

- B1 ✅ resolved: syndyemadefoundation.org released from the other Hostinger account (ownership verified by TXT record), connected to the website in account u671799052, SSL active on the bare domain and www.
- B3 ✅ resolved: `NEXT_PUBLIC_NOINDEX=false`, `NEXT_PUBLIC_SITE_URL=https://www.syndyemadefoundation.org`. robots.txt allows indexing and lists the sitemap; pages send `index, follow`; share images and links use the real domain.
- S1 ✅ resolved: DKIM live.
- Live checks: health (storage + mail) OK; all 56 sitemap URLs on the real domain; donate (contact to give), get involved, a French story, accountability, press fact sheet and admin sign-in (still `noindex`) load over https.
- Deploys, the GitHub site monitor and the weekly maintenance job now target https://www.syndyemadefoundation.org.
- S2 ✅ resolved: a real Volunteer form was submitted on the live site; the visitor confirmation and the admin notification both arrived.

## Blockers (must fix before launch)

| # | Blocker | Evidence | Fix | Who |
|---|---|---|---|---|
| B1 | **The real domain doesn't show the website.** syndyemadefoundation.org and www point to GoDaddy addresses (15.197.148.33, 3.33.130.190); the address could not be loaded. The site only exists at forestgreen-owl-883522.hostingersite.com. | Public DNS (dns.google), fetch failed | In Hostinger, connect the domain to the website. Then in GoDaddy DNS, set the `@` A record to Hostinger's IP (shown in hPanel) and keep `www` as is. Leave MX, SPF, DMARC and the verification TXT untouched. Hostinger then installs SSL. | Admin (DNS) + me (check) |
| B2 | ✅ **Resolved 7 Nov:** the Donate page and pop-up now show “Give by getting in touch” (email to support@, pre-filled) until a payment method is switched on, and the card/PayPal/Mobile Money claims are hidden. Each method reappears automatically once configured (see `lib/giving.ts`). *Original finding:* **No donation method works.** Card (Stripe), Mobile Money (Flutterwave) and PayPal are all unconfigured, and each one says "being set up, try the other", so a visitor can't give at all. The site also claims "PCI-compliant payments through Stripe, PayPal and Flutterwave". | Code + Hostinger variables (no `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_FLW_LINK`, `NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID`) | Set up at least one method. **Mobile Money via Flutterwave** suits donors in Cameroon best, and **PayPal Donate** suits donors abroad. Stripe may not accept a Cameroon-registered organisation, so check before relying on it. Until then, I can change the Donate page to "Contact us to give" and remove the unconfigured methods. | Admin (accounts) + me (wiring) |
| B3 | **Search engines are blocked.** The site sends `noindex` and robots.txt blocks Google, which is right for a preview but wrong for launch. The sitemap and site address still use the temporary hostingersite.com URL. | Live robots.txt and sitemap | After B1: set `NEXT_PUBLIC_NOINDEX=false` and `NEXT_PUBLIC_SITE_URL=https://www.syndyemadefoundation.org`, then rebuild. | Me (after B1) |

## Should fix before launch (not blocking)

| # | Item | Why it matters | Fix |
|---|---|---|---|
| S1 | **DKIM record missing**, so Titan rates email reputation "poor" | Visitor confirmations and reports may land in spam | Titan → Improve Email Reputation → copy the DKIM record into GoDaddy DNS |
| S2 | **Live form round-trip not yet confirmed**: does a real visitor get the confirmation email, and does admin@ get the notification? | Email sending is proven (the report email was delivered), but a live form submission wasn't (my tools can't submit forms on the live site) | Submit one real volunteer form on the live site and check both inboxes |
| S3 | **Content still to confirm**: "CFI Partner" in the partners list, and what each donation amount funds | The site must not state unverified facts | Admin confirms or removes them |
| S4 | **Photos on hold**: 14 newborn/ward photos (consent) and 7 unidentified photos | Already excluded from the site, so no risk; they can be added once cleared | Admin provides consent or identification |
| S5 | **Monitor email alerts**: the GitHub monitor alerts by GitHub issue only | Faster alerting by email | Add `SMTP_*` and `ALERT_EMAIL` as GitHub Actions secrets |

## What was tested and passed

| Area | Test | Result |
|---|---|---|
| Code | Type check, lint, production build, duplicate guard | ✅ All pass (78 images, 12 timeline entries, no duplicates) |
| Pages | All 56 sitemap pages (28 English + 28 French) loaded in a real browser | ✅ 56/56 load (HTTP 200), each has exactly one main heading |
| Links | Every internal link found on those pages | ✅ 66/66 work, 0 broken |
| Images | Gallery, YouTube thumbnails, founder photo | ✅ Load on the live server (the local errors came only from the test container's network) |
| Mobile | Every page at phone width (390 px) | ✅ No sideways scrolling on any page |
| Accessibility | axe-core WCAG 2 A/AA on all 56 pages | ✅ 0 violations |
| Forms | Volunteer, partner, press, collaboration, newsletter, donate-page interest form | ✅ All save and show a reference number (e.g. SEF-VOL-261107-1GUG5) |
| Form rules | Bad email, missing name, required City/Country, "Other" requires a message | ✅ All correctly rejected |
| Spam protection | Hidden honeypot field | ✅ Bot submissions silently dropped |
| French | Forms and labels in French | ✅ |
| Admin | Wrong password rejected, sign-in, submissions listed, search, filters, retry emails, sign out | ✅ All work (relative redirects fixed today) |
| Live health | /api/health on the live site | ✅ Storage OK, email configured |
| Email | Weekly report sent from admin@ via the website | ✅ Delivered ("sent") |
| Email DNS | MX (Titan), SPF, DMARC, verification TXT | ✅ Correct · ⚠️ DKIM missing (S1) |
| Forwarders | contact@, info@, support@ → admin@ | ✅ Confirmed by you earlier today |
| Monitoring | GitHub Site monitor, every 15 minutes | ✅ Running: 11/11 checks passing, 0 open alerts |
| Maintenance | Weekly job (Mondays 06:17 Douala), Drive connected, report email | ✅ Scheduled; first run Mon 9 Nov |
| Security | HTTPS certificate on the preview address | ✅ Valid (renews automatically) |

## Launch checklist (in order)

1. Choose the donation method(s) and create the accounts (B2). Or tell me to switch the Donate page to "Contact us to give" for now.
2. Connect the domain in Hostinger and update the GoDaddy `@` record (B1).
3. Add the DKIM record (S1).
4. I switch on search indexing and the real address, rebuild and redeploy (B3).
5. Submit one real form on www.syndyemadefoundation.org and confirm both emails arrive (S2).
6. I re-run this end-to-end test against the real domain. If it's all green: **GO**.
