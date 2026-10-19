"""Package public presentation files only; exclude editorial working material."""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
destination=root/'_site'
if destination.exists():shutil.rmtree(destination)
destination.mkdir()
for name in ['index.html', 'talk-rebuilt.html', 'talk.html', 'size.html', 'memorial.html', 'southkorea.html', 'pyongyang.html', 'bio.html']:
    shutil.copy2(root/name,destination/name)
for name in ('css','js','images','fonts','archive'):
    shutil.copytree(root/name,destination/name)
for name in ['apple-touch-icon.png', 'infographic-atlas/ktx-cheongryong.jpg', 'infographic-atlas/sources.json', 'infographic-story/data.json', 'korea-2.0/assets/golden-official-video.jpg', 'korean-words/sources.json', 'power-one-slide/kf21-flight.jpg', 'title-page-real/globe-mill.jpg', 'title-page-real/yuhan-groundbreaking.gif', 'video/martial-law-night-2024-poster.jpg', 'video/martial-law-night-2024.mp4']:
    target=destination/name
    target.parent.mkdir(parents=True,exist_ok=True)
    shutil.copy2(root/name,target)
(destination/'.nojekyll').touch()
print(f'Packaged public website at {destination}')
