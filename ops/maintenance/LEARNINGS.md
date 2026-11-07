# Maintenance learnings (append only)

Lessons the maintenance agent has learned. Read before every run; add one line per real lesson.
Format: `- YYYY-MM-DD · what happened · what to do next time`

- 2026-11-07 · Back-to-school figures differ between sources · Show both figures and say so; never pick one silently.
- 2026-11-07 · Christmas 2023 was reported twice but was one home · Check the journey timeline for an existing entry before adding one.
- 2026-11-07 · Wording "street children" was replaced by "young people" at the Foundation's request · Use "young people".
- 2026-11-07 · Newborn and ward photos are held pending consent · Never publish photos of identifiable patients or children without a consent record.
- 2026-11-07 · The YouTube channel "Syndy Emade TV" is the founder's, not the Foundation's · Don't present it as the Foundation's channel; ask admin before linking videos.
- 2026-11-07 · Facebook and Instagram are login-walled · Use only the official public embed for captions; never bypass logins.
- 2026-11-07 · A scheduled task that starts a fresh session gets no connectors here, so Drive and Firecrawl were missing · Run the job in the admin's main session, which holds the connectors.
- 2026-11-07 · Admin asked that nothing already on the site be added twice · Run scripts/ops/check-duplicates.mjs on every candidate; same event = update the existing record, never add a second.
- 2026-11-07 · While freeing the domain from another Hostinger account, the Foundation's own website in the main account was deleted (site down ~1h, env vars lost) · Never delete a website to free a domain without first checking which account and site it is; the site was restored from GitHub onto a new Hostinger website.
