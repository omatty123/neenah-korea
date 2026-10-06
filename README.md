# Neenah Korea talk

**When you follow Korea, you're ahead of the world.**

Matty Wegehaupt · Neenah Club · October 19, 2026

LIVE website: https://omatty123.github.io/neenah-korea/

## Website

The user confirmed that the webpages are for display and projection during the talk. Large titles, photographs, maps, charts and video form the visible talk frames, with short captions. Long sources, explanations and speaker preparation remain in native disclosures that are closed initially. The short home page links the South Korea, North Korea, Wisconsin comparison, Korean War memorial, and speaker pages.

The website uses plain HTML and CSS with small optional scripts; no package installation or separate build system is required. css/presentation.css and js/presentation.js progressively add Previous, Next and fullscreen controls. Content and ordinary page links remain available without JavaScript. The controls support the live presentation while the authored preparation remains available for the speaker and later visitors.

The October 4, 2026 redesign preserves the earlier public pages in `archive/2026-10-04/`. The archive adds a dated notice and corrects asset paths; its original source is retained at Git commit `2004ccf`. Archived figures are historical preparation, not current verified claims. Private Desktop research PDFs are outside this repository.

Original images remain in `images/`. The original redesign's `*-display.webp` files were encoded with cwebp at quality 84 and a maximum width of 1,400 pixels (1,000 for the Seoul opening photograph). Later galleries retain their own documented dimensions and encoding settings. Display copies preserve source-image proportions; originals remain available, including as fallbacks where HTML picture elements are used. Font files are self-hosted; their SIL Open Font Licenses are in `fonts/`.

