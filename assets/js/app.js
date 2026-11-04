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

/* ── Reduced motion gate (all decorative motion below respects it) ──────── */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Hero light field: drifting waveguide lines with travelling photons ─── */
const heroEl = document.querySelector('.hero');
if (heroEl && !reduceMotion && heroEl.querySelector('.hero-left') && document.body.dataset.hero3d !== 'on') {
  const cvs = document.createElement('canvas');
  cvs.className = 'hero-field';
  cvs.setAttribute('aria-hidden', 'true');
  heroEl.prepend(cvs);
  const ctx = cvs.getContext('2d');
  const LINES = 7;
  let w = 0, h = 0, t = 0, running = false, raf = 0;
  let px = -1e4, py = -1e4; // pointer position inside the hero (canvas space)

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = heroEl.clientWidth;
    h = heroEl.clientHeight;
    cvs.width = w * dpr;
    cvs.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  // y position of line i at x, for a given time
  const yAt = (x, i) => {
    const base = h * (0.18 + i * (0.64 / (LINES - 1)));
    const amp = 16 + i * 5;
    const freq = 0.0026 + i * 0.0003;
    const phase = t * (0.5 + i * 0.1) + i * 1.3;
    // the pointer bends nearby lines like a lens in a waveguide
    const dx = x - px, dy = base - py;
    const lens = Math.exp(-(dx * dx) / (2 * 130 * 130)) * Math.exp(-(dy * dy) / (2 * 160 * 160));
    return base
      + Math.sin(x * freq + phase) * amp
      + Math.sin(x * freq * 2.3 - phase * 0.7) * amp * 0.25
      + (py - base) * lens * 0.45;
  };

  const frame = () => {
    if (!running) return;
    t += 0.012;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < LINES; i++) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        x === 0 ? ctx.moveTo(x, yAt(x, i)) : ctx.lineTo(x, yAt(x, i));
      }
      ctx.strokeStyle = `rgba(79,195,247,${0.05 + (i % 3) * 0.025})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // one photon per line, sliding left to right
      const px = ((t * 70 + i * 151) % (w + 160)) - 80;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(160,225,255,0.85)';
      ctx.arc(px, yAt(px, i), 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };

  // Only animate while the hero is on screen
  new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting;
    if (running) { cancelAnimationFrame(raf); frame(); }
  }).observe(heroEl);

  resize();
  window.addEventListener('resize', resize, { passive: true });

  if (window.matchMedia('(pointer: fine)').matches) {
    heroEl.addEventListener('pointermove', e => {
      const r = cvs.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    }, { passive: true });
    heroEl.addEventListener('pointerleave', () => { px = -1e4; py = -1e4; });
  }
}

/* ── Cursor halo (fine pointers only, never on touch) ───────────────────── */
if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const halo = document.createElement('div');
  halo.className = 'cursor-halo';
  halo.setAttribute('aria-hidden', 'true');
  document.body.appendChild(halo);

  let mx = 0, my = 0, hx = 0, hy = 0;
  const INTERACTIVE = 'a, button, .btn, summary, .rp, .pub-row, .news-row, .affils-track a';

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    halo.classList.add('on');
  }, { passive: true });

  document.addEventListener('mouseover', e => {
    halo.classList.toggle('is-hover', !!(e.target instanceof Element && e.target.closest(INTERACTIVE)));
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => halo.classList.remove('on'));

  const follow = () => {
    hx += (mx - hx) * 0.2;
    hy += (my - hy) * 0.2;
    halo.style.transform = `translate3d(${hx}px, ${hy}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  };
  follow();

  /* ── Magnetic CTAs: buttons lean toward the cursor ─────────────────────── */
  const magnetic = document.querySelectorAll('.btn');
  magnetic.forEach(btn => btn.classList.add('magnetic'));
  document.addEventListener('mousemove', e => {
    magnetic.forEach(btn => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const near = Math.hypot(dx, dy) < Math.max(r.width, r.height) * 0.9;
      btn.style.transform = near ? `translate(${dx * 0.22}px, ${dy * 0.22}px)` : '';
    });
  }, { passive: true });
}

/* ── Light-beam scroll progress (a beam travelling down the page) ─────── */
if (!reduceMotion) {
  const beam = document.createElement('div');
  beam.className = 'scroll-beam';
  beam.setAttribute('aria-hidden', 'true');
  document.body.appendChild(beam);
  let queued = false;
  const update = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    beam.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

/* ── Scramble-decode section titles on reveal ─────────────────────────── */
if (!reduceMotion) {
  const GLYPHS = '/\\|#%*<>+=-_';
  const decode = el => {
    const final = el.textContent;
    const frames = 24;
    let f = 0;
    const timer = setInterval(() => {
      f++;
      const settled = Math.floor((f / frames) * final.length);
      el.textContent = [...final].map((c, i) =>
        (i < settled || c === ' ') ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      ).join('');
      if (f >= frames) { clearInterval(timer); el.textContent = final; }
    }, 30);
  };
  const titleIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting && !e.target.children.length) {
      decode(e.target);
      titleIO.unobserve(e.target);
    }
  }), { threshold: 0.6 });
  document.querySelectorAll('.section-title').forEach(el => titleIO.observe(el));
}
