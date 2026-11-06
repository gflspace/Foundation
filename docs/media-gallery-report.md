# Media gallery report: Google Drive photos

Run on 6 November 2026 on the Drive folder supplied (`1MgwcPtXLlK6xf4nqi2c9e_HzVLTLFpc3`). It replaces the gaps recorded in `docs/media-recovery.md`.

## Summary

| | Count |
|---|---|
| Files in the folder (14 subfolders + root) | 198 (187 photos, 11 notes and documents) |
| Photos published on the website | **78**, in 9 albums |
| Held back for approval (consent, identification) | 23 |
| Excluded (privacy, duplicate, not documentary, not an activity) | 14 |
| Not selected (near-duplicates or weaker shots of a published moment) | 72 |

**Verification.** Every album is matched to the Foundation’s own Facebook post. The folder names are the opening words of those posts. The posts’ public embeds, read on 3 November 2026, confirmed each caption and date (`docs/media-recovery.md`), and the notes in the folders repeat them word for word. Every photo was inspected visually. Captions describe only what is visible and what the post states. People are not named unless an on-image label shows the name (the founder, on the launch photos).

**Rights.** These are the Foundation’s own photographs, supplied by its team for its website. Credits: “Blue Rain Photography” (watermark on the Dec 2020 Bonaberi set) and “Amas flash” (named in the Women’s Day post). Watermarks were kept. Metadata was stripped and the files were re-encoded as progressive JPEG at their original resolution. Next.js serves resized, lazy-loaded versions.

## Gallery classification and story register

| Story (existing page unless marked new) | Website URL | Category | Photos | Cover | Source of record | Credit |
|---|---|---|---|---|---|---|
| The first outreach: food for more than 200 displaced people | `/stories/first-outreach-2019` · FR `/fr/histoires/first-outreach-2019` | Humanitarian Relief | 10 | #166 | [Syndy Emade Foundation on Facebook, 12 Jul 2019](https://www.facebook.com/photo/?fbid=1070497749808060) | Syndy Emade Foundation |
| Back to school 2019 | `/stories/back-to-school-2019` · FR `/fr/histoires/back-to-school-2019` | Education & Youth Development | 10 | #004 | [Syndy Emade Foundation on Facebook, 18 Aug 2019](https://www.facebook.com/photo/?fbid=1093706604153841) | Syndy Emade Foundation |
| **New:** Clothes for families at Makepe Missoke | `/stories/clothes-makepe-2020` · FR `/fr/histoires/clothes-makepe-2020` | Community Development | 6 | #051 | [Syndy Emade Foundation on Facebook, 28 Jan 2020](https://www.facebook.com/photo/?fbid=1229237193934114) | Syndy Emade Foundation |
| Keeping a school in Limbe safe from COVID-19 | `/stories/covid-school-kits-limbe-2020` · FR `/fr/histoires/covid-school-kits-limbe-2020` | Education & Youth Development | 9 | #142 | [SYNDY EMADE TV (YouTube)](https://www.youtube.com/watch?v=vqR0Lb9Wguo) | Syndy Emade Foundation |
| Supplies for families who fled the crisis | `/stories/displaced-families-bonaberi-2020` · FR `/fr/histoires/displaced-families-bonaberi-2020` | Humanitarian Relief | 6 | #131 | [Syndy Emade Foundation on Facebook, 9 Sep 2020](https://www.facebook.com/photo/?fbid=1401915449999620) | Syndy Emade Foundation |
| A day with children living on the street | `/stories/street-children-2021` · FR `/fr/histoires/street-children-2021` | Education & Youth Development | 9 | #084 | [Syndy Emade Foundation on Facebook, 3 Dec 2020](https://www.facebook.com/photo/?fbid=1472294789628352) | Syndy Emade Foundation |
| **New:** Ending 2020 with displaced families at Bonaberi | `/stories/year-end-bonaberi-2020` · FR `/fr/histoires/year-end-bonaberi-2020` | Humanitarian Relief | 12 | #062 | [Syndy Emade Foundation on Facebook, 31 Dec 2020](https://www.facebook.com/photo/?fbid=1492129210978243) | Blue Rain Photography |
| A home for a mother and her three sons | `/stories/a-home-for-a-family-2023` · FR `/fr/histoires/a-home-for-a-family-2023` | Humanitarian Relief | 9 | #023 | [Syndy Emade Foundation on Facebook, 25 Dec 2023](https://www.facebook.com/photo/?fbid=704772211754695) | Syndy Emade Foundation |
| **New:** A first gift for newborns, on International Women’s Day | `/stories/womens-day-limbe-2024` · FR `/fr/histoires/womens-day-limbe-2024` | Women Empowerment | 7 | #103 | [Syndy Emade Foundation on Facebook, 8 Mar 2024](https://www.facebook.com/photo/?fbid=746115817620334) | Amas flash |

