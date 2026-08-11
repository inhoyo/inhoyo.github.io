/* ── Nav scroll ──────────────────────────────────────────────────────────── */
const nav = document.querySelector('.site-nav');
if (nav) {
  const tick = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

/* ── Mobile menu ─────────────────────────────────────────────────────────── */
const burger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

/* ── Collapsible toggles (publications / co-authored timeline) ───────────── */
document.querySelectorAll('[data-toggle-target]').forEach(btn => {
  const target = document.getElementById(btn.getAttribute('data-toggle-target'));
  if (!target) return;
  btn.addEventListener('click', () => {
    const nowHidden = !target.hidden;
    target.hidden = nowHidden;
    btn.querySelector('[data-show]').hidden = !nowHidden;
    btn.querySelector('[data-hide]').hidden = nowHidden;
  });
});

/* ── Intersection Observer — fade-up ─────────────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach(el => io.observe(el));
}

/* ── About page: nav always scrolled ────────────────────────────────────── */
if (nav && document.body.dataset.page === 'about') {
  nav.classList.add('scrolled');
}
