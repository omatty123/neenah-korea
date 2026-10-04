"""Render real 38 North selected-area geometry over attributed geographic context.

Run from any directory with Python 3. No third-party package or network required.
The geographic layers retain longitude/latitude coordinates in EPSG:4326.
Rendering uses a north-up spherical Mercator projection with a local scale bar.
"""
from pathlib import Path
import html
import json
import math

ROOT = Path(__file__).resolve().parents[1] / "images" / "20x10-map"
REGIONS = json.loads((ROOT / "selected-regions.geojson").read_text())["features"]
COUNTRIES = json.loads((ROOT / "natural-earth-50m-neighbors.geojson").read_text())["features"]
PROVINCES = json.loads((ROOT / "dprk-provinces-2018.geojson").read_text())["features"]
COLORS = {2024: "#205d7b", 2025: "#b8312d"}
PAPER = "#f7f6f0"
INK = "#152632"


def polygons(geometry):
    return [geometry["coordinates"]] if geometry["type"] == "Polygon" else geometry["coordinates"]


def mercator(lon, lat):
    return math.radians(lon), math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))


def clip_ring(ring, bounds):
    """Clip source segments to the map viewport; do not invent country geometry."""
    xmin, ymin, xmax, ymax = bounds
    out = ring[:-1] if ring[0] == ring[-1] else list(ring)
    for axis, limit, keep_greater in [(0, xmin, True), (0, xmax, False), (1, ymin, True), (1, ymax, False)]:
        inp, out = out, []
        if not inp:
            break
        for start, end in zip(inp[-1:] + inp[:-1], inp):
            start_in = start[axis] >= limit if keep_greater else start[axis] <= limit
            end_in = end[axis] >= limit if keep_greater else end[axis] <= limit
            if start_in != end_in:
                ratio = (limit - start[axis]) / (end[axis] - start[axis])
                point = [start[0] + ratio * (end[0] - start[0]), start[1] + ratio * (end[1] - start[1])]
                point[axis] = limit
                out.append(point)
            if end_in:
                out.append(end)
    return out


