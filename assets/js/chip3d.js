/* ── Photonic chip: interactive 3D waveguide scene (Venture / LUXONNIC) ──── */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  var stage  = document.getElementById('chipStage');
  var canvas = document.getElementById('chipCanvas');
  if (!stage || !canvas) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (err) {
    stage.style.display = 'none';   // no WebGL: hide the stage, keep the text
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  var ACCENT = 0x4FC3F7;
  var ICE    = 0xA8E6FF;
  var GOLD   = 0xC8A96E;

  var scene  = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 2.1, 4.6);
  camera.lookAt(0, 0, 0);

  /* Everything on the chip rotates together */
  var rig = new THREE.Group();
  scene.add(rig);

  /* Chip die with glowing edges */
  var dieGeo = new THREE.BoxGeometry(3.6, 0.08, 2.2);
  rig.add(new THREE.Mesh(dieGeo, new THREE.MeshBasicMaterial({
    color: 0x0E1A22, transparent: true, opacity: 0.92
  })));
  rig.add(new THREE.LineSegments(new THREE.EdgesGeometry(dieGeo), new THREE.LineBasicMaterial({
    color: ACCENT, transparent: true, opacity: 0.45
  })));

  /* Light pad: concentric glowing rings beneath the chip */
  [[1.9, 2.0, 0.22], [2.7, 2.72, 0.1], [3.4, 3.42, 0.05]].forEach(function (r) {
    var pad = new THREE.Mesh(
      new THREE.RingGeometry(r[0], r[1], 128),
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: r[2],
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })
    );
    pad.rotation.x = -Math.PI / 2;
    pad.position.y = -0.36;
    rig.add(pad);
  });

  /* Laser input: a light pillar descending onto the input port */
  var pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 1.5, 10, 1, true),
    new THREE.MeshBasicMaterial({ color: ICE, transparent: true, opacity: 0.3,
      blending: THREE.AdditiveBlending, depthWrite: false })
  );
  pillar.position.set(-1.95, 0.8, 0);
  rig.add(pillar);

  /* Serpentine waveguides, light pulses and ring resonators */
  var LANES = 7;
  var XS = [-1.65, -1.1, -0.55, 0, 0.55, 1.1, 1.65];
  var lanes = [], pulses = [], rings = [];
  var coreGeo = new THREE.SphereGeometry(0.02, 10, 8);
  var glowGeo = new THREE.SphereGeometry(0.075, 12, 10);

  for (var i = 0; i < LANES; i++) {
    var z0 = -0.8 + i * (1.6 / (LANES - 1));
    var pts = XS.map(function (x, k) {
      return new THREE.Vector3(x, 0.06, z0 + 0.14 * Math.sin(k * 1.3 + i * 0.9));
    });
    var curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
    var color = (i === 3) ? GOLD : ACCENT;   // one warm lane, a nod to the brand palette

    rig.add(new THREE.Mesh(
      new THREE.TubeGeometry(curve, 160, 0.011, 6, false),
      new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 })
    ));
    lanes.push({ curve: curve });

    if (i % 2 === 1) {
      var ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.075, 0.006, 8, 48),
        new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.6 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.copy(curve.getPointAt(0.5));
      ring.position.y = 0.06;
      rig.add(ring);
      rings.push({ mesh: ring, phase: i });
    }

    for (var n = 0; n < 2; n++) {
      var g = new THREE.Group();
      g.add(new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({
        color: color, transparent: true, opacity: 0.22,
        blending: THREE.AdditiveBlending, depthWrite: false
      })));
      g.add(new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({ color: ICE })));
      rig.add(g);
      pulses.push({ obj: g, lane: i, offset: n * 0.5 + i * 0.13, speed: 0.07 + (i % 3) * 0.02 });
    }
  }

  /* Atmospheric dust, drifting around the chip */
  var PN = 140;
  var pp = new Float32Array(PN * 3);
  for (var q = 0; q < PN; q++) {
    pp[q * 3]     = (Math.random() - 0.5) * 7;
    pp[q * 3 + 1] = Math.random() * 2.6 - 0.5;
    pp[q * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  var pgeo = new THREE.BufferGeometry();
  pgeo.setAttribute('position', new THREE.BufferAttribute(pp, 3));
  var dust = new THREE.Points(pgeo, new THREE.PointsMaterial({
    size: 0.022, color: ACCENT, transparent: true, opacity: 0.5,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  scene.add(dust);

  /* Pointer: tilts the chip; hovering speeds the light up */
  var target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  var speedMul = 1, speedTarget = 1;

  canvas.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect();
    target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  }, { passive: true });
  canvas.addEventListener('pointerenter', function () { speedTarget = 3; });
  canvas.addEventListener('pointerleave', function () {
    speedTarget = 1;
    target.x = 0;
    target.y = 0;
  });

  function resize() {
    var w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = (w / h) < 1 ? 6.8 : 4.6;   // pull back so the chip fits on phones
    camera.updateProjectionMatrix();
  }

  var time = 0;
  function update(dt) {
    time += dt;
    speedMul += (speedTarget - speedMul) * Math.min(1, dt * 4);
    cur.x += (target.x - cur.x) * Math.min(1, dt * 3);
    cur.y += (target.y - cur.y) * Math.min(1, dt * 3);

    rig.rotation.y = Math.sin(time * 0.25) * 0.22 + cur.x * 0.35;
    rig.rotation.x = -0.12 + cur.y * 0.12;
    dust.rotation.y = time * 0.02;

    for (var k = 0; k < pulses.length; k++) {
      var p = pulses[k];
      var f = (time * p.speed * speedMul + p.offset) % 1;
      p.obj.position.copy(lanes[p.lane].curve.getPointAt(f));
      p.obj.scale.setScalar(0.85 + 0.25 * Math.sin(time * 6 + k));
    }
    for (var m = 0; m < rings.length; m++) {
      rings[m].mesh.material.opacity = 0.35 + 0.3 * Math.sin(time * 2.4 + rings[m].phase);
    }
    pillar.material.opacity = 0.22 + 0.14 * Math.sin(time * 3.1);
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var running = false, last = 0, raf = 0;

  function loop(now) {
    if (!running) return;
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    update(dt);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }

  resize();
  if (reduce) {
    /* One still frame, no motion */
    update(0);
    renderer.render(scene, camera);
  } else {
    /* Animate only while the stage is on screen */
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
    }, { threshold: 0 }).observe(stage);
  }

  new ResizeObserver(function () {
    resize();
    if (reduce) renderer.render(scene, camera);
  }).observe(stage);
})();
