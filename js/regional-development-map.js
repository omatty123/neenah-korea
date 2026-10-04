(() => {
  const controls = document.getElementById('map-year-controls');
  const map = document.getElementById('regional-map-image');
  const mobile = document.getElementById('regional-map-mobile');
  const fullsize = document.getElementById('regional-map-fullsize');
  const status = document.getElementById('regional-map-status');
  if (!controls || !map || !mobile || !fullsize || !status) return;

  const buttons = [...controls.querySelectorAll('button[data-map-src]')];
  let request = 0;
  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      if (button.getAttribute('aria-pressed') === 'true') {
        request += 1;
        map.removeAttribute('aria-busy');
        status.textContent = button.dataset.mapStatus;
        return;
      }
      const currentRequest = ++request;
      const preview = new Image();
      preview.src = window.matchMedia('(max-width: 700px)').matches
        ? button.dataset.mobileSrc : button.dataset.mapSrc;
      map.setAttribute('aria-busy', 'true');
      status.textContent = 'Loading the selected round…';
      try {
        await preview.decode();
        if (currentRequest !== request) return;
        mobile.srcset = button.dataset.mobileSrc;
        map.src = button.dataset.mapSrc;
        map.alt = button.dataset.mapAlt;
        fullsize.href = button.dataset.mapSrc;
        buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        status.textContent = button.dataset.mapStatus;
      } catch {
        if (currentRequest !== request) return;
        status.textContent = 'This round could not load. The previous map remains available; try again.';
      } finally {
        if (currentRequest === request) map.removeAttribute('aria-busy');
      }
    });
  });
  controls.hidden = false;
})();
