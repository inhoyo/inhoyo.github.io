/* ── Homepage motion: anime.js choreography (v3.2.2, global `anime`) ──────── */
/* i18n.js rewrites translated text on DOMContentLoaded, so the motion runs after it
   (otherwise the accent underline would be wiped out). */
function initMotion() {
  'use strict';

  if (typeof anime === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* 1 · Hero intro: the name is split into letters and rises in sequence */
  var nameEl = document.querySelector('.hero-name');
  if (nameEl) {
    var label = nameEl.textContent.trim();
    nameEl.setAttribute('aria-label', label);
    nameEl.textContent = '';
    /* Each word is a nowrap block of letters, so words still break between lines */
    var words = label.split(' ');
    words.forEach(function (word, wi) {
      var wordEl = document.createElement('span');
      wordEl.className = 'hero-word';
      wordEl.setAttribute('aria-hidden', 'true');
      Array.prototype.forEach.call(word, function (ch) {
        var span = document.createElement('span');
        span.className = 'hero-ch';
        span.textContent = ch;
        wordEl.appendChild(span);
      });
      nameEl.appendChild(wordEl);
      if (wi < words.length - 1) nameEl.appendChild(document.createTextNode(' '));
    });
  }

  /* Hide the intro elements before the first frame, then play the timeline */
  var introTargets = [
    '.hero-eyebrow',
    '.hero-headline',
    '.hero-desc',
    '.hero-actions .btn'
  ];
  anime.set(introTargets.join(','), { opacity: 0 });
  anime.set('.hero-ch', { opacity: 0, translateY: '110%', rotate: 8 });

  var intro = anime.timeline({ easing: 'easeOutExpo', duration: 1100 });
  intro
    .add({ targets: '.hero-eyebrow', opacity: [0, 1], translateX: [-24, 0], duration: 800 }, 150)
    .add({ targets: '.hero-ch', opacity: [0, 1], translateY: ['110%', 0], rotate: [8, 0], delay: anime.stagger(55) }, 300)
    .add({ targets: '.hero-headline', opacity: [0, 1], translateY: [30, 0] }, '-=800')
    .add({ targets: '.hero-desc', opacity: [0, 1], translateY: [20, 0], duration: 900 }, '-=800')
    .add({ targets: '.hero-actions .btn', opacity: [0, 1], translateY: [16, 0], delay: anime.stagger(90), duration: 800 }, '-=700');

  /* 2 · Hand-drawn accent underline under "6G Photonic", drawn in with anime.setDashoffset */
  var accent = document.querySelector('.hero-headline .accent-text');
  if (accent) {
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 300 14');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('class', 'accent-underline');
    svg.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS(NS, 'path');
    path.setAttribute('d', 'M2 9 C 60 2, 110 14, 160 7 S 250 3, 298 9');
    svg.appendChild(path);
    accent.appendChild(svg);
    anime({
      targets: path,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1400,
      delay: 1200
    });
  }

  /* 3 · Scroll reveals: list rows and tags rise in once their container is visible */
  var groups = [
    ['.news-list', '.news-row'],
    ['.pub-list', '.pub-row'],
    ['.venture-stats', '.venture-stat'],
    ['.venture-pills', '.pill']
  ];

  groups.forEach(function (g) {
    var box = document.querySelector(g[0]);
    if (!box) return;
    var items = box.querySelectorAll(g[1]);
    if (!items.length) return;

    Array.prototype.forEach.call(items, function (el) { el.style.opacity = 0; });

    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      anime({
        targets: items,
        opacity: [0, 1],
        translateY: [28, 0],
        delay: anime.stagger(90, { start: 80 }),
        duration: 900,
        easing: 'easeOutExpo'
      });
    }, { threshold: 0.2 });
    io.observe(box);
  });

  /* 4 · Count-up on the venture numbers (≈10%, 40 MW, 30×) */
  document.querySelectorAll('.venture-stat-num').forEach(function (el) {
    var finalText = el.textContent;
    var m = finalText.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!m) return;

    var prefix = m[1];
    var suffix = m[3];
    var target = parseFloat(m[2]);
    var decimals = (m[2].split('.')[1] || '').length;
    var state = { v: 0 };

    el.textContent = prefix + (0).toFixed(decimals) + suffix;

    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      anime({
        targets: state,
        v: target,
        duration: 1600,
        easing: 'easeOutExpo',
        update: function () { el.textContent = prefix + state.v.toFixed(decimals) + suffix; },
        complete: function () { el.textContent = finalText; }
      });
    }, { threshold: 0.5 });
    io.observe(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotion);
} else {
  initMotion();
}
