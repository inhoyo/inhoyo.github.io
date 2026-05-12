/* ── Research section: Three.js photonic particles + GSAP parallax ──────── */
(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ─────────────────────────────────────────────────────────────────────────
     Three.js — photonic particle field
  ───────────────────────────────────────────────────────────────────────── */
  (function initParticles() {
    if (typeof THREE === 'undefined') return;

    const section = document.querySelector('#research');
    const canvas  = document.getElementById('researchCanvas');
    if (!section || !canvas) return;

    const W = section.offsetWidth  || window.innerWidth;
    const H = section.offsetHeight || window.innerHeight * 2;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 50);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    /* Particles */
    var N   = 110;
    var pos = new Float32Array(N * 3);
    var vel = new Float32Array(N * 2);

    for (var i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
      vel[i * 2]     = (Math.random() - 0.5) * 0.006;
      vel[i * 2 + 1] = (Math.random() - 0.5) * 0.004;
    }

    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    /* Primary accent-blue layer */
    var mat1 = new THREE.PointsMaterial({
      size: 0.055,
      color: 0x4FC3F7,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    /* Secondary warm-white micro-layer for depth */
    var pos2 = new Float32Array(60 * 3);
    var vel2 = new Float32Array(60 * 2);
    for (var j = 0; j < 60; j++) {
      pos2[j * 3]     = (Math.random() - 0.5) * 18;
      pos2[j * 3 + 1] = (Math.random() - 0.5) * 14;
      pos2[j * 3 + 2] = (Math.random() - 0.5) * 2;
      vel2[j * 2]     = (Math.random() - 0.5) * 0.003;
      vel2[j * 2 + 1] = (Math.random() - 0.5) * 0.003;
    }
    var geo2 = new THREE.BufferGeometry();
    geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
    var mat2 = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    scene.add(new THREE.Points(geo,  mat1));
    scene.add(new THREE.Points(geo2, mat2));

    /* Animate */
    var rafId;
    function tick() {
      rafId = requestAnimationFrame(tick);

      var a1 = geo.attributes.position;
      for (var k = 0; k < N; k++) {
        a1.array[k * 3]     += vel[k * 2];
        a1.array[k * 3 + 1] += vel[k * 2 + 1];
        if (a1.array[k * 3]     >  8) a1.array[k * 3]     = -8;
        if (a1.array[k * 3]     < -8) a1.array[k * 3]     =  8;
        if (a1.array[k * 3 + 1] >  6) a1.array[k * 3 + 1] = -6;
        if (a1.array[k * 3 + 1] < -6) a1.array[k * 3 + 1] =  6;
      }
      a1.needsUpdate = true;

      var a2 = geo2.attributes.position;
      for (var l = 0; l < 60; l++) {
        a2.array[l * 3]     += vel2[l * 2];
        a2.array[l * 3 + 1] += vel2[l * 2 + 1];
        if (a2.array[l * 3]     >  9) a2.array[l * 3]     = -9;
        if (a2.array[l * 3]     < -9) a2.array[l * 3]     =  9;
        if (a2.array[l * 3 + 1] >  7) a2.array[l * 3 + 1] = -7;
        if (a2.array[l * 3 + 1] < -7) a2.array[l * 3 + 1] =  7;
      }
      a2.needsUpdate = true;

      renderer.render(scene, camera);
    }
    tick();

    /* Pause when section scrolls off screen */
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!rafId) tick();
      } else {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }, { threshold: 0 }).observe(section);

    /* Resize */
    new ResizeObserver(function () {
      var w = section.offsetWidth;
      var h = section.offsetHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }).observe(section);
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     GSAP — parallax image drift on scroll
  ───────────────────────────────────────────────────────────────────────── */
  document.querySelectorAll('.rp-img').forEach(function (img) {
    gsap.fromTo(img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.rp'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      }
    );
  });

  /* ─────────────────────────────────────────────────────────────────────────
     GSAP — panel entrance: number slides in, title + text rise up
  ───────────────────────────────────────────────────────────────────────── */
  document.querySelectorAll('.rp').forEach(function (panel) {
    var num   = panel.querySelector('.rp-num');
    var title = panel.querySelector('h3');
    var desc  = panel.querySelector('p');
    var flip  = panel.classList.contains('rp--flip');

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'top 80%',
        once: true,
      },
    });

    if (num)   tl.from(num,   { x: flip ? 50 : -50, opacity: 0, duration: 0.8,  ease: 'power3.out' });
    if (title) tl.from(title, { y: 28,  opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5');
    if (desc)  tl.from(desc,  { y: 18,  opacity: 0, duration: 0.55, ease: 'power2.out' }, '-=0.4');
  });

})();
