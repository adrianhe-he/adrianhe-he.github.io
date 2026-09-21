/* Theme, section navigation, and a small optional cursor companion. */
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
    const icon = themeButton.querySelector('.theme-icon');
    if (icon) icon.textContent = dark ? '◑' : '◐';
  };
  setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (colorScheme.matches ? 'dark' : 'light'));
  if (themeButton) themeButton.addEventListener('click', () => setTheme(root.classList.contains('dark') ? 'light' : 'dark', true));
  colorScheme.addEventListener('change', (event) => {
    if (savedTheme !== 'dark' && savedTheme !== 'light') setTheme(event.matches ? 'dark' : 'light');
  });

  // Keep content readable even if scripting or the observer is unavailable.
  if (!motionPreference.matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-enter');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.hero, article > section, .quote').forEach((element) => {
      revealObserver.observe(element);
      element.addEventListener('animationend', () => element.classList.remove('reveal-enter'), { once: true });
    });
  }

  const toc = document.querySelector('.toc');
  const tocList = document.querySelector('.toc-list');
  const links = Array.from(document.querySelectorAll('[data-toc]'));
  const sections = links.map((link) => document.getElementById(link.dataset.toc)).filter(Boolean);
  let activeId;
  let navigationFrame = 0;
  const updateNavigation = () => {
    navigationFrame = 0;
    if (!sections.length) return;
    const anchorPadding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    const sectionMargin = parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 0;
    const threshold = Math.max((toc ? toc.getBoundingClientRect().height : 60) + 16, anchorPadding + sectionMargin + 2);
    let active = sections[0];
    sections.forEach((section) => { if (section.getBoundingClientRect().top <= threshold) active = section; });
    if (window.scrollY + window.innerHeight >= root.scrollHeight - 4) active = sections[sections.length - 1];
    if (active.id === activeId) return;
    activeId = active.id;
    links.forEach((link) => {
      const current = link.dataset.toc === activeId;
      link.classList.toggle('active', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
      if (current && tocList) {
        const bounds = link.getBoundingClientRect();
        const viewport = tocList.getBoundingClientRect();
        if (bounds.left < viewport.left || bounds.right > viewport.right) {
          tocList.scrollTo({ left: tocList.scrollLeft + bounds.left - viewport.left - 12, behavior: 'auto' });
        }
      }
    });
  };
  const queueNavigation = () => {
    if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
  };
  window.addEventListener('scroll', queueNavigation, { passive: true });
  window.addEventListener('resize', queueNavigation, { passive: true });
  window.addEventListener('hashchange', queueNavigation);
  window.addEventListener('load', queueNavigation);
  updateNavigation();

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
