/* ── Intro scene: "Teaching light to think" ─────────────────────────────────
   Real-time WebGL replacement for the old intro video. A folded brain is drawn
   as a glowing wireframe, neural pathways grow through it, and light pulses run
   along them. Bloom gives the glow.

   startIntroScene(host, onDone) → { stop() }
   Returns null when WebGL is unavailable, so the caller can fall back to video.
   onDone() is called once when the scene has run its full length.            */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/+esm';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js/+esm';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/RenderPass.js/+esm';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js/+esm';
import { OutputPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/OutputPass.js/+esm';

var DURATION = 7.8;      // seconds; the page fades the title in at about 5 s
var PATHS = 16;          // neural pathways through the brain
var TRAIL = 6;           // segments per light pulse
var PULSES = 22;         // light pulses in flight at once
var PULSE_START = 3.8;   // pulses only start once the pathways have grown

var BG = 0x03060c;
var CYAN = new THREE.Color(0x6fd8ff);

function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
function easeOut(x) { x = clamp01(x); return 1 - Math.pow(1 - x, 3); }
function easeInOut(x) { x = clamp01(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
function rand(a, b) { return a + Math.random() * (b - a); }

// Brain surface: ellipsoid with a longitudinal fissure, flattened underside and
// gyri-like folds. theta runs around the vertical axis, phi from top to bottom.
function brainPoint(theta, phi) {
  var x = Math.sin(phi) * Math.cos(theta) * 1.28;
  var y = Math.cos(phi) * 0.86;
  var z = Math.sin(phi) * Math.sin(theta);
  if (y < -0.12) y = -0.12 + (y + 0.12) * 0.45;
  y -= Math.exp(-(x * x) / 0.015) * Math.max(0, y) * 0.32;
  var fold = 0.045 * Math.sin(9 * theta + 2.6 * Math.sin(5 * phi)) * Math.sin(6 * phi + 1.7 * Math.cos(4 * theta))
           + 0.022 * Math.sin(15 * theta + 11 * phi)
           + 0.012 * Math.sin(23 * phi - 7 * theta);
  var s = 1 + fold;
  return new THREE.Vector3(x * s, y * s, z * s);
}

// Cerebellum: a smaller folded ellipsoid at the back and bottom of the brain.
function cerebellumPoint(theta, phi) {
  var s = 1 + 0.06 * Math.sin(18 * phi + 1.2 * Math.cos(2 * theta)) + 0.02 * Math.sin(11 * theta);
  return new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta) * 0.46,
    Math.cos(phi) * 0.27,
    Math.sin(phi) * Math.sin(theta) * 0.38
  ).multiplyScalar(s).add(new THREE.Vector3(-0.5, -0.72, -0.42));
}

// Parametric surface (theta 0..2π, phi 0..π) as an indexed BufferGeometry.
function surface(fn, nu, nv) {
  var pos = new Float32Array((nu + 1) * (nv + 1) * 3);
  var idx = [];
  var k = 0;
  var j, i;
  for (j = 0; j <= nv; j++) {
    var phi = (j / nv) * Math.PI;
    for (i = 0; i <= nu; i++) {
      var p = fn((i / nu) * Math.PI * 2, phi);
      pos[k++] = p.x; pos[k++] = p.y; pos[k++] = p.z;
    }
  }
  for (j = 0; j < nv; j++) {
    for (i = 0; i < nu; i++) {
      var a = j * (nu + 1) + i, b = a + nu + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  var g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// A random point inside the brain's ellipsoid (rejection sampling).
function insidePoint() {
  var p;
  do {
    p = new THREE.Vector3(rand(-1, 1) * 1.05, rand(-1, 1) * 0.5 - 0.05, rand(-1, 1) * 0.7);
  } while ((p.x * p.x) / 1.1 / 1.1 + ((p.y + 0.05) * (p.y + 0.05)) / 0.55 / 0.55 + (p.z * p.z) / 0.8 / 0.8 > 0.8);
  return p;
}

function randomOffset(s) {
  return new THREE.Vector3(rand(-s, s), rand(-s, s), rand(-s, s));
}

export function startIntroScene(host, onDone) {
  var probe = document.createElement('canvas');
  if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return null;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  } catch (err) {
    return null;
  }
  var touch = window.matchMedia('(pointer: coarse)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2));
  renderer.setClearColor(BG, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  host.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(BG, 6, 13);
  var camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);

  scene.add(new THREE.HemisphereLight(0x9fdcff, 0x02050a, 0.7));
  var key = new THREE.DirectionalLight(0xcfeeff, 1.8);
  key.position.set(-3, 5, 4);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0x4fc3f7, 1.6);
  rim.position.set(4, 1, -4);
  scene.add(rim);

  // Floor grid, fades in
  var grid = new THREE.GridHelper(30, 60, 0x1f5a7a, 0x0f2f42);
  grid.position.y = -1.15;
  grid.material.transparent = true;
  grid.material.opacity = 0;
  grid.material.depthWrite = false;
  scene.add(grid);

  var root = new THREE.Group();
  root.rotation.x = 0.08;
  scene.add(root);

  // Dark solid bodies so the wireframe reads as a surface
  var bodyMat = new THREE.MeshStandardMaterial({ color: 0x041421, roughness: 0.6, metalness: 0.05 });
  var wireMat = new THREE.LineBasicMaterial({
    color: CYAN.clone().multiplyScalar(1.3), transparent: true, opacity: 0.36,
    blending: THREE.AdditiveBlending, depthWrite: false
  });

  var brainGeo = surface(brainPoint, 84, 56);
  var brainBody = new THREE.Mesh(brainGeo, bodyMat);
  var brainWireGeo = new THREE.WireframeGeometry(brainGeo);
  var brainWire = new THREE.LineSegments(brainWireGeo, wireMat);
  brainWire.scale.setScalar(1.004);      // sit just outside the body, no z-fighting
  root.add(brainBody, brainWire);

  var cereGeo = surface(cerebellumPoint, 40, 26);
  var cereBody = new THREE.Mesh(cereGeo, bodyMat);
  var cereWireGeo = new THREE.WireframeGeometry(cereGeo);
  var cereWire = new THREE.LineSegments(cereWireGeo, wireMat);
  cereWire.scale.setScalar(1.01);
  root.add(cereBody, cereWire);

  // Neural pathways: tubes that grow from start to end
  var tubeMat = new THREE.MeshBasicMaterial({ color: CYAN.clone().multiplyScalar(1.0), transparent: true, opacity: 0.8 });
  var paths = [];
  var c;
  for (c = 0; c < PATHS; c++) {
    var a = insidePoint(), b = insidePoint();
    var m1 = a.clone().lerp(b, 0.33).add(randomOffset(0.35));
    var m2 = a.clone().lerp(b, 0.66).add(randomOffset(0.35));
    var curve = new THREE.CatmullRomCurve3([a, m1, m2, b]);
    var tubeGeo = new THREE.TubeGeometry(curve, 72, 0.012, 6, false);
    tubeGeo.setDrawRange(0, 0);
    var tube = new THREE.Mesh(tubeGeo, tubeMat);
    root.add(tube);
    var start = 1.6 + rand(0, 1.0);
    var dur = rand(0.9, 1.2);
    paths.push({ curve: curve, tube: tube, count: tubeGeo.index.count, start: start, dur: dur, a: a, b: b });
  }

  // Glowing nodes at the ends of each pathway
  var nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xe6fbff).multiplyScalar(1.8) });
  var nodes = new THREE.InstancedMesh(new THREE.SphereGeometry(0.035, 12, 8), nodeMat, PATHS * 2);
  root.add(nodes);

  // Light pulses: each pulse is a short trail of small spheres along a pathway
  var pulseMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xf2fdff).multiplyScalar(6) });
  var pulseMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 14, 10), pulseMat, PULSES * TRAIL);
  pulseMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  root.add(pulseMesh);

  var pulses = [];
  var i;
  function newPulse(delay) {
    return { c: Math.floor(Math.random() * PATHS), t: -delay, speed: rand(0.28, 0.5) };
  }
  for (i = 0; i < PULSES; i++) pulses.push(newPulse(rand(0, 4)));

  // Scratch objects, reused every frame
  var mat4 = new THREE.Matrix4();
  var pos = new THREE.Vector3();
  var quat = new THREE.Quaternion();
  var scl = new THREE.Vector3();
  var zero = new THREE.Matrix4().makeScale(0, 0, 0);

  // Post-processing: bloom on the bright tubes, nodes and pulses
  var composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  var bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.6, 0.4, 0.35);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  var baseDist = 6;
  function resize() {
    var w = host.clientWidth || window.innerWidth;
    var h = host.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    // Keep the brain fully in frame on narrow (phone) screens
    var vfov = THREE.MathUtils.degToRad(camera.fov);
    baseDist = Math.max(5.8, 1.5 / (Math.tan(vfov / 2) * camera.aspect));
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  var identityQ = new THREE.Quaternion();
  var DOT = 1;

  function update(t, dt) {
    // Floor grid fades in
    grid.material.opacity = 0.55 * easeOut(t / 1.5);

    // Brain and cerebellum outlines draw in
    var bn = Math.floor(brainWireGeo.attributes.position.count * easeInOut((t - 0.1) / 2.4) / 2) * 2;
    brainWire.geometry.setDrawRange(0, bn);
    var cn = Math.floor(cereWireGeo.attributes.position.count * easeInOut((t - 1.2) / 1.6) / 2) * 2;
    cereWire.geometry.setDrawRange(0, cn);
    wireMat.opacity = 0.34 + 0.06 * Math.sin(t * 2.1);

    // Pathways grow, nodes pop in when they arrive
    for (c = 0; c < PATHS; c++) {
      var p = paths[c];
      var f = easeInOut((t - p.start) / p.dur);
      p.tube.geometry.setDrawRange(0, Math.floor(p.count * f / 6) * 6);
      var s0 = easeOut((t - p.start - p.dur) / 0.35) * DOT;
      mat4.compose(p.a, identityQ, scl.setScalar(Math.max(0.0001, s0)));
      nodes.setMatrixAt(2 * c, mat4);
      mat4.compose(p.b, identityQ, scl.setScalar(Math.max(0.0001, s0)));
      nodes.setMatrixAt(2 * c + 1, mat4);
    }
    nodes.instanceMatrix.needsUpdate = true;

    // Light pulses travel along the pathways
    for (i = 0; i < PULSES; i++) {
      var pu = pulses[i];
      if (t >= PULSE_START) pu.t += dt * pu.speed;
      if (pu.t > 1 + TRAIL * 0.035 + 0.05) {
        pulses[i] = newPulse(rand(0, 1.2));
        pu = pulses[i];
      }
      for (var k = 0; k < TRAIL; k++) {
        var idx = i * TRAIL + k;
        var tt = pu.t - k * 0.035;
        if (t < PULSE_START || tt < 0 || tt > 1) {
          pulseMesh.setMatrixAt(idx, zero);
        } else {
          paths[pu.c].curve.getPointAt(tt, pos);
          var edge = Math.min(1, tt / 0.08, (1 - tt) / 0.08);
          var sc = (1 - (k / TRAIL) * 0.85) * clamp01(edge);
          mat4.compose(pos, identityQ, scl.setScalar(Math.max(0.0001, sc)));
          pulseMesh.setMatrixAt(idx, mat4);
        }
      }
    }
    pulseMesh.instanceMatrix.needsUpdate = true;

    // Brain turns to face the viewer, then sways gently
    root.rotation.y = -0.9 * (1 - easeOut(t / 2.6)) + Math.sin(t * 0.2) * 0.22;

    // Camera dollies in and drifts slightly
    var dist = baseDist * (1 + 0.15 * (1 - easeOut(t / 3.0)));
    camera.position.set(Math.sin(t * 0.16) * 0.45, 0.45, dist);
    camera.lookAt(0, 0.02, 0);
  }

  var running = true;
  var finished = false;
  var raf = 0;
  var t0 = performance.now();
  var last = t0;

  function frame(now) {
    if (!running) return;
    var t = (now - t0) / 1000;
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(t, dt);
    composer.render();
    if (!finished && t >= DURATION) {
      finished = true;
      if (onDone) onDone();
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  function stop() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    scene.traverse(function (o) {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
    if (typeof composer.dispose === 'function') composer.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  }

  return { stop: stop };
}
