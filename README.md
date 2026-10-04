# Neenah Korea talk

**When you follow Korea, you're ahead of the world.**

Matty Wegehaupt · Neenah Club · October 19, 2026

LIVE website: https://omatty123.github.io/neenah-korea/

## Website

Plain HTML and CSS; no package installation or JavaScript is required for the current pages. The short home page links the South Korea, North Korea, Wisconsin comparison, Korean War memorial, and speaker pages. Native disclosures retain deeper preparation.

The October 4, 2026 redesign preserves the earlier public pages in `archive/2026-10-04/`. The archive adds a dated notice and corrects asset paths; its original source is retained at Git commit `2004ccf`. Archived figures are historical preparation, not current verified claims. Private Desktop research PDFs are outside this repository.

Original images remain in `images/`. The `*-display.webp` files are smaller display copies, encoded with cwebp at quality 84 and a maximum width of 1,400 pixels (1,000 for the Seoul opening photograph). HTML picture elements keep the originals as fallbacks. Font files are self-hosted; their SIL Open Font Licenses are in `fonts/`.

The home opening and Pyongyang page feature `images/hwasong-saebyeol.jpg`, the Saebyeol Street aerial already added to the preparation in commit `33ad068`. [Korea Times/Yonhap, March 14, 2026](https://www.koreatimes.co.kr/foreignaffairs/northkorea/20260314/n-korea-promotes-new-street-for-families-of-soldiers-killed-in-russia-ukraine-war) identifies the view as Saeppyol Street and credits it to a KCNA image carried on February 16, 2026. This is the image’s release date; its exact capture date is not stated. The original file and its KCNA mark remain intact. The earlier ceremony photograph and Hwasong aerial remain in the preparation gallery and archive.

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

## North Korea expansion, October 4, 2026

The Pyongyang page now gives three current subjects their own visible sections: Russia's Comprehensive Strategic Partnership, Regional Development 20×10 Policy, and consumer life/traffic. The home page links to this expanded argument. Earlier preparation and image galleries remain intact.

Russia sources distinguish observed fuel/payment channels, government-reported military transfers and treaty commitments. The September 7, 2026 bridge opening is attributed to Russia's Transport Ministry; cargo operations and unfinished passenger facilities are distinct. The UN panel veto did not repeal sanctions.

20×10 means facilities in 20 cities and counties annually for ten years. 38 North's dated reviews describe the first two construction rounds, the 2026 start, Jongphyong's leisure/services, and operating constraints. Construction is not treated as a measurement of nationwide living standards.

The Reuters original report, May 12, 2026, is embedded from YouTube with a direct viewing link. Its 2:20 runtime, publisher and traffic footage were inspected in the browser. The two Bilibili originals are linked without downloading or reposting their media:

- Shopping: https://www.bilibili.com/video/BV1EbaYzsEqT/ — creator 偷吃一口口面包; uploaded September 5, 2025; 1:44. Browser inspection verified the original title, upload date, author profile and shopping preview.
- Amusement park: https://www.bilibili.com/video/BV1kJr4BUE7W/ — same creator; uploaded January 14, 2026; 3:08; title identifies a park near the Arch of Triumph.

These are upload dates, with capture dates unverified. Bilibili can require login after a preview. The creator self-identifies as a Chinese exchange student; the creator is not identified as Yu Youlin. His separate December 28, 2025 audio interview is labeled as a firsthand account, rather than a video.

## 20×10 charts and photographs

The regional-development section contains two native HTML/CSS charts. The first shows ten annual 20-location cohorts: two reported opened, the 2026 round under construction, and seven future policy targets. The 200 total is a ten-year target, not a completion count. The September 22, 2026 [KCNA update carried by OANA](https://oananews.org/node/713135) still describes construction of the 2026 factories.

The province comparison reproduces the numbers in 38 North's January 15, 2026 [published dataset](https://datawrapper.dwcdn.net/z8CJA/1/dataset.csv). An audited transcription is retained in `tools/20x10-locations-by-province.tsv`: 13 province-level units, 20 locations per cohort, 40 in total. Bars show locations rather than factory counts. Rason's zero remains visible. Chart labels and values remain readable without JavaScript or an external chart service.

Three credited KCTV images show Kujang food production, Ryonggang County Hospital and Jongphyong Service Center. `images/20x10/README.md` records their sources, dates, original dimensions and reuse status. Original JPEGs and complete published montages remain uncropped; WebP copies total about 335 KB. Photographs link to their complete originals.
