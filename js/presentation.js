/* A progressive presenter control; every frame remains ordinary page content. */
(() => {
  const frames = [...document.querySelectorAll('main .talk-frame')];
  if (!frames.length) return;
  const bar = document.createElement('nav');
  bar.className = 'talk-controller';
  bar.setAttribute('aria-label', 'Presentation controls');
  const button = (label, title) => {
    const element = document.createElement('button');
    element.type = 'button';
    element.textContent = label;
    element.title = title;
    return element;
  };
  const previous = button('← Previous', 'Previous frame (Left arrow)');
  const next = button('Next →', 'Next frame (Right arrow)');
  const position = document.createElement('span');
  position.className = 'frame-position';
  let current = 0;
  const update = () => {
    position.textContent = `${current + 1} / ${frames.length}`;
    position.setAttribute('aria-label', `Frame ${current + 1} of ${frames.length}`);
    previous.disabled = current === 0;
    next.disabled = current === frames.length - 1;
  };
  const show = index => {
    current = Math.max(0, Math.min(index, frames.length - 1));
    const frame = frames[current];
    if (frame.id) history.replaceState(null, '', `#${frame.id}`);
    // Immediate movement avoids a transition between photographic frames.
    frame.scrollIntoView({ behavior: 'instant', block: 'start' });
    update();
  };
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  bar.append(previous, position, next);
  if (document.documentElement.requestFullscreen && document.exitFullscreen) {
    const fullscreen = button('Full screen', 'Enter full screen');
    fullscreen.className = 'fullscreen-toggle';
    fullscreen.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch {
        fullscreen.textContent = 'Full screen unavailable';
        fullscreen.disabled = true;
      }
    });
    document.addEventListener('fullscreenchange', () => {
      const active = Boolean(document.fullscreenElement);
      fullscreen.textContent = active ? 'Exit full screen' : 'Full screen';
      fullscreen.title = active ? 'Exit full screen' : 'Enter full screen';
    });
    bar.append(fullscreen);
  }
  document.body.append(bar);
  const locate = () => {
    const closest = frames.reduce((best, frame, index) => {
      const distance = Math.abs(frame.getBoundingClientRect().top);
      return distance < best.distance ? { distance, index } : best;
    }, { distance: Infinity, index: 0 });
    current = closest.index;
    update();
  };
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { locate(); scheduled = false; });
  }, { passive: true });
  window.addEventListener('resize', locate);
  window.addEventListener('load', locate);
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const active = event.target;
    if (!active.closest('.talk-controller') && active.closest('a, button, input, textarea, select, summary, iframe, [contenteditable="true"]')) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
      event.preventDefault(); show(current + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault(); show(current - 1);
    }
  });
  locate();
})();
