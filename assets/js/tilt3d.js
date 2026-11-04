/* ── 3D tilt with glare for key cards (mouse/trackpad only) ───────────────── */
(function () {
  'use strict';

  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var MAX_X = 7;   // degrees, tilt around the horizontal axis
  var MAX_Y = 9;   // degrees, tilt around the vertical axis

  document.querySelectorAll('.venture-card, .venture-stat, .rp-visual').forEach(function (el) {
    el.classList.add('tilt-3d');
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';

    var glare = document.createElement('span');
    glare.className = 'tilt-glare';
    glare.setAttribute('aria-hidden', 'true');
    el.appendChild(glare);

    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      el.style.transform =
        'perspective(1000px) rotateX(' + ((0.5 - py) * MAX_X).toFixed(2) + 'deg) ' +
        'rotateY(' + ((px - 0.5) * MAX_Y).toFixed(2) + 'deg) translateZ(4px)';
      el.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
      el.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
    });

    el.addEventListener('pointerleave', function () {
      el.style.transform = '';
    });
  });
})();
