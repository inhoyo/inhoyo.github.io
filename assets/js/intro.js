/* ── Intro overlay: "Teaching light to think" plays once per browser session ──
   Primary: real-time WebGL scene (assets/js/intro-scene.js).
   Fallback: the pre-rendered video, when WebGL or the module is unavailable.   */
(function () {
  'use strict';

  var SEEN_KEY = 'introSeen';
  var overlay = document.getElementById('intro');
  if (!overlay) return;
  var video = document.getElementById('introVideo');
  var sceneHost = document.getElementById('introScene');
  var skip = document.getElementById('introSkip');
  var html = document.documentElement;
  var done = false;
  var fallbackTimer = null;
  var titleTimer = null;
  var scene = null;

  function markSeen() {
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* storage blocked: fine */ }
  }

  function alreadySeen() {
    try { return sessionStorage.getItem(SEEN_KEY) === '1'; } catch (e) { return false; }
  }

  function removeOverlay() {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }

  function finish() {
    if (done) return;
    done = true;
    clearTimeout(fallbackTimer);
    clearTimeout(titleTimer);
    markSeen();
    html.classList.remove('intro-lock');
    if (video) { try { video.pause(); } catch (e) { /* ignore */ } }
    if (scene) { try { scene.stop(); } catch (e) { /* ignore */ } scene = null; }
    overlay.classList.add('is-hidden');
    overlay.setAttribute('aria-hidden', 'true');
    var gone = false;
    var cleanup = function () { if (!gone) { gone = true; removeOverlay(); } };
    overlay.addEventListener('transitionend', cleanup);
    setTimeout(cleanup, 1200); // safety net if transitionend never fires
  }

  // Skip entirely for returning visitors in this session, or reduced-motion users.
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (alreadySeen() || reduce) {
    removeOverlay();
    return;
  }

  html.classList.add('intro-lock');
  if (skip) skip.addEventListener('click', finish);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') finish();
  });

  // Safety net: never trap the page if playback or rendering stalls.
  fallbackTimer = setTimeout(finish, 14000);

  function playVideo() {
    if (!video) { finish(); return; }
    if (sceneHost) sceneHost.style.display = 'none';
    video.addEventListener('ended', finish);
    video.addEventListener('error', finish);
    var p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(function () { finish(); }); // autoplay blocked: show the landing page
    }
  }

  // Load the WebGL scene; if that is not possible here, fall back to the video.
  // Relative to this script (assets/js/), so "./" makes it a URL, not a bare module specifier
  var sceneUrl = './intro-scene.js';
  import(sceneUrl).then(function (mod) {
    if (done) return;
    var handle = sceneHost ? mod.startIntroScene(sceneHost, finish) : null;
    if (!handle) { playVideo(); return; }
    scene = handle;
    if (video) video.style.display = 'none';
    // The title fades in over the scene; the video fallback has its own title.
    titleTimer = setTimeout(function () { overlay.classList.add('is-title-on'); }, 5000);
  }).catch(function () {
    if (!done) playVideo();
  });
})();