Galleries live in two places, with no new pages and no new navigation:
- **Story pages:** an “In pictures” section after “What changed”. Photos run in the order of the day (arrival → help → outcome → people), the first one large. Click to enlarge; the lightbox supports keyboard arrows and Escape, shows a counter, and puts the credit and a link to the original post with every album. The best photo is also the story’s cover on the Stories page and its story cards.
- **Media page:** a new “In pictures” section (`/media#in-pictures`), with albums grouped by focus area. Each group has an introduction, a cover, three thumbnails, the photo count, the date, the place, the credit, and a link to the full story. Environmental Sustainability has no album because no activity is documented. Founder & Foundation activities (team photos) and Press & Media have no separate album: team photos sit inside the albums they belong to, and press coverage stays in the media library.

## Implementation report

**Added**
- `public/gallery/<story>/NN.jpg`: 78 optimised photos (13 MB).
- `lib/gallery.ts`: albums with bilingual captions, used as alt text; regenerated by `scripts/gallery/` from `select.json` and `captions.json`.
- `components/PhotoGallery.tsx` (story gallery and lightbox, built on the existing `Modal`) and `components/MediaGallery.tsx`.
- Three new stories in English and French, in the existing Stories structure: `clothes-makepe-2020`, `year-end-bonaberi-2020` (with its film, partner B&T Logistics), and `womens-day-limbe-2024` (partner Wilmbi Foundation).

**Updated (facts from the Foundation’s posts)**
- *A home for a mother and her three sons:* the outcome now follows the 25 Dec 2023 post (a year’s rent, full renovation with new drainage, refurnished, food stocked), which the photos show. It replaces “renovation not yet reported”. The post is added as a source, and the cover is now the Foundation’s photo instead of the publisher’s.
- *A day with children living on the street:* the date changes from Feb 2021 (the film’s upload date) to **Dec 2020**, the date of the post with the same buckets, soap, umbrellas and meal. This also applies to its journey moment.
- *Women’s Day:* journey date confirmed as 8 Mar 2024, with Limbe District Hospital and new mothers, and the post as source.
- *COVID-19 Limbe:* adds “Government High School Batoke and Bobende”, named in the Foundation’s post.
- *Launch, Sept 2020 and back-to-school stories:* the Facebook posts are added as sources, and the venues come from the photos (Mount Zion Bilingual School, Mambanda; Ancient Route Gateway).
- Stories can now have no programme, so the clothes giveaway isn’t forced into one. Story cards, story pages and the accountability page then show the pillar instead.

**Unchanged:** framework, navigation, homepage layout, design system, every other page and feature. Type check and build pass. The axe audit finds no violations on 23 pages at 1440 and 390 px. There is no horizontal scroll on mobile and no broken images.

## Decisions (6 November 2026)

- **Consent:** the 16 photos of identifiable vulnerable people stay held until the Foundation confirms consent. Consent for the other identifiable people in published albums is still to be confirmed before public launch.
- **Back-to-school figures:** the film figures stay, and the Facebook post’s figures (300+ children, 25 sponsored) are added beside them, with both sources named.
- **Street outreach:** retitled “A day with young people living on the street”, with the activity details from the 3 Dec 2020 post (brushes, masks, sanitiser).
- **Christmas 2023:** confirmed as one home. The story now reads: a year’s rent on a more spacious home, fully renovated with new drainage, refurnished and stocked.

## Still open

