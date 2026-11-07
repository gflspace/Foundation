# Website operations: setup steps, configuration and test results

Built 7 November 2026 on top of the existing site, with no change to its design, pages or navigation.
For the environment assessment, see `platform-operations-assessment.md`.

## A. What you need to do (about 20 minutes)

### 1. Create the mailbox in Hostinger (Titan)
1. hPanel → **Emails** → *Add domain* → `syndyemadefoundation.org` (choose “I have this domain elsewhere”). If the existing Titan Business plan is tied to another domain, add a mailbox plan for this one.
2. Create the mailbox **`admin@syndyemadefoundation.org`** with a strong password.
3. Optional but recommended: aliases `hello@` and `info@` → `admin@` (both are already printed on the site and in old Facebook posts).
4. In the Titan panel, open *DNS records* and copy the **DKIM** value it shows for the domain.

### 2. Add these records in GoDaddy (Domain → DNS → Add record)
| Type | Name | Value | Priority / TTL |
|---|---|---|---|
| MX | @ | `mx1.titan.email` | 10 · 1 hour |
| MX | @ | `mx2.titan.email` | 20 · 1 hour |
| TXT | @ | `v=spf1 include:spf.titan.email ~all` | 1 hour |
| TXT | `titan1._domainkey` | *(DKIM value from the Titan panel, step 1.4)* | 1 hour |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:admin@syndyemadefoundation.org; fo=1` | 1 hour |

**If you use Hostinger Email** (included with the Cloud plan) instead of Titan, use the values hPanel shows you. They are normally MX `mx1.hostinger.com` (5) and `mx2.hostinger.com` (10), SPF `v=spf1 include:_spf.mail.hostinger.com ~all`, and DKIM as CNAME records. Then use `SMTP_HOST=smtp.hostinger.com` in step 3. Always prefer the exact values hPanel displays over this table.

Do not delete GoDaddy's existing NS or SOA records. After 2–4 weeks of clean reports, change DMARC to `p=quarantine`.
**When you approve the public launch**, the website records (A/CNAME to Hostinger) will be added the same way. They are not part of this step, so the preview stays private.

Tell me when these are in: I'll verify every record and send the first real test emails.

### 3. Server settings in Hostinger (hPanel → Websites → the Node.js app → Environment variables)
| Variable | Value |
|---|---|
| `SMTP_HOST` | `smtp.titan.email` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `admin@syndyemadefoundation.org` |
| `SMTP_PASS` | *(the mailbox password; enter it only here, never in chat)* |
| `ADMIN_EMAIL` | `admin@syndyemadefoundation.org` |
| `ADMIN_PASSWORD` | a long passphrase (at least 12 characters) for the `/admin` dashboard |
| `SEF_TIMEZONE` | `Africa/Douala` |

Then redeploy (or ask me to). `/admin` returns *Not found* until `ADMIN_PASSWORD` is set.

### 4. Email alerts from the monitor (GitHub → gflspace/Foundation → Settings → Secrets → Actions)
Add `ALERT_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS` (same values). Until then, alerts arrive as GitHub issues, which GitHub emails to the repository owner.

## B. How it works

**Forms (all five: volunteer, partner, collaboration, press, newsletter)**
1. Validated on the server (required fields, email format, length limits), with a spam trap and a rate limit of 8 submissions per 10 minutes per visitor.
2. Stored immediately with a unique reference such as `SEF-VOL-261107-1GK8P` in `~/sef-data/submissions.jsonl` on the hosting account. That folder is outside the app, so redeploys never erase it, and it is readable by the account owner only.
3. In the background: an admin email (“New Volunteer Application – Name [ref]”, Reply-To set to the applicant) and an acknowledgement in the visitor's language, both carrying the reference. Each email gets 3 attempts, and every attempt is logged to `email-log.jsonl`.
4. The visitor sees the reference on the thank-you screen. Failures can be re-sent from the dashboard.

**Dashboard `/admin`** (password, 12-hour signed session, locked for 15 minutes after 5 failed attempts)
- Website health from the latest monitor run, mail status, totals.
- Every application and message, filterable by type, with delivery status.
- Email delivery log and a “Retry failed emails” button.

**Monitoring** (`scripts/ops/monitor.mjs`, run every 15 minutes by GitHub Actions on GitHub's servers, so it doesn't depend on Claude or on the website's own server)
- Checks: 7 key pages (HTTP status and response time), gallery images, app health (storage and mail), the form endpoint, and SSL certificate days left (alerts under 14 days).
- Alerts: one alert when a problem starts and one when it resolves. Duplicate alerts are suppressed while an incident stays open.
- Weekly report: Mondays 08:17 Douala time.

**Content repository** (Google Drive `FOUNDATION-CONTENT`, created in gflspace@gmail.com's Drive; share it with `admin@` once the mailbox exists)
- The full tree from the brief: 8 sections, 33 subfolders.
- `ops/content-registry.json` maps every folder to its website destination and approval rule. Every rule starts as **admin approval**; change one to `auto` only when you decide.

## C. Status

| Requirement | Status |
|---|---|
| Phase 1 assessment and architecture | **Implemented** |
| Form storage, reference IDs, validation, spam protection | **Implemented and live** on the preview (`/api/health`: storage ok) |
| Admin notification and applicant acknowledgement, retries, delivery log | **Implemented**, tested against a test mail server. **Awaiting the mailbox** for real delivery |
| SPF, DKIM, DMARC | **Awaiting you** (records in A.2) |
| Admin dashboard | **Implemented**; live once `ADMIN_PASSWORD` is set |
| Scheduled monitoring, de-duplicated alerts, weekly report | **Implemented**; scheduled on GitHub. Email alerts await the SMTP secrets |
| Content repository folders and mapping registry | **Implemented** (Drive tree created; registry committed) |
| Automatic detection, AI analysis and publishing of new uploads | **Not yet built.** Needs: a Google service account with read access to the folder, a Claude API key for the server, and a GitHub token able to commit content |
| Backups | **Partly in place:** website code is in Git and Hostinger takes daily backups of the hosting account. Not yet built: a nightly copy of `~/sef-data` to Drive `08-SYSTEM-OPERATIONS/Backup-Reports` (comes with the content engine) |
| Domain connected to the website | **On hold**, as you asked |

## D. Acceptance tests run on 7 November 2026

| Test | Result |
|---|---|
| A. Volunteer application | **Passed (local).** Stored with reference; admin email “New Volunteer Application – Amina Test [SEF-VOL-261107-1GK8P]” with Reply-To set to the applicant; French acknowledgement with the reference. Live preview: stored; email awaits the mailbox |
| B. Partner application | **Passed.** Classified as `partner` (SEF-PAR-…); subject uses the organisation name |
| Validation and spam | Passed: invalid email rejected (400); spam-trap submission silently dropped; empty submission rejected |
| J (forms). Mail server down | **Passed.** Submission saved, visitor answered in 50 ms, 3 attempts logged, marked failed; “Retry failed emails” delivered all 3 pending submissions with no duplicates |
| H. Website outage | **Passed (local).** Server stopped: 9 checks failed and 9 alerts sent; next run sent no duplicates; on recovery, one “RESOLVED” per incident |
| I. Scheduled operation | **Scheduled.** The workflow is registered and active on GitHub (every 15 minutes); the first automatic run will be confirmed |
| C–G. Photo, video, blog, announcement, new folder | **Not run yet:** the content engine isn't built (see C) |
| Admin dashboard | Passed: hidden on the live preview without a password; wrong password rejected; correct password shows all submissions and the email log |
