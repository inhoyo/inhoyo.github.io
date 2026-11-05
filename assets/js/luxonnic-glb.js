/* ── LUXONNIC braid: animated glTF exported from the Blender scene ─────────
   Source: BareDie_Braid_LUXONNIC_transparent.blend → assets/models/luxonnic_braid.glb
   Clips: intro_* (logo draws in once, then holds), loop_* (stage sway, photons, glow).
   Loaded as an ES module so GLTFLoader can use the r160 three.module build.      */
(async function () {
  'use strict';

  var stage  = document.getElementById('glbStage');
  var canvas = document.getElementById('glbCanvas');
  if (!stage || !canvas) return;

  var THREE, GLTFLoader;
  try {
    /* jsDelivr "+esm" bundles resolve the bare 'three' import themselves, so no
       <script type="importmap"> is needed (import maps are missing on older iOS/Android). */
    THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/+esm');
    ({ GLTFLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js/+esm'));
  } catch (err) {
    stage.style.display = 'none';
    return;
  }

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (err) {
    stage.style.display = 'none';
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer  = window.matchMedia('(pointer: fine)').matches;

  var scene  = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);

  scene.add(new THREE.HemisphereLight(0xBFE9FF, 0x071018, 0.9));
  var key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-4, 7, 9);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0x4FC3F7, 1.3);
  rim.position.set(7, 2, -5);
  scene.add(rim);

  var pivot = new THREE.Group();   // pointer tilt happens here, around the braid's centre
  scene.add(pivot);

  var gltf;
  try {
    gltf = await new Promise(function (resolve, reject) {
      new GLTFLoader().load('assets/models/luxonnic_braid.glb', resolve, undefined, reject);
    });
  } catch (err) {
    stage.style.display = 'none';
    renderer.dispose();
    return;
  }

  var root = gltf.scene;
  pivot.add(root);
  var box    = new THREE.Box3().setFromObject(root);
  var centre = box.getCenter(new THREE.Vector3());
  var size   = box.getSize(new THREE.Vector3());
  root.position.sub(centre);

  /* Same azimuth as the Blender camera, but higher (≈48°) so the flat braid reads in 3D on the web */
  var viewDir = new THREE.Vector3(-3.5, 9.0, 8.0).normalize();

  function fit() {
    var w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    var fov = THREE.MathUtils.degToRad(camera.fov);
    var halfW = size.x * 0.5 * 1.0;                                // braid is wide: fit width
    var halfH = (size.z * 0.5 * 0.75 + size.y * 0.5) * 1.5;           // projected height at this elevation
    var distW = halfW / (Math.tan(fov / 2) * camera.aspect);
    var distH = halfH / Math.tan(fov / 2);
    var dist = Math.max(distW, distH);
    camera.position.copy(viewDir).multiplyScalar(dist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }

  var mixer = new THREE.AnimationMixer(root);
  var introActions = [];
  gltf.animations.forEach(function (clip) {
    var action = mixer.clipAction(clip);
    if (clip.name.indexOf('intro_') === 0) {
      /* The logo intro is scrubbed by scroll (see frame), not played on its own */
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
      action.paused = true;
      introActions.push(action);
    } else {
      action.play();
    }
  });

  fit();

  if (reduceMotion) {
    introActions.forEach(function (a) { a.time = a.getClip().duration; });
    mixer.update(3.2);            // logo fully drawn, static pose
    pivot.rotation.set(0, 0, 0);
    renderer.render(scene, camera);
    window.addEventListener('resize', function () { fit(); renderer.render(scene, camera); });
    return;
  }

  var pointer = { x: 0, y: 0 }, tilt = { x: 0, y: 0 };
  if (finePointer) {
    stage.addEventListener('pointermove', function (e) {
      var r = stage.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    });
    stage.addEventListener('pointerleave', function () { pointer.x = 0; pointer.y = 0; });
  }

  /* 0 when the stage enters at the bottom edge, 0.5 when centred, 1 when it leaves at the top */
  function stageProgress() {
    var r = stage.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    return Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
  }

  var sp = 0;            // smoothed scroll progress through the stage
  var running = false, rafId = 0, last = 0;
  function frame(now) {
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    sp += (stageProgress() - sp) * 0.12;

    /* The logo draws in while the braid travels up the screen (progress 0.08 → 0.58) */
    var ip = Math.min(1, Math.max(0, (sp - 0.08) / 0.5));
    introActions.forEach(function (a) { a.time = ip * a.getClip().duration; });

    mixer.update(dt);
    tilt.x += (pointer.y * 0.12 - tilt.x) * 0.08;
    tilt.y += (pointer.x * 0.22 - tilt.y) * 0.08;
    /* The braid turns with the scroll (about ±40°) and leans toward the pointer */
    pivot.rotation.set(tilt.x, tilt.y + (sp - 0.5) * 1.4, 0);
    renderer.render(scene, camera);
    rafId = running ? requestAnimationFrame(frame) : 0;
  }
  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    rafId = requestAnimationFrame(frame);
  }
  function stop() { running = false; }

  /* anime.js: one light sweep crosses the stage the first time it is seen */
  var sweepPlayed = false;
  function playSweep() {
    if (sweepPlayed || typeof anime === 'undefined') return;
    sweepPlayed = true;
    var sweep = document.createElement('div');
    sweep.className = 'stage-sweep';
    sweep.setAttribute('aria-hidden', 'true');
    stage.appendChild(sweep);
    anime({
      targets: sweep,
      translateX: ['-100%', '100%'],
      duration: 1600,
      easing: 'easeInOutSine',
      complete: function () { sweep.remove(); }
    });
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { playSweep(); start(); } else { stop(); }
    }, { threshold: 0.05 }).observe(stage);
  } else {
    start();
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(function () { fit(); }).observe(stage);
  } else {
    window.addEventListener('resize', fit);
  }
})();
