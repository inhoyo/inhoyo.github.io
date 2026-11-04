/* ── Smooth scrolling: Locomotive Scroll v5 (Lenis engine) ──────────────────
   Loaded from the bundled UMD build; exposes the global LocomotiveScroll.
   - Desktop/tablet: inertial smooth scroll; touch devices keep native scroll
   - prefers-reduced-motion: no smoothing at all (native scroll)
   - Anchor links glide to their target, offset by the fixed nav height
   - Scroll is locked while the mobile menu is open
   - data-scroll-speed parallax is applied by Locomotive on the elements that
     opt in (see index.html), and is disabled on touch devices automatically
──────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  if (typeof LocomotiveScroll === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var root = document.documentElement;

  /* Parallax is switched off by Locomotive on any device reporting touch points,
     which includes many desktops with touch-capable screens. Re-enable it for
     mouse/trackpad users only, so phones keep native, jank-free scrolling. */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('[data-scroll-speed]').forEach(function (el) {
      el.setAttribute('data-scroll-enable-touch-speed', '');
    });
  }

  var scroll = new LocomotiveScroll({
    lenisOptions: {
      lerp: 0.085,          // lower = floatier; 0.085 keeps the feel calm but responsive
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1
    }
  });
  window.siteScroll = scroll;

  /* Lenis owns the scroll now: drop CSS smooth scrolling to avoid double easing */
  root.classList.add('smooth-scroll');

  /* Anchor links: glide to the section, clearing the fixed nav */
  var navOffset = function () {
    var nav = document.querySelector('.site-nav');
    return nav ? -nav.offsetHeight : 0;
  };

  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) return;
    var id = link.getAttribute('href').slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    scroll.scrollTo(target, { offset: navOffset(), duration: 1.4 });
    if (history.replaceState) history.replaceState(null, '', '#' + id);
  });

  /* Lock scrolling while the mobile menu is open */
  var menu = document.querySelector('.mobile-menu');
  if (menu) {
    new MutationObserver(function () {
      if (menu.classList.contains('open')) scroll.stop();
      else scroll.start();
    }).observe(menu, { attributes: true, attributeFilter: ['class'] });
  }
})();
