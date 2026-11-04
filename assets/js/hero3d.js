/* ── Hero 3D: a living photonic wave surface (three.js, global THREE) ────────
   - A grid of light points forms a travelling wave surface
   - Photons slide along the surface
   - The camera follows the pointer and drifts with scroll
   - Renders only while the hero is on screen; one still frame under reduced motion
   Replaces the 2D light field on the homepage (see data-hero3d on <body>).
──────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;
  var hero = document.querySelector('.hero');
  if (!hero) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.createElement('canvas');
  canvas.className = 'hero-3d';
  canvas.setAttribute('aria-hidden', 'true');
  hero.prepend(canvas);

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (err) {
    canvas.remove();
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  var ACCENT = 0x4FC3F7;
  var ICE    = 0xA8E6FF;

  var scene  = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);

  /* The wave surface: a grid of points in the XZ plane, height driven by time */
  var W = 48, D = 26, COLS = 110, ROWS = 56;
  var geo = new THREE.PlaneGeometry(W, D, COLS, ROWS);
  geo.rotateX(-Math.PI / 2);
  var base = geo.attributes.position.array.slice();
  var pos  = geo.attributes.position.array;
  var surface = new THREE.Points(geo, new THREE.PointsMaterial({
    color: ACCENT, size: 0.07, transparent: true, opacity: 0.42,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
  }));
  scene.add(surface);

  function height(x, z, t) {
    return Math.sin(x * 0.22 + t * 0.9) * 0.9
         + Math.cos(z * 0.34 - t * 0.7) * 0.7
         + Math.sin((x + z) * 0.12 + t * 0.4) * 0.6;
  }

  /* Photons sliding along the surface */
  var PH = 26;
  var phGeo = new THREE.BufferGeometry();
  var phPos = new Float32Array(PH * 3);
  phGeo.setAttribute('position', new THREE.BufferAttribute(phPos, 3));
  var photons = new THREE.Points(phGeo, new THREE.PointsMaterial({
    color: ICE, size: 0.3, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  scene.add(photons);
  var phSeed = [];
  for (var p = 0; p < PH; p++) {
    phSeed.push({ speed: 2.5 + Math.random() * 3.5, z: (Math.random() - 0.5) * D * 0.85, offset: Math.random() * W });
  }

  /* Pointer and scroll drive the camera */
  var pointer = { x: 0, y: 0 }, cam = { x: 0, y: 0 };
  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  }, { passive: true });

  function resize() {
    var w = hero.clientWidth, h = hero.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function place(dt) {
    var sp = Math.min(Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0), 1.5);
    cam.x += (pointer.x - cam.x) * Math.min(1, dt * 2.5);
    cam.y += (pointer.y - cam.y) * Math.min(1, dt * 2.5);
    camera.position.set(cam.x * 4, 7.5 - sp * 3 + cam.y * 1.2, 22 + sp * 5);
    camera.lookAt(cam.x * 1.2, 4.2, 0);   // looking above the centre keeps the surface in the lower half
  }

  var time = 0;
  function update(dt) {
    time += dt * 0.6;

    for (var i = 0; i < pos.length; i += 3) {
      pos[i + 1] = height(base[i], base[i + 2], time);
    }
    geo.attributes.position.needsUpdate = true;

    for (var k = 0; k < PH; k++) {
      var s = phSeed[k];
      var x = ((time * s.speed * 4 + s.offset) % W) - W / 2;
      phPos[k * 3]     = x;
      phPos[k * 3 + 1] = height(x, s.z, time) + 0.12;
      phPos[k * 3 + 2] = s.z;
    }
    phGeo.attributes.position.needsUpdate = true;
  }

  var running = false, last = 0, raf = 0;
  function loop(now) {
    if (!running) return;
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    update(dt);
    place(dt);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }

  resize();
  new ResizeObserver(function () {
    resize();
    if (reduce) { place(0); renderer.render(scene, camera); }
  }).observe(hero);

  if (reduce) {
    update(0);
    place(0);
    renderer.render(scene, camera);
    return;
  }

  new IntersectionObserver(function (entries) {
    var on = entries[0].isIntersecting;
    if (on && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    } else if (!on && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  }, { threshold: 0 }).observe(hero);
})();