1. Unidentified sets: “Special thank the CEO” (#125–129) and #137–138.
2. The ELONE Foundation’s banner appears at the Dec 2020 street outreach, but it is not listed as a partner.
3. The Facebook URL for the COVID-19 Limbe post (ELONE) was not located; date August 2020 from the film.
4. Clothes giveaway date: 26 or 27 Jan 2020 (shown as January 2020).
5. The 3 Facebook videos are unavailable.

## Media inventory

| # | Folder | File | Size | Identified event | Status |
|---|---|---|---|---|---|
| 000 | BackToSchool campaign | note.txt | — | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Note/document: caption text used for verification |
| 001 | BackToSchool campaign | syndy.jpg | 954×637 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 002 | BackToSchool campaign | syndy0.jpg | 944×631 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 003 | BackToSchool campaign | syndy01.jpg | 955×627 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 004 | BackToSchool campaign | syndy02.jpg | 954×637 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Published: `back-to-school-2019` photo 2 |
| 005 | BackToSchool campaign | syndy03.jpg | 953×635 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 006 | BackToSchool campaign | syndy04.jpg | 956×645 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Published: `back-to-school-2019` photo 7 |
| 007 | BackToSchool campaign | syndy06.jpg | 953×641 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Published: `back-to-school-2019` photo 3 |
| 008 | BackToSchool campaign | syndy07.jpg | 955×635 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Published: `back-to-school-2019` photo 5 |
| 009 | BackToSchool campaign | syndy08.jpg | 961×637 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Published: `back-to-school-2019` photo 6 |
| 010 | BackToSchool campaign | syndy09.jpg | 957×635 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 011 | BackToSchool campaign | syndy10.jpg | 958×638 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Published: `back-to-school-2019` photo 4 |
| 012 | BackToSchool campaign | syndy11.jpg | 956×630 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Published: `back-to-school-2019` photo 10 |
| 013 | BackToSchool campaign | syndy12.jpg | 954×636 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 014 | BackToSchool campaign | syndy13.jpg | 674×888 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 015 | BackToSchool campaign | syndy14.jpg | 955×636 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 016 | BackToSchool campaign | syndy15.jpg | 942×629 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 017 | BackToSchool campaign | syndy16.jpg | 951×633 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Published: `back-to-school-2019` photo 9 |
| 018 | BackToSchool campaign | syndy17.jpg | 952×638 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Published: `back-to-school-2019` photo 8 |
| 019 | BackToSchool campaign | syndy18.jpg | 951×635 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 020 | BackToSchool campaign | syndy19.jpg | 955×636 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Not selected: similar to a published photo |
| 021 | BackToSchool campaign | syndy20.jpg | 893×627 | Back to school, 17 Aug 2019 (FB 18 Aug 2019) | Published: `back-to-school-2019` photo 1 |
| 022 | Christmas outreach | syndy01.jpg | 1302×901 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Held: the visually impaired mother and her sons are identifiable. Needs the family’s consent |
| 023 | Christmas outreach | syndy02.jpg | 1223×904 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Published: `a-home-for-a-family-2023` photo 3 |
| 024 | Christmas outreach | syndy03.jpg | 611×908 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Published: `a-home-for-a-family-2023` photo 8 |
| 025 | Christmas outreach | syndy04.jpg | 1349×905 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Held: the visually impaired mother and her sons are identifiable. Needs the family’s consent |
| 026 | Christmas outreach | syndy05.jpg | 1287×904 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Published: `a-home-for-a-family-2023` photo 1 |
| 027 | Christmas outreach | syndy06.jpg | 1300×904 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Published: `a-home-for-a-family-2023` photo 2 |
| 028 | Christmas outreach | syndy07.jpg | 1292×904 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Published: `a-home-for-a-family-2023` photo 5 |
| 029 | Christmas outreach | syndy08.jpg | 1277×905 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Published: `a-home-for-a-family-2023` photo 6 |
| 030 | Christmas outreach | syndy09.jpg | 1291×901 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Published: `a-home-for-a-family-2023` photo 7 |
| 031 | Christmas outreach | syndy10.jpg | 607×888 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Published: `a-home-for-a-family-2023` photo 9 |
| 032 | Christmas outreach | syndy11.jpg | 1299×903 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Published: `a-home-for-a-family-2023` photo 4 |
| 033 | Christmas outreach | syndy12.jpg | 1290×902 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Not selected: similar to a published photo |
| 034 | Christmas outreach | syndy13.jpg | 1349×851 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Not selected: similar to a published photo |
| 035 | Christmas outreach | syndy14.jpg | 606×903 | Christmas 2023 home for a mother and her three sons (FB 25 Dec 2023) | Not selected: similar to a published photo |
| 036 | December charity | syndy01.jpg | 959×632 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Published: `street-children-2021` photo 2 |
| 037 | December charity | syndy02.jpg | 959×640 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 038 | December charity | syndy03.jpg | 957×634 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Published: `street-children-2021` photo 3 |
| 039 | December charity | syndy04.jpg | 953×634 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 040 | December charity | syndy05.jpg | 601×891 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 041 | December charity | syndy06.jpg | 955×641 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Published: `street-children-2021` photo 8 |
| 042 | December charity | syndy07.jpg | 956×635 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Published: `street-children-2021` photo 6 |
| 043 | December charity | syndy08.jpg | 956×633 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Published: `street-children-2021` photo 7 |
| 044 | December charity | syndy09.jpg | 951×635 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 045 | December charity | syndy10.jpg | 938×634 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 046 | December charity | syndy11.jpg | 953×638 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Published: `street-children-2021` photo 9 |
| 047 | giveaway of clothes at Makepe Missoke | NOTE.txt | — | Clothes giveaway, Makepe Missoke, Jan 2020 (FB 28 Jan 2020) | Note/document: caption text used for verification |
| 048 | giveaway of clothes at Makepe Missoke | syndy01.jpg | 947×626 | Clothes giveaway, Makepe Missoke, Jan 2020 (FB 28 Jan 2020) | Published: `clothes-makepe-2020` photo 2 |
| 049 | giveaway of clothes at Makepe Missoke | syndy02.jpg | 961×665 | Clothes giveaway, Makepe Missoke, Jan 2020 (FB 28 Jan 2020) | Published: `clothes-makepe-2020` photo 3 |
| 050 | giveaway of clothes at Makepe Missoke | syndy03.jpg | 957×639 | Clothes giveaway, Makepe Missoke, Jan 2020 (FB 28 Jan 2020) | Not selected: similar to a published photo |
| 051 | giveaway of clothes at Makepe Missoke | syndy04.jpg | 956×630 | Clothes giveaway, Makepe Missoke, Jan 2020 (FB 28 Jan 2020) | Published: `clothes-makepe-2020` photo 1 |
| 052 | giveaway of clothes at Makepe Missoke | syndy05.jpg | 953×638 | Clothes giveaway, Makepe Missoke, Jan 2020 (FB 28 Jan 2020) | Published: `clothes-makepe-2020` photo 4 |
| 053 | giveaway of clothes at Makepe Missoke | syndy06.jpg | 962×637 | Clothes giveaway, Makepe Missoke, Jan 2020 (FB 28 Jan 2020) | Not selected: similar to a published photo |
| 054 | giveaway of clothes at Makepe Missoke | syndy07.jpg | 604×899 | Clothes giveaway, Makepe Missoke, Jan 2020 (FB 28 Jan 2020) | Published: `clothes-makepe-2020` photo 5 |
| 055 | giveaway of clothes at Makepe Missoke | syndy08.jpg | 602×895 | Clothes giveaway, Makepe Missoke, Jan 2020 (FB 28 Jan 2020) | Published: `clothes-makepe-2020` photo 6 |
| 056 | IDP families at Bonaberi | syndy01.jpg | 1353×858 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 3 |
| 057 | IDP families at Bonaberi | syndy02.jpg | 1323×855 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 058 | IDP families at Bonaberi | syndy03.jpg | 1357×854 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 4 |
| 059 | IDP families at Bonaberi | syndy04.jpg | 1384×853 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 2 |
| 060 | IDP families at Bonaberi | syndy05.jpg | 1354×849 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 061 | IDP families at Bonaberi | syndy06.jpg | 1356×864 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 7 |
| 062 | IDP families at Bonaberi | syndy07.jpg | 1428×820 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 1 |
| 063 | IDP families at Bonaberi | syndy08.jpg | 1362×862 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 064 | IDP families at Bonaberi | syndy09.jpg | 1357×853 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 065 | IDP families at Bonaberi | syndy10.jpg | 1270×900 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 5 |
| 066 | IDP families at Bonaberi | syndy11.jpg | 1292×910 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 6 |
| 067 | IDP families at Bonaberi | syndy12.jpg | 1296×900 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 068 | IDP families at Bonaberi | syndy13.jpg | 1293×892 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 069 | IDP families at Bonaberi | syndy14.jpg | 1354×846 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 070 | IDP families at Bonaberi | syndy15.jpg | 1354×846 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Excluded: exact duplicate of #069 |
| 071 | IDP families at Bonaberi | syndy16.jpg | 1357×855 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 10 |
| 072 | IDP families at Bonaberi | syndy17.jpg | 1404×847 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 073 | IDP families at Bonaberi | syndy18.jpg | 1366×848 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 074 | IDP families at Bonaberi | syndy19.jpg | 1400×846 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 8 |
| 075 | IDP families at Bonaberi | syndy20.jpg | 1277×895 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 076 | IDP families at Bonaberi | syndy21.jpg | 1304×889 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 077 | IDP families at Bonaberi | syndy22.jpg | 609×903 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 9 |
| 078 | IDP families at Bonaberi | syndy23.jpg | 1350×845 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 079 | IDP families at Bonaberi | syndy24.jpg | 1353×842 | Year-end outreach, Gateway Bonaberi, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 080 | Impacting our Community and building hope | syndy01.jpg | 550×902 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 081 | Impacting our Community and building hope | syndy02.jpg | 955×640 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 082 | Impacting our Community and building hope | syndy03.jpg | 960×637 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 083 | Impacting our Community and building hope | syndy04.jpg | 613×906 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 084 | Impacting our Community and building hope | syndy05.jpg | 960×640 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Published: `street-children-2021` photo 1 |
| 085 | Impacting our Community and building hope | syndy06.jpg | 958×643 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 086 | Impacting our Community and building hope | syndy07.jpg | 954×636 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 087 | Impacting our Community and building hope | syndy08.jpg | 959×636 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 088 | Impacting our Community and building hope | syndy09.jpg | 600×903 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 089 | Impacting our Community and building hope | syndy10.jpg | 960×632 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Published: `street-children-2021` photo 4 |
| 090 | Impacting our Community and building hope | syndy11.jpg | 608×901 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Published: `street-children-2021` photo 5 |
| 091 | Impacting our Community and building hope | syndy12.jpg | 605×895 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 092 | Impacting our Community and building hope | syndy13.jpg | 601×899 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 093 | Impacting our Community and building hope | syndy14.jpg | 958×633 | Street outreach with young people, Dec 2020 (FB 3 Dec 2020) | Not selected: similar to a published photo |
| 094 | reaching out to schools, individuals, | note.txt | — | COVID-19 relief for Limbe schools (matched visually: same people and banners) | Note/document: caption text used for verification |
| 095 | reaching out to schools, individuals, | syndy01.jpg | 1070×713 | COVID-19 relief for Limbe schools (matched visually: same people and banners) | Published: `covid-school-kits-limbe-2020` photo 2 |
| 096 | reaching out to schools, individuals, | syndy02.jpg | 1061×713 | COVID-19 relief for Limbe schools (matched visually: same people and banners) | Published: `covid-school-kits-limbe-2020` photo 3 |
| 097 | reaching out to schools, individuals, | syndy03.jpg | 1072×706 | COVID-19 relief for Limbe schools (matched visually: same people and banners) | Not selected: similar to a published photo |
| 098 | reaching out to schools, individuals, | syndy04.jpg | 1066×709 | COVID-19 relief for Limbe schools (matched visually: same people and banners) | Published: `covid-school-kits-limbe-2020` photo 4 |
| 099 | reaching out to schools, individuals, | syndy05.jpg | 1064×714 | COVID-19 relief for Limbe schools (matched visually: same people and banners) | Not selected: similar to a published photo |
| 100 | reaching out to schools, individuals, | syndy06.jpg | 1063×705 | COVID-19 relief for Limbe schools (matched visually: same people and banners) | Published: `covid-school-kits-limbe-2020` photo 9 |
| 101 | special occasion of the international women’s day | enhancement.md | — | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Document (not media); not used |
| 102 | special occasion of the international women’s day | syndy01.jpg | 1210×895 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 103 | special occasion of the international women’s day | syndy02.jpg | 1208×890 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Published: `womens-day-limbe-2024` photo 1 |
| 104 | special occasion of the international women’s day | syndy03.jpg | 1208×896 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 105 | special occasion of the international women’s day | syndy04.jpg | 1257×905 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 106 | special occasion of the international women’s day | syndy05.jpg | 1199×904 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 107 | special occasion of the international women’s day | syndy06.jpg | 1209×901 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Published: `womens-day-limbe-2024` photo 2 |
| 108 | special occasion of the international women’s day | syndy07.jpg | 1254×902 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Published: `womens-day-limbe-2024` photo 6 |
| 109 | special occasion of the international women’s day | syndy08.jpg | 1206×909 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 110 | special occasion of the international women’s day | syndy09.jpg | 1205×897 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Published: `womens-day-limbe-2024` photo 4 |
| 111 | special occasion of the international women’s day | syndy10.jpg | 1209×901 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Published: `womens-day-limbe-2024` photo 3 |
| 112 | special occasion of the international women’s day | syndy11.jpg | 1199×905 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 113 | special occasion of the international women’s day | syndy12.jpg | 1208×900 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 114 | special occasion of the international women’s day | syndy13.jpg | 1204×911 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Published: `womens-day-limbe-2024` photo 5 |
| 115 | special occasion of the international women’s day | syndy14.jpg | 1207×905 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 116 | special occasion of the international women’s day | syndy15.jpg | 1210×907 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 117 | special occasion of the international women’s day | syndy16.jpg | 1207×902 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Published: `womens-day-limbe-2024` photo 7 |
| 118 | special occasion of the international women’s day | syndy17.jpg | 1208×902 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 119 | special occasion of the international women’s day | syndy18.jpg | 1205×902 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 120 | special occasion of the international women’s day | syndy19.jpg | 1210×912 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Not selected: similar to a published photo |
| 121 | special occasion of the international women’s day | syndy20.jpg | 1213×900 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 122 | special occasion of the international women’s day | syndy21.jpg | 1248×902 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 123 | special occasion of the international women’s day | syndy22.jpg | 1203×901 | Women’s Day with Wilmbi Foundation, Limbe District Hospital, 8 Mar 2024 | Held: mothers and newborns on the ward. Needs consent |
| 124 | Special thank the CEO | NOTE.txt | — | Unidentified (general thank-you post) | Note/document: caption text used for verification |
| 125 | Special thank the CEO | synd01.jpg | 1075×712 | Unidentified (general thank-you post) | Held: event not identified (the folder caption is a general thank-you). Needs identification |
| 126 | Special thank the CEO | synd02.jpg | 1044×711 | Unidentified (general thank-you post) | Held: event not identified (the folder caption is a general thank-you). Needs identification |
| 127 | Special thank the CEO | synd03.jpg | 1068×708 | Unidentified (general thank-you post) | Held: event not identified (the folder caption is a general thank-you). Needs identification |
| 128 | Special thank the CEO | synd04.jpg | 1075×602 | Unidentified (general thank-you post) | Held: event not identified (the folder caption is a general thank-you). Needs identification |
| 129 | Special thank the CEO | synd05.jpg | 1070×714 | Unidentified (general thank-you post) | Held: event not identified (the folder caption is a general thank-you). Needs identification |
| 130 | Sunday we visited and donated food to the IDPs | note.txt | — | Food for displaced people, Ancient Route Gateway, Sept 2020 (FB 9 Sep 2020) | Note/document: caption text used for verification |
| 131 | Sunday we visited and donated food to the IDPs | syndy01.jpg | 1072×618 | Food for displaced people, Ancient Route Gateway, Sept 2020 (FB 9 Sep 2020) | Published: `displaced-families-bonaberi-2020` photo 1 |
| 132 | Sunday we visited and donated food to the IDPs | syndy02.jpg | 1058×704 | Food for displaced people, Ancient Route Gateway, Sept 2020 (FB 9 Sep 2020) | Published: `displaced-families-bonaberi-2020` photo 3 |
| 133 | Sunday we visited and donated food to the IDPs | syndy03.jpg | 1069×721 | Food for displaced people, Ancient Route Gateway, Sept 2020 (FB 9 Sep 2020) | Published: `displaced-families-bonaberi-2020` photo 4 |
| 134 | Sunday we visited and donated food to the IDPs | syndy04.jpg | 1073×713 | Food for displaced people, Ancient Route Gateway, Sept 2020 (FB 9 Sep 2020) | Published: `displaced-families-bonaberi-2020` photo 2 |
| 135 | Sunday we visited and donated food to the IDPs | syndy05.jpg | 1065×695 | Food for displaced people, Ancient Route Gateway, Sept 2020 (FB 9 Sep 2020) | Published: `displaced-families-bonaberi-2020` photo 6 |
| 136 | Sunday we visited and donated food to the IDPs | syndy06.jpg | 1068×716 | Food for displaced people, Ancient Route Gateway, Sept 2020 (FB 9 Sep 2020) | Published: `displaced-families-bonaberi-2020` photo 5 |
| 137 | Sunday we visited and donated food to the IDPs | syndy07.jpg | 566×863 | Food for displaced people, Ancient Route Gateway, Sept 2020 (FB 9 Sep 2020) | Held: these appear to belong to the Limbe schools set (same people), not this event. Needs confirmation |
| 138 | Sunday we visited and donated food to the IDPs | syndy08.jpg | 1079×711 | Food for displaced people, Ancient Route Gateway, Sept 2020 (FB 9 Sep 2020) | Held: these appear to belong to the Limbe schools set (same people), not this event. Needs confirmation |
| 139 | SYNDY EMADE FOUNDATION | NOTE.txt | — | First anniversary / women’s business appeal, 13 Jul 2020 | Note/document: caption text used for verification |
| 140 | SYNDY EMADE FOUNDATION | SYNDY01.jpg | 904×899 | First anniversary / women’s business appeal, 13 Jul 2020 | Not published: appeal flyer for women’s business support; outcome not documented (flyer misspells “SYDNY”) |
| 141 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | note.txt | — | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Note/document: caption text used for verification |
| 142 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy01.jpg | 1063×700 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Published: `covid-school-kits-limbe-2020` photo 1 |
| 143 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy02.jpg | 1071×723 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Published: `covid-school-kits-limbe-2020` photo 5 |
| 144 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy03.jpg | 1064×715 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Published: `covid-school-kits-limbe-2020` photo 6 |
| 145 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy04.jpg | 1067×720 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Published: `covid-school-kits-limbe-2020` photo 7 |
| 146 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy05.jpg | 1075×709 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Published: `covid-school-kits-limbe-2020` photo 8 |
| 147 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy06.jpg | 1069×708 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Not selected: similar to a published photo |
| 148 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy07.jpg | 577×488 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Excluded (privacy): screenshot of Facebook comments showing people’s emails and phone numbers |
| 149 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy08.jpg | 594×836 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Excluded (privacy): screenshot of Facebook comments showing people’s emails and phone numbers |
| 150 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy09.jpg | 587×494 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Excluded (privacy): screenshot of Facebook comments showing people’s emails and phone numbers |
| 151 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy10.jpg | 1044×881 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Excluded (privacy): screenshot of Facebook comments showing people’s emails and phone numbers |
| 152 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy11.jpg | 574×498 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Excluded (privacy): screenshot of Facebook comments showing people’s emails and phone numbers |
| 153 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy12.jpg | 598×830 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Excluded (privacy): screenshot of Facebook comments showing people’s emails and phone numbers |
| 154 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy13.jpg | 582×497 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Excluded (privacy): screenshot of Facebook comments showing people’s emails and phone numbers |
| 155 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy14.jpg | 1053×871 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Excluded (privacy): screenshot of Facebook comments showing people’s emails and phone numbers |
| 156 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy15.jpg | 574×488 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Excluded (privacy): screenshot of Facebook comments showing people’s emails and phone numbers |
| 157 | Syndy Emade Foundation in collaboration with ELONE Foundation founded by her Aunt Elone Grace Emade | syndy16.jpg | 1297×892 | COVID-19 relief for Limbe schools with ELONE Foundation, 2020 | Excluded: stock “Thank you” image, not documentary |
| 158 | Syndy Emade Foundation is here to serve | note.txt | — | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Note/document: caption text used for verification |
| 159 | Syndy Emade Foundation is here to serve | syndy.jpg | 951×631 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Published: `first-outreach-2019` photo 7 |
| 160 | Syndy Emade Foundation is here to serve | syndy01.jpg | 958×635 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Published: `first-outreach-2019` photo 8 |
| 161 | Syndy Emade Foundation is here to serve | syndy02.jpg | 970×638 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Published: `first-outreach-2019` photo 2 |
| 162 | Syndy Emade Foundation is here to serve | syndy03.jpg | 958×633 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not selected: similar to a published photo |
| 163 | Syndy Emade Foundation is here to serve | syndy04.jpg | 960×638 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not selected: similar to a published photo |
| 164 | Syndy Emade Foundation is here to serve | syndy05.jpg | 952×638 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Published: `first-outreach-2019` photo 9 |
| 165 | Syndy Emade Foundation is here to serve | syndy06.jpg | 956×627 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not selected: similar to a published photo |
| 166 | Syndy Emade Foundation is here to serve | syndy07.jpg | 957×632 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Published: `first-outreach-2019` photo 1 |
| 167 | Syndy Emade Foundation is here to serve | syndy08.jpg | 950×634 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Published: `first-outreach-2019` photo 3 |
| 168 | Syndy Emade Foundation is here to serve | syndy09.jpg | 957×632 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not selected: similar to a published photo |
| 169 | Syndy Emade Foundation is here to serve | syndy10.jpg | 950×630 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Published: `first-outreach-2019` photo 6 |
| 170 | Syndy Emade Foundation is here to serve | syndy11.jpg | 955×640 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not selected: similar to a published photo |
| 171 | Syndy Emade Foundation is here to serve | syndy12.jpg | 952×643 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Published: `first-outreach-2019` photo 5 |
| 172 | Syndy Emade Foundation is here to serve | syndy13.jpg | 598×890 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not selected: similar to a published photo |
| 173 | Syndy Emade Foundation is here to serve | syndy14.jpg | 959×638 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not selected: similar to a published photo |
| 174 | Syndy Emade Foundation is here to serve | syndy15.jpg | 952×634 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not selected: similar to a published photo |
| 175 | Syndy Emade Foundation is here to serve | syndy16.jpg | 958×633 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not selected: similar to a published photo |
| 176 | Syndy Emade Foundation is here to serve | syndy17.jpg | 952×630 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not selected: similar to a published photo |
| 177 | Syndy Emade Foundation is here to serve | syndy18.jpg | 604×900 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Published: `first-outreach-2019` photo 4 |
| 178 | Syndy Emade Foundation is here to serve | syndy19.jpg | 951×629 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Published: `first-outreach-2019` photo 10 |
| 179 | Syndy Emade Foundation is here to serve | syndy20.jpg | 899×878 | Launch, 11 Jul 2019, Mount Zion Bilingual School, Mambanda (FB 12–13 Jul 2019) | Not needed: logo file (the site already uses the official logo) |
| 180 | thank our CEO and team for always giving | syndy01.jpg | 1314×890 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 11 |
| 181 | thank our CEO and team for always giving | syndy02.jpg | 1296×882 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 182 | thank our CEO and team for always giving | syndy03.jpg | 1299×908 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 183 | thank our CEO and team for always giving | syndy04.jpg | 1289×896 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 184 | thank our CEO and team for always giving | syndy05.jpg | 1285×892 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 185 | thank our CEO and team for always giving | syndy06.jpg | 596×903 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 186 | thank our CEO and team for always giving | syndy07.jpg | 1357×855 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Published: `year-end-bonaberi-2020` photo 12 |
| 187 | thank our CEO and team for always giving | syndy08.jpg | 622×898 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 188 | thank our CEO and team for always giving | syndy09.jpg | 1360×852 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 189 | thank our CEO and team for always giving | syndy10.jpg | 1299×905 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 190 | thank our CEO and team for always giving | syndy11.jpg | 1408×851 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 191 | thank our CEO and team for always giving | syndy12.jpg | 1274×888 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 192 | thank our CEO and team for always giving | syndy13.jpg | 602×907 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 193 | thank our CEO and team for always giving | syndy14.jpg | 1370×844 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 194 | thank our CEO and team for always giving | syndy15.jpg | 1240×901 | Year-end outreach team photos, Dec 2020 (FB 31 Dec 2020) | Not selected: similar to a published photo |
| 195 | (root) | Our hearts are in pain, all our children wanted was Education for a brighter future. We need peace!.jpg | 649×475 | Root of the folder | Not published: statement after the Kumba school attack, not a Foundation activity |
| 196 | (root) | Special thank the CEO.md | — | Root of the folder | Document (not media); not used |
| 197 | (root) | syndy-emade-foundation-website-prompt.md | — | Root of the folder | Document (not media); not used |