def build(mode="both", mobile=False):
    width, height = (640, 760) if mobile else (960, 720)
    top, bottom = (110, 675) if mobile else (100, 650)
    extent = (123.7, 37.65, 131.2, 43.12)
    lonmin, latmin, lonmax, latmax = extent
    xmin, ymin = mercator(lonmin, latmin)
    xmax, ymax = mercator(lonmax, latmax)
    scale = min((width - 32) / (xmax - xmin), (bottom - top) / (ymax - ymin))
    midx, midy = (xmin + xmax) / 2, (ymin + ymax) / 2
    pxmid, pymid = width / 2, (top + bottom) / 2

    def project(lon, lat):
        x, y = mercator(lon, lat)
        return pxmid + (x - midx) * scale, pymid - (y - midy) * scale

    def path_for(geometry):
        paths = []
        for poly in polygons(geometry):
            for ring in poly:
                clipped = clip_ring(ring, extent)
                if len(clipped) < 3:
                    continue
                pts = [project(*p) for p in clipped]
                paths.append("M" + "L".join(f"{x:.2f},{y:.2f}" for x, y in pts) + "Z")
        return "".join(paths)

    title = "40 selected cities and counties" if mode == "both" else f"20 selected cities and counties · {mode}"
    years = [2024, 2025] if mode == "both" else [int(mode)]
    text_size = 30 if mobile else 21
    small = 23 if mobile else 16
    chunks = [f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title description">
<title id="title">{html.escape(title)} in North Korea's 20×10 regional development policy</title>
<desc id="description">Actual selected administrative areas from 38 North's published January 2026 map. Blue represents the 2024 round; red represents the 2025 round. The map shows North Korea, China, South Korea, coastlines, reference province boundaries, Pyongyang, and three photographed counties. Shaded areas are cities and counties, not precise factory sites.</desc>
<style>text{{font-family:Arial,sans-serif;fill:{INK}}}.label{{paint-order:stroke;stroke:{PAPER};stroke-width:6;stroke-linejoin:round}}.sea{{fill:#496775}}.country{{letter-spacing:1.4px;font-weight:700}}.leader{{fill:none;stroke:{INK};stroke-width:1.3}}.county{{font-weight:700}}.source{{fill:#59676a}}</style>
<rect width="{width}" height="{height}" fill="{PAPER}"/>
<text x="20" y="35" font-size="{28 if mobile else 23}" font-weight="700">{html.escape(title)}</text>''']
    for i, year in enumerate(years):
        x = 20 + i * (310 if mobile else 210)
        chunks.append(f'<rect x="{x}" y="58" width="18" height="18" fill="{COLORS[year]}"/><text x="{x+28}" y="74" font-size="{26 if mobile else 18}">{year} round · 20</text>')
    chunks.append(f'<defs><clipPath id="map-clip"><rect x="16" y="{top}" width="{width-32}" height="{bottom-top}"/></clipPath></defs>')
    chunks.append(f'<g clip-path="url(#map-clip)"><rect x="16" y="{top}" width="{width-32}" height="{bottom-top}" fill="#dce9ed"/>')
    for f in COUNTRIES:
        code = f["properties"]["ADM0_A3"]
        fill = "#f0eee5" if code == "PRK" else "#e0dfd7"
        chunks.append(f'<path d="{path_for(f["geometry"])}" fill="{fill}" fill-rule="evenodd" stroke="#788887" stroke-width="{1.3 if code=="PRK" else .8}"/>')
    for f in PROVINCES:
        chunks.append(f'<path d="{path_for(f["geometry"])}" fill="none" stroke="#a8aba4" stroke-width=".7" stroke-dasharray="2 2"/>')
    for f in REGIONS:
        year = f["properties"]["year"]
        if year not in years:
            continue
        chunks.append(f'<path d="{path_for(f["geometry"])}" fill="{COLORS[year]}" fill-opacity=".8" stroke="{COLORS[year]}" stroke-width=".9"><title>{year} selected area {f["properties"]["source_polygon_index"]}</title></path>')

    def label(text, lon, lat, kind="", size=None, anchor="middle", weight=None):
        x, y = project(lon, lat)
        size = size or text_size
        for i, line in enumerate(text.split("\n")):
            chunks.append(f'<text class="label {kind}" x="{x:.1f}" y="{y+i*size*1.05:.1f}" font-size="{size}" text-anchor="{anchor}"{f" font-weight={chr(34)}{weight}{chr(34)}" if weight else ""}>{html.escape(line)}</text>')

    label("CHINA", 125.6, 41.9, "country", 34 if mobile else 24)
    label("NORTH\nKOREA", 128.1, 40.77, "country", 32 if mobile else 24)
    label("SOUTH\nKOREA", 128.0, 37.9, "country", 29 if mobile else 22)
    label("Russia", 130.7, 42.75, "country", 25 if mobile else 18)
    label("Yellow\nSea", 124.48, 39.35 if mobile else 38.9, "sea", 29 if mobile else 20)
    label("East Sea\n(Sea of Japan)", 129.7, 39.35, "sea", 25 if mobile else 19)

    # Pyongyang is a city-center locator, not a program facility.
    px, py = project(125.75432, 39.03385)
    r = 6 if mobile else 5
    chunks.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="{r+2}" fill="{PAPER}"/><circle cx="{px:.1f}" cy="{py:.1f}" r="{r}" fill="{INK}"/>')
    label("Pyongyang", 126.10, 38.9, "county", 29 if mobile else 20, anchor="start")

    # The three photo-related annotations identify areas, not individual factories.
    # Their anchors are polygon centroids, visibly represented by leader endpoints.
    callouts = [
        ("Kujang", 2024, (126.0694, 39.8991), (124.02, 40.18) if mobile else (124.6, 40.18), "start" if mobile else "end"),
        ("Ryonggang", 2025, (125.3694, 38.8605), (124.02, 38.25) if mobile else (124.7, 38.25), "start" if mobile else "end"),
        ("Jongphyong", 2025, (127.3406, 39.7245), (128.40, 40.06), "start"),
    ]
    for name, year, point, textpoint, anchor in callouts:
        if year not in years:
            continue
        x0, y0 = project(*point)
        x1, y1 = project(*textpoint)
        # Halo keeps the geographic leaders legible across shaded areas.
        chunks.append(f'<path d="M{x0:.1f},{y0:.1f}L{x1:.1f},{y1+6:.1f}" fill="none" stroke="{PAPER}" stroke-width="4"/><path class="leader" d="M{x0:.1f},{y0:.1f}L{x1:.1f},{y1+6:.1f}"/>')
        label(name, *textpoint, kind="county", size=29 if mobile else 20, anchor=anchor)

    chunks.append('</g>')
    # A north-up compass and local ground-distance scale at latitude 40°N.
    nx, ny = width - 40, top + (170 if mobile else 65)
    chunks.append(f'<path d="M{nx},{ny+24}V{ny-20}M{nx-7},{ny-8}L{nx},{ny-20}L{nx+7},{ny-8}" fill="none" stroke="{INK}" stroke-width="2"/><text x="{nx}" y="{ny-29}" text-anchor="middle" font-size="{small}" font-weight="700">N</text><text x="{nx}" y="{ny+47}" text-anchor="middle" font-size="{small}">S</text>')
    bar = scale * 100000 / (6378137 * math.cos(math.radians(40)))
    bx, by = 35, bottom - 18
    chunks.append(f'<rect x="{bx-10}" y="{by-40}" width="{bar+40:.1f}" height="56" fill="{PAPER}" fill-opacity=".9"/><path d="M{bx},{by-7}V{by}H{bx+bar:.1f}V{by-7}" fill="none" stroke="{INK}" stroke-width="2"/><text x="{bx}" y="{by-15}" font-size="{small}">100 km at 40°N</text>')
    footer_y = height - (53 if mobile else 37)
    chunks.append(f'<text x="20" y="{footer_y}" font-size="{22 if mobile else 15}" class="source">Selected areas, not precise factory sites.</text>')
    chunks.append(f'<text x="20" y="{footer_y+25}" font-size="{19 if mobile else 13}" class="source">38 North · Natural Earth · WFP/OCHA via geoBoundaries</text>')
    chunks.append('</svg>')
    filename = "both-rounds" if mode == "both" else f"round-{mode}"
    if mobile:
        filename += "-mobile"
    target = ROOT / f"{filename}.svg"
    target.write_text("\n".join(chunks) + "\n")
    print(f"{target.name}: {width}×{height}, {target.stat().st_size:,} bytes")


if __name__ == "__main__":
    assert len(REGIONS) == 40
    assert sum(f["properties"]["year"] == 2024 for f in REGIONS) == 20
    assert sum(f["properties"]["year"] == 2025 for f in REGIONS) == 20
    for mobile in [False, True]:
        for mode in ["both", "2024", "2025"]:
            build(mode, mobile)