The home opening and Pyongyang page feature `images/hwasong-saebyeol.jpg`, the Saebyeol Street aerial already added to the preparation in commit `33ad068`. [Korea Times/Yonhap, March 14, 2026](https://www.koreatimes.co.kr/foreignaffairs/northkorea/20260314/n-korea-promotes-new-street-for-families-of-soldiers-killed-in-russia-ukraine-war) identifies the view as Saeppyol Street and credits it to a KCNA image carried on February 16, 2026. This is the image’s release date; its exact capture date is not stated. The original file and its KCNA mark remain intact. The earlier ceremony photograph and Hwasong aerial remain in the preparation gallery and archive.

## Preview and checks

Run from this repository:

```sh
python3 -m http.server 8784 --bind 127.0.0.1
python3 tools/check_site.py
python3 tools/package_site.py
python3 tools/check_site.py _site
node --check js/presentation.js
node --check js/regional-development-map.js
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
- Wisconsin–South Korea goods flows: WEDC's 2025 full-year report, with the report's revised 2024 comparison.
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

The regional-development section leads with a geographic map and documentary photographs. The user requested removal of the annual square chart on October 4, 2026 because it repeated the policy explanation. That chart remains recoverable in Git history at commit `b79a2d0`.

The province comparison reproduces the numbers in 38 North's January 15, 2026 [published dataset](https://datawrapper.dwcdn.net/z8CJA/1/dataset.csv). An audited transcription is retained in `tools/20x10-locations-by-province.tsv`: 13 province-level units, 20 locations per cohort, 40 in total. Bars show locations rather than factory counts. Rason's zero remains visible. Chart labels and values remain readable without JavaScript or an external chart service.

Three credited KCTV images show Kujang food production, Ryonggang County Hospital and Jongphyong Service Center. `images/20x10/README.md` records their sources, dates, original dimensions and reuse status. Original JPEGs and complete published montages remain uncropped; WebP copies total about 335 KB. Photographs link to their complete originals.

## Geographic maps and state-sector markets

The regional map takes the main position; the province-count chart remains in a native disclosure. Maps show the actual city/county areas selected for each annual cohort, rather than invented precise factory markers. `images/20x10-map/README.md` records the geographic layers, data dates, attribution and method. Three local SVG views and their phone variants support both-round, 2024 and 2025 selection. The default view works without JavaScript. The small script `js/regional-development-map.js` changes the displayed SVG only after the requested asset loads and preserves the previous view on failure.

The user emphasized that a state market is not an oxymoron. The visible brands-and-markets section and home introduction now distinguish ownership from commercial activity. Sources include Naenara's September 4, 2025 report of the new regional factories' own brands reaching township/village shops; KCNA's December 19, 2025 report of locally branded beer and regional product competition; and Pyongyang Times reporting on Ryuwon, Maebongsan and Songdo footwear in April 2025. Established footwear brands are not labeled new 2025 launches. DPRK journal translations support enterprise initiative under public ownership. The vendor-market study is explicitly dated 2018 and is not used as a current market census.

`images/dprk-brands/README.md` records the soap and apple-drink photographs. Visible packaging is described without inventing an unreadable brand name. State-media popularity claims are attributed; no independent sales-volume claim is made.

## Projected brand and company frames

Eight DPRK brand photographs in `images/dprk-brand-gallery/` show Maebongsan and Ryuwon footwear, Unhasu and Pomhyanggi cosmetics, Taedonggang and Tumangang beer, and Paegunsan and Jangjasan foods. The Tumangang image is an official photographic product montage. These frames use large brand titles and short captions; detailed evidence, dates and credits remain in collapsed source notes. `images/dprk-brand-gallery/README.md` and `manifest.json` record the original files, display copies, visible brand identification and reuse status. Publication dates do not establish photograph capture dates or new brand launch dates.

Six preferred company/AI visuals in `images/wi-korea-gallery/` show Huggies Little Fighters, a Bobcat ZT7000 mower, Promega's Maxwell RSC instrument, Rockwell Automation's Seoul Customer Experience Center, Samsung HBM4 and SK hynix HBM4. Two additional display alternatives remain available. `images/wi-korea-gallery/README.md` and `manifest.json` retain sources, captions, dimensions, credits and connection evidence.

The company frames distinguish Neenah operations and Kimberly-Clark's Korean joint venture, Johnson Creek manufacturing and Doosan Bobcat ownership, Madison-based Promega's Seoul instrument operation, and Milwaukee-based Rockwell's Seoul center. Product publicity images are not labeled as photographs of Wisconsin facilities. Samsung and SK hynix images illustrate South Korean AI memory products. Original images and publication marks are preserved; public availability is not represented as an open reuse licence.

## Projection verification, October 4, 2026

The six current pages contain 26 presentation frames. One desktop/phone inspection and one confirmation after combined fixes checked the 1440 × 900 projected layout and the 390 × 844 phone layout. Both opening city labels are visible; the four paired DPRK brand frames and company frames retain complete source photographs. Inspected routes have no horizontal overflow, correct counters and loaded visible images. Previous/Next and Right-arrow advancement update the frame hash and counter. The fullscreen control changes to Exit full screen and returns. The map loads the selected 2024 or 2025 SVG, updates its status and opens native policy/source notes. The ten-year square chart remains removed.

The source and deployment-package checker passes for all twelve current/archive pages. Both presentation and map scripts pass Node syntax checks; Git diff whitespace checks pass. Review screenshots and measured layout data are LOCAL, ignored evidence under `.impeccable/review/`. GitHub Actions performs these source/package checks before deployment.

## Requested Facebook reel, October 6, 2026

`southkorea.html#korea-rise-video` adds the user-selected [Facebook share link](https://www.facebook.com/share/r/1N22tfigsv/), which resolves to [reel 1044200785330482](https://www.facebook.com/reel/1044200785330482/). The public viewer identifies Jean K. Min; its player reports 37.87 seconds. The Korean caption discusses per-capita purchasing power relative to France. The creator’s chart is not presented as independently verified economic data; no upload date was visible.

Facebook’s More options → Embed dialog supplied the exact player-only iframe, 339 × 476, with `show_text=false` and `t=0`. The new projected frame uses that player with a visible original-link fallback, source notes, and manual playback. The Facebook video is not downloaded or reposted. The South Korea page now has four frames; the website has 27 in total.

Local verification confirmed manual playback, the native player’s full-screen entry and exit, and Previous/Next advancement with the four-frame counter. The 390 × 844 and 320 × 740 layouts retain the complete player and visible original link without horizontal overflow. Source and packaged-site checks pass for all twelve current/archive pages.
