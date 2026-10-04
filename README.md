# Neenah Korea talk

**When you follow Korea, you're ahead of the world.**

Matty Wegehaupt · Neenah Club · October 19, 2026

LIVE website: https://omatty123.github.io/neenah-korea/

## Website

Plain HTML and CSS; no package installation or JavaScript is required for the current pages. The short home page links the South Korea, North Korea, Wisconsin comparison, Korean War memorial, and speaker pages. Native disclosures retain deeper preparation.

The October 4, 2026 redesign preserves the earlier public pages in `archive/2026-10-04/`. The archive adds a dated notice and corrects asset paths; its original source is retained at Git commit `2004ccf`. Archived figures are historical preparation, not current verified claims. Private Desktop research PDFs are outside this repository.

Original images remain in `images/`. The `*-display.webp` files are smaller display copies, encoded with cwebp at quality 84 and a maximum width of 1,400 pixels (1,000 for the home photograph). HTML picture elements keep the originals as fallbacks. Font files are self-hosted; their SIL Open Font Licenses are in `fonts/`.

## Preview and checks

Run from this repository:

```sh
python3 -m http.server 8784 --bind 127.0.0.1
python3 tools/check_site.py
python3 tools/package_site.py
python3 tools/check_site.py _site
```

The preview address is LOCAL: http://127.0.0.1:8784/. The checker verifies all twelve current/archive pages, local links, image/font assets, fragments, and basic semantics. The package includes only the public website.

## Publication

`.github/workflows/pages.yml` checks and packages each main-branch change before GitHub Pages deployment. Pull requests run checks without publishing. GitHub Pages must use GitHub Actions as its publishing source. Preserve the existing public audience and repository history.

## Facts refreshed October 4, 2026

Current claims link to their sources beside the text:

- September 2026 Korean exports: October 1 ministry release.
- Samsung and SK hynix HBM4 shipments: February and July 2026 company releases.
- Robot density: 2024 measurement in IFR's 2025 report.
- North Korean output: July 2026 Bank of Korea estimates.
- Wisconsin exports: WEDC's 2024 full-year report.
- Area/population: UN 2025 pocketbook and Census, with measurement years shown.
- Wisconsin memorial figures, the Dickman identification dates, and the 2021 Oshkosh–Hanwha collaboration: memorial, DPAA, company, and Army sources.

Plans, state announcements, output estimates, and historical inscriptions are identified as such. The original unverified rankings remain accessible in the archive.
