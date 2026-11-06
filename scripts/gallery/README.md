# Gallery pipeline

1. Download the Drive folder into `<work>/drive/files/NNN` (inventory order) with `<work>/drive/inventory.json`.
2. Choose photos per story in `select.json` (inventory numbers) and write captions in `captions.json` (same order; `cover` is 1-based).
3. Copy both JSON files to `<work>/tools/`, then run:
   - `python3 export.py <work> public/gallery`: resize to ≤1600 px, strip metadata, write progressive JPEGs and `<work>/tools/exported.json`.
   - `python3 gen.py <work> lib/gallery.ts`: regenerate the album data.

Never publish photos listed as held or excluded in `docs/media-gallery-report.md` without the approval noted there.
