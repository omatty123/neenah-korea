"""Package only the public website; exclude repository and working documents."""
from pathlib import Path
import shutil

root = Path(__file__).resolve().parents[1]
destination = root / "_site"
if destination.exists():
    shutil.rmtree(destination)
destination.mkdir()
for page in root.glob("*.html"):
    shutil.copy2(page, destination / page.name)
for directory in ("css", "js", "images", "fonts", "archive"):
    shutil.copytree(root / directory, destination / directory)
shutil.copy2(root / "apple-touch-icon.png", destination / "apple-touch-icon.png")
(destination / ".nojekyll").touch()
print(f"Packaged public website at {destination}")
