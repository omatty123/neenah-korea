# 20×10 selected-area maps

Prepared 4 October 2026 for the Neenah Korea talk website. These are geographic maps of the **40 selected cities and counties in the 2024 and 2025 rounds**, not maps of exact factory sites. County shading does not mean that every settlement inside a county received a factory.

## Website assets

| View | Desktop | Mobile |
|---|---|---|
| Both rounds | `both-rounds.svg` | `both-rounds-mobile.svg` |
| 2024 | `round-2024.svg` | `round-2024-mobile.svg` |
| 2025 | `round-2025.svg` | `round-2025-mobile.svg` |

Desktop files are 960 × 720; mobile files are 640 × 760. Mobile labels have a separate layout and remain readable at a 335-pixel display width. All six files contain accessible titles and descriptions, north/south orientation, a local 100-kilometre scale at 40°N, real country coastlines and selected administrative polygons. Blue is 2024; red is 2025.

`selected-place-list.json` is the text alternative: `rounds[].year`, then `rounds[].places[]` with name, province, and first reported opening. Names follow the published 38 North tables. There are 20 unique names per round; the two 2025 Kangdong rows for its hospital and factories are counted as one locality. The 2024 round's openings extend into February 2025. A round is not an opening calendar year.

## Sources and reuse status

1. **Selected counties/cities:** Martyn Williams / 38 North, [North Korea Completes the Second Year of the 20×10 Project](https://www.38north.org/2026/01/north-korea-completes-the-second-year-of-the-20x10-project/), published 15 January 2026. Its [published Datawrapper map](https://datawrapper.dwcdn.net/5XMpW/1/) provides [the downloadable dataset](https://datawrapper.dwcdn.net/5XMpW/1/dataset.json). `38north-published-map-dataset.json` preserves that dataset; `selected-regions.geojson` extracts its two FeatureCollections of 20 polygons each. Original polygon coordinates are preserved. Only display colors and projection change. The dataset supplies anonymous polygons rather than named factory coordinates. Attribution is retained. An explicit open reuse license for 38 North's map dataset was not located; public availability is not a claim of a Creative Commons license or independently confirmed reuse permission.
2. **Country borders/coasts:** [Natural Earth 1:50m Admin 0 countries](https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/), [downloaded GeoJSON](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson). `natural-earth-50m-neighbors.geojson` retains the original China, North Korea, South Korea, Russia and Japan features and geometry. Natural Earth data are [public domain](https://www.naturalearthdata.com/about/terms-of-use/). The map is for country-scale orientation, not navigation or boundary adjudication.
3. **Faint province reference lines:** World Food Programme / OCHA ROAP, via [geoBoundaries PRK ADM1](https://www.geoboundaries.org/api/current/gbOpen/PRK/ADM1/), [2018 represented boundaries at pinned commit 9469f09](https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/PRK/ADM1/geoBoundaries-PRK-ADM1_simplified.geojson). Original source: [HDX administrative boundaries](https://data.humdata.org/dataset/dpr-korea-administrative-boundaries). License: **CC BY 3.0 IGO**. `geoboundaries-adm1-metadata.json` preserves source and license metadata. The 2018 province layer is context only: it does not represent later changes to municipality status, supply the 40 selected-area shapes, or assign current province names to the shading. Attribution: WFP/OCHA via geoBoundaries; adapted here to a projected, clipped SVG display.
4. **Named county annotation check:** the Kujang, Ryonggang and Jongphyong callout anchors are within both the corresponding selected polygons and independently named **2019** WFP/OCHA county polygons from [geoBoundaries PRK ADM2](https://www.geoboundaries.org/api/current/gbOpen/PRK/ADM2/), [pinned original GeoJSON](https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/PRK/ADM2/geoBoundaries-PRK-ADM2.geojson). `reference-county-labels-2019.geojson` preserves those three named polygons; `geoboundaries-adm2-metadata.json` preserves its **CC BY 3.0 IGO** credit and 2019 date. Callouts identify counties by approximate polygon-centroid positions; they are not facility markers.
5. **Pyongyang capital locator:** [University of North Texas Digital Library place record](https://digital.library.unt.edu/explore/locations/p18747/) lists latitude 39.033850, longitude 125.754320 and references GeoNames 1871859. The plotted dot is an approximate city-center locator, not a 20×10 project location.
6. **Annual locality names:** [2024-round opening table](https://datawrapper.dwcdn.net/kzBuJ/2/) / [data](https://datawrapper.dwcdn.net/kzBuJ/2/dataset.csv), embedded in [38 North's first-year review](https://www.38north.org/2025/02/kim-jong-uns-20x10-project-achieves-year-one-successes/), 27 February 2025; [2025-round opening table](https://datawrapper.dwcdn.net/L5NoE/2/) / [data](https://datawrapper.dwcdn.net/L5NoE/2/dataset.csv), embedded in the second-year review, 15 January 2026. `kzBuJ-source-table.csv` and `L5NoE-source-table.csv` preserve the original tab-separated data despite the publisher's `.csv` suffix. `z8CJA-source-table.csv` preserves the second-year review's province counts as a secondary count check.

## Geometry and verification

Input coordinates are longitude/latitude in EPSG:4326. The SVG renderer uses north-up spherical Mercator and an extent of 123.7–131.2°E, 37.65–43.12°N. It clips source polygon segments at the viewport; it does not draw an invented country outline. Because Mercator varies with latitude, the scale bar explicitly describes its 40°N reference latitude.

Checks: 40 selected polygons; 20 per round; 20 unique locality names per source table; three county labels contained in the independently named reference counties; SVG XML parsing; desktop and 335-pixel mobile raster inspection. Callout centroids are rounded and should not be interpreted as surveyed coordinates. The source's original county outlines can differ slightly from the generalized Natural Earth coast and the older province reference lines.

Rebuild with standard Python 3; no download, external package or browser is needed:

```sh
python3 tools/build_20x10_map.py
```

Suggested short public caption: **Areas selected for the 2024 and 2025 rounds, from 38 North's January 2026 map. Shading identifies cities/counties, not precise factory sites. Coastlines: Natural Earth; faint province lines: WFP/OCHA, 2018, via geoBoundaries (CC BY 3.0 IGO).**
