# Phase 1: Environment assessment and proposed architecture

Inspected on 7 November 2026. Nothing was changed in GoDaddy, Hostinger or the website during this phase.

## 1. What actually exists

| Area | Finding | Evidence |
|---|---|---|
| Domain | `syndyemadefoundation.org` is registered at **GoDaddy** (registered 3 Nov 2026, expires 3 Nov 2027). `syndyemadefoundation.com` is **not** registered (available). | Public registry (RDAP) record; GoDaddy availability check |
| DNS | GoDaddy DNS (`ns11/ns12.domaincontrol.com`). The A records point to GoDaddy's **parking servers** (15.197.148.33, 3.33.130.190). The domain does not reach the website yet. | Public DNS lookup |
| Email | **No email exists on the domain.** No MX records, no SPF, no DMARC. Mail sent to `hello@` or `info@syndyemadefoundation.org` (both shown on the site) currently bounces. | Public DNS lookup |
| GoDaddy hosting | **None found.** The domain is parked; no GoDaddy hosting, WordPress or Microsoft 365 is serving it. | DNS points to parking |
| GoDaddy API | The connected GoDaddy API key is **rejected (HTTP 401)**, so DNS and products cannot be managed from here. | Domains and shopper endpoints both return 401 |
| Website hosting | **Hostinger Cloud Professional** (same account as the agency's other client sites). It runs the Next.js 14 app as a Node.js application with free SSL, at the private preview `forestgreen-owl-883522.hostingersite.com` (noindex). | Hostinger API |
| Hosting capabilities | Cloud Professional supports a persistent Node.js process, scheduled cron jobs, MySQL databases, daily backups and SSH. The account also has an active **Titan Business** email subscription and several VPS plans. | Hostinger subscriptions |
| Website stack | Next.js 14 (App Router, TypeScript), content in typed data files in Git (`gflspace/Foundation`). Every content change = commit → build → deploy. No CMS or database. | Repository |
| Forms | Volunteer, partner, collaboration, newsletter and press forms post to `/api/forms`, which validates them server-side and forwards to `FORMS_WEBHOOK_URL`. **That variable is not set**, so submissions only reach the server log. | `app/api/forms/route.ts` |
| Content intake | The Google Drive folder you shared is readable through the Drive connector and its public download links. Its folder names already match the Foundation's Facebook posts. | Phase work of 6 Nov |

**Conclusion:** GoDaddy's role is **domain and DNS only**. Hosting, cron, database and background work belong on the Hostinger plan you already pay for, so no upgrade is needed for those. Nothing on GoDaddy can run scheduled jobs today without buying a hosting product, which would duplicate Hostinger.

## 2. Recommended architecture (smallest change, no redesign)

```
 Administrator ──uploads──▶ Google Drive  FOUNDATION-CONTENT/ (shared with admin@)
                                  │  scheduled scan (every 15 min) + daily full scan
                                  ▼
 Hostinger Cloud: Node.js worker (cron) ── Claude API (vision + writing) ── MySQL
   • detect new/changed files (Drive change tokens; file hash = idempotency key)
   • analyse, group, caption, check duplicates / consent / missing notes
   • write a "proposal" to the mapping registry (MySQL) ──▶ Pending review
   • approved proposals ──▶ commit to GitHub (content data + images) ──▶ build & deploy
                                  │
 Website /admin (login, roles) ◀──┘  approvals, applications, health, logs, pause/run
 Forms ─▶ /api/forms ─▶ MySQL (reference ID) ─▶ SMTP: admin@ notification + applicant acknowledgement
 Monitoring: external uptime check every 5 min + Hostinger cron checks ─▶ alerts and weekly report to admin@
```

Why these choices:
- **Email: a mailbox on the Foundation's domain.** Use Hostinger's Titan Business (an account subscription already exists) or GoDaddy Microsoft 365. Either needs MX, SPF, DKIM and DMARC records in GoDaddy DNS. The website sends mail through that mailbox's SMTP, so no extra provider is needed.
- **Repository: Google Drive.** GoDaddy offers no collaborative file storage suited to this. Drive is already in use and easy for a non-technical administrator. *(Updated 2026-11-07)* FOUNDATION-CONTENT holds 7 upload folders (Photos, Videos, Blog-Posts, News, Announcements, Press-Releases, Documents). A daily scheduled maintenance job reads it through the Google Drive connector, never moves or deletes files, and publishes only files the admin has starred. See ops/maintenance/JOB.md.
- **Publishing through Git:** the site has no database-backed CMS, and adding one would be a rebuild. The worker writes the same data files I've been editing by hand, so the design stays identical, every publication is a reviewable commit, and **rollback = revert**.
- **AI only where judgement is needed** (reading photos, notes and documents; drafting captions and articles). Everything else is deterministic code. Nothing is auto-published that the governance rules route to approval (children and vulnerable people, money, official statements, figures, new programmes).
- **Monitoring independent of Claude:** cron on Hostinger plus a free external uptime monitor, so an outage of the server itself is still detected.

## 3. Status of each requirement

| Requirement | Status |
|---|---|
| Environment assessment | **Done** (this document) |
| Admin mailbox `admin@syndyemadefoundation.org` | **Awaiting authorisation:** choose provider (cost) + DNS access |
| SPF, DKIM, DMARC | Awaiting DNS access |
| Form storage, reference IDs, admin email, acknowledgements, delivery log, retry | **Ready to build**; testable once the mailbox exists |
| Content repository on Drive with folder tree | Ready to build; needs a Google service account (Google Cloud project) |
| Detection, AI analysis, mapping registry, approval workflow, publishing | Ready to build after the above; needs a Claude API key for the server and a GitHub deploy token |
| Monitoring, alerts, weekly report, backups | Ready to build; alerts need the mailbox |
| Admin dashboard | Ready to build after storage and forms |
| Connect the domain to the website | Was on hold at your request; needed for a real `admin@` sender reputation and public launch |

## 4. Blockers and costs

1. **GoDaddy access.** The GoDaddy API key in this environment is rejected. Either renew it, or (simpler) add the DNS records by hand from a list I provide, or move DNS to Hostinger.
2. **Mailbox cost.** Titan Business on Hostinger (an account subscription already exists; one more mailbox may be a few dollars a month) or GoDaddy Microsoft 365 (about $7–10 per user per month).
3. **Claude API usage** for content analysis: pay-per-use; a few dollars a month at the Foundation's likely volume.
4. **Google service account:** free (Google Cloud project).
5. Everything else runs on the existing Hostinger plan at no extra cost.

## 5. Build order after approval

Phase 2: mailbox, DNS (MX, SPF, DKIM, DMARC), forms with storage, notifications and acknowledgements → tests A and B.
Phase 3: Drive repository and service account. Phase 4: content engine → tests C–G and J.
Phase 5: monitoring, backups and alerts → tests H and I. Phase 6: `/admin` dashboard and full QA.
