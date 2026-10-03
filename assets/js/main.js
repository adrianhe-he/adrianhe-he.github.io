/* Shared theme, old-link compatibility, and the optional cursor companion. */
(function () {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let savedTheme;
  try { savedTheme = localStorage.getItem('site-theme'); } catch (_) {}

  const setTheme = (theme, persist = false) => {
    const dark = theme === 'dark';
    root.classList.toggle('dark', dark);
    if (persist) {
      savedTheme = theme;
      try { localStorage.setItem('site-theme', theme); } catch (_) {}
    }
    if (!themeButton) return;
    const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    themeButton.setAttribute('aria-label', label);
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.title = label;
  };
  setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (colorScheme.matches ? 'dark' : 'light'));
  if (themeButton) themeButton.addEventListener('click', () => setTheme(root.classList.contains('dark') ? 'light' : 'dark', true));
  colorScheme.addEventListener('change', (event) => {
    if (savedTheme !== 'dark' && savedTheme !== 'light') setTheme(event.matches ? 'dark' : 'light');
  });

  // Links shared before the redesign still reach their original content.
  const base = document.body.dataset.baseurl || '';
  const legacyPages = {
    '#about': '/', '#research': '/', '#news': '/', '#experience': '/experience/',
    '#skills': '/', '#honors': '/', '#publications': '/experience/',
    '#hobbies': '/misc/'
  };
  const followLegacyLink = () => {
    const target = legacyPages[window.location.hash];
    if (!target) return;
    const normalized = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') + '/';
    if (normalized !== base + target) window.location.replace(base + target + window.location.hash);
  };
  window.addEventListener('hashchange', followLegacyLink);
  followLegacyLink();

  const pet = document.querySelector('.cursor-pet');
  if (!pet) return;
  const pointerPreference = window.matchMedia('(hover: hover) and (pointer: fine)');
  let frame = 0;
  let visible = false;
  let x = -200, y = -200, targetX = x, targetY = y;
  const stopPet = () => {
    visible = false;
    pet.classList.remove('visible');
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const movePet = () => {
    frame = 0;
    if (!visible) return;
    x += (targetX - x) * .18;
    y += (targetY - y) * .18;
    pet.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    if (Math.abs(targetX - x) + Math.abs(targetY - y) > .2) frame = requestAnimationFrame(movePet);
  };
  document.addEventListener('pointermove', (event) => {
    if (!pointerPreference.matches || motionPreference.matches || event.pointerType !== 'mouse') return;
    targetX = Math.max(0, Math.min(event.clientX + 16, window.innerWidth - pet.offsetWidth - 8));
    targetY = Math.max(0, Math.min(event.clientY + 16, window.innerHeight - pet.offsetHeight - 8));
    if (!visible) {
      x = targetX;
      y = targetY;
      visible = true;
      pet.classList.add('visible');
    }
    if (!frame) frame = requestAnimationFrame(movePet);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', stopPet);
  window.addEventListener('blur', stopPet);
  window.addEventListener('resize', stopPet, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopPet(); });
  pointerPreference.addEventListener('change', stopPet);
  motionPreference.addEventListener('change', stopPet);
})();
