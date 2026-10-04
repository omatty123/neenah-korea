"""Check all public page links, assets, fragments, and current-page semantics."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

root = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
current = ("index.html", "size.html", "memorial.html", "southkorea.html", "pyongyang.html", "bio.html")
errors = []

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = set()
        self.references = []
        self.headings = 0
        self.main = 0
        self.lang = ""
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            if a["id"] in self.ids:
                errors.append(f"{self.path.name}: duplicate id {a['id']}")
            self.ids.add(a["id"])
        if tag == "html":
            self.lang = a.get("lang", "")
        if tag == "h1":
            self.headings += 1
        if tag == "main":
            self.main += 1
        if tag == "img" and "alt" not in a:
            errors.append(f"{self.path.name}: image missing alt")
        for key in ("href", "src"):
            if key in a:
                self.references.append(a[key])
        if "srcset" in a:
            self.references.extend(x.strip().split()[0] for x in a["srcset"].split(",") if x.strip())

pages = {}
for path in [*(root / name for name in current), *(root / "archive").rglob("*.html")]:
    if not path.exists():
        errors.append(f"Missing page: {path.relative_to(root)}")
        continue
    page = Page(path)
    page.feed(path.read_text())
    pages[path.resolve()] = page
    if path.parent == root:
        if page.headings != 1 or page.main != 1 or page.lang != "en":
            errors.append(f"{path.name}: needs one h1, one main, and lang=en")
        if "main" not in page.ids:
            errors.append(f"{path.name}: missing skip-link target")
for path, page in pages.items():
    for reference in page.references:
        link = urlsplit(reference)
        if link.scheme or link.netloc:
            continue
        target = (path.parent / unquote(link.path)).resolve() if link.path else path
        if not target.is_relative_to(root):
            errors.append(f"{path.name}: reference leaves website: {reference}")
            continue
        if not target.exists():
            errors.append(f"{path.name}: broken reference: {reference}")
        if link.fragment and target in pages and unquote(link.fragment) not in pages[target].ids:
            errors.append(f"{path.name}: missing fragment: {reference}")
for stylesheet in (root / "css").glob("*.css"):
    for asset in re.findall(r"url\(['\"]?([^)'\"]+)", stylesheet.read_text()):
        if not urlsplit(asset).scheme and not (stylesheet.parent / asset).resolve().exists():
            errors.append(f"{stylesheet.name}: missing asset: {asset}")
if errors:
    print("\n".join(errors))
    sys.exit(1)
print(f"PASS: {len(pages)} pages; local links, fragments, images, fonts, and current-page semantics.")
