/* ── Intro overlay: plays "Teaching light to think" once per browser session ── */
(function () {
  'use strict';

  var SEEN_KEY = 'introSeen';
  var overlay = document.getElementById('intro');
  if (!overlay) return;
  var video = document.getElementById('introVideo');
  var skip = document.getElementById('introSkip');
  var html = document.documentElement;
  var done = false;
  var fallbackTimer = null;

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
    markSeen();
    html.classList.remove('intro-lock');
    if (video) { try { video.pause(); } catch (e) { /* ignore */ } }
    overlay.classList.add('is-hidden');
    overlay.setAttribute('aria-hidden', 'true');
    var gone = false;
    var cleanup = function () { if (!gone) { gone = true; removeOverlay(); } };
    overlay.addEventListener('transitionend', cleanup);
    setTimeout(cleanup, 1200); // safety net if transitionend never fires
  }

  // Skip entirely for returning visitors in this session, or reduced-motion users.
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (alreadySeen() || reduce || !video) {
    removeOverlay();
    return;
  }

  html.classList.add('intro-lock');
  if (skip) skip.addEventListener('click', finish);
  video.addEventListener('ended', finish);
  video.addEventListener('error', finish);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') finish();
  });

  // Safety net: never trap the page if playback stalls.
  fallbackTimer = setTimeout(finish, 12000);

  var p = video.play();
  if (p && typeof p.catch === 'function') {
    p.catch(function () { finish(); }); // autoplay blocked: show the landing page
  }
})();
