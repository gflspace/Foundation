# Go-live regression test: www.syndyemadefoundation.org

**Date:** 7 November 2026 · **Version:** `3ec1d5b` (live) · **Decision: GO ✅**

## Fixed in this release
- Donate popup: "Prefer to give your time? Volunteer or partner with us" now opens https://www.syndyemadefoundation.org/get-involved (French: /fr/s-engager) and closes the popup. It previously pointed to the Donate page itself, so nothing visibly happened.

## Results
| Area | Test | Result |
|---|---|---|
| Live site | https on bare domain and www, valid SSL, health (storage + email) | ✅ |
| Search | robots.txt allows indexing, sitemap on real domain, pages `index, follow`, admin `noindex` | ✅ |
| Pages | All 56 sitemap pages (EN + FR) load, one main heading each | ✅ 56/56 |
| Links | Internal links on all pages | ✅ 66/66, 0 broken |
| Buttons | 357 buttons clicked across all pages, no page errors | ✅ |
| Donate popup | Opens from header (EN/FR), email links, volunteer link opens Get Involved and closes, X and Escape close | ✅ |
| Navigation | Header links, EN→FR switch keeps the page, mobile menu | ✅ |
| Footer | Internal links, contact@/info@/support@ addresses | ✅ |
| Media | Filters, deep links open items, story photo lightbox | ✅ |
| Downloads | Fact sheets EN/FR, partnership proposal, press kit | ✅ |
| Forms | Volunteer, donate-page interest, newsletter, partner, press, collaboration; validation; honeypot | ✅ |
| Live form | Real volunteer submission: visitor confirmation + admin notification received | ✅ |
| Admin | Wrong password rejected, sign-in, list, search, filter, retry emails, sign out | ✅ |
| Accessibility | axe-core WCAG 2 A/AA on all 56 pages | ✅ 0 violations |
| Mobile | All pages at 390 px, no sideways scrolling | ✅ |
| External images | YouTube thumbnails and founder photo via the live image optimiser | ✅ |
| Email DNS | MX (Titan), SPF, DKIM, DMARC | ✅ |
| Site monitor | GitHub workflow active, targets the real domain, last run passed, 0 open alerts | ✅ |
| Weekly maintenance | Scheduled task enabled (next: Mon 9 Nov 06:17 Douala), Drive folders reachable, activity and duplicate scripts pass, deploy script targets the real domain | ✅ |

Note: GitHub runs the 15-minute monitor only every few hours in practice; its first run against the real domain is the next scheduled one.

## Open items (not blocking)
1. Delete the TXT record `Hostinger-domain-verification-1` at GoDaddy.
2. Add the site to Google Search Console and submit the sitemap.
3. Confirm content: "CFI Partner", what each donation amount funds, the "annual impact report" promise.
4. Photos on hold until consent / identification.
5. Review Hostinger's "Vulnerabilities" notice (npm packages).
6. Optional: email alerts for the monitor; online giving (Flutterwave / PayPal).
