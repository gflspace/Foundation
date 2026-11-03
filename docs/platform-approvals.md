# Platform build: what needs the Foundation's approval

The site follows one rule: only documented facts are published as achievements. These items are built and ready, but stay hidden or labelled until the Foundation confirms them.

## Hidden until approved

| Item | Where | How to switch it on |
| --- | --- | --- |
| Founder statement ("True impact is not measured by what we have…") | `founderStatement` in `lib/platform.ts` | This is proposed copy, not a verified quotation. Get Syndy Emade's approval (or her own words), then set `approved: true`. It appears as "A message from the founder" on `/founder`. |
| WhatsApp contact button | `whatsappNumber` in `lib/platform.ts` | Add the Foundation's confirmed number (digits only, international format). Do not use the number from Syndy Emade's personal Instagram bio without her agreement. |
| "One Act of Kindness" campaigns | `campaigns` in `lib/platform.ts` | Add a campaign only for a specific, verified need, with a real target. Update `raised` from receipts only. The campaign then appears on the home page and on `/get-involved`; until then, `/get-involved` shows the explainer and a sign-up. |
| Publisher photos on press and story cards | `docs/press-images.md` | Set `status: "approved"` once permission is obtained. |

## Published but labelled, needing confirmation

| Item | Current label | What to confirm |
| --- | --- | --- |
| Women Empowerment pillar | "Emerging" | A single documented activity (Women's Day with the Wilmbi Foundation, date to confirm). Confirm which further activities are real programmes. |
| Community Development and Environmental Sustainability pillars | "Proposed" | No Foundation activity is documented yet. Change `status` in `pillars` (`lib/platform.ts`) only once Syndy or her team confirms established programmes. The For Earth's Sake beach clean-up does not name the Foundation, so it is not used. |
| Street children story location | "Douala (location to confirm)" | The film does not name the place. |
| "Each partnership gets a public project record" (Partnerships page and proposal PDF) | Commitment | Confirm the Foundation agrees to publish a record for every partnership. |
| Resources committed per project | "Not yet disclosed" | Decide which amounts may be published (Accountability page). |
| Annual impact report and financial summary | "Will be published once prepared and approved" | Provide the first report. |
| Christmas 2023 renovation | "Completion not yet reported" | Confirm whether the pledged renovation was completed. |

## Facts newly verified in this round

- **Launch date.** The Foundation launched on **Thursday 11 July 2019** at Mabanda-Bonaberi (Douala IV), donating food to more than 200 displaced people (Mimi Mefo Info, 14 Jul 2019). The journey and the stories now use this date.
- **Story quotes.** Every quotation mark on the site is a verbatim quote from a published article. Lines taken from film auto-captions are shown as reported speech, labelled "As said in the film", never in quotation marks. French versions of English quotes are marked "(traduit de l'anglais)". No beneficiary is named.

## How the dashboard counts

`indicators` in `lib/platform.ts`:
- Outcome figures (600+, 300, 200+, 1 family, 1 school) each link to their story.
- Reach figures are computed from the data: documented activities since July 2019 (the August 2019 introduction film is excluded), towns with documented work, partners, films and press.
- "Not yet reported" indicators (women reached, volunteers, communities beyond Douala and Limbe, funds per project) stay off the dashboard until verified.

The partnership proposal PDF repeats the same figures. Regenerate it with `NODE_PATH=$(npm root -g) node scripts/build-partnership-proposal.mjs` when they change.

## Not built in this round

- **Photo galleries per project.** These need the Foundation's own photos (the Instagram or Facebook export).
- **Partner and volunteer management, and CMS-driven reporting.** Form submissions already go to `FORMS_WEBHOOK_URL` (types: volunteer, partner, collaboration, newsletter, press), ready to connect to a CRM, Zapier or Make. A CMS or back office is a separate project.
- **A 60–90 second Foundation introduction video.** This needs new footage and beneficiary consent. The current one-minute film (2019) is used in the meantime.
