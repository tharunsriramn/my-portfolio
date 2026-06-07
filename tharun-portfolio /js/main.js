// ============================================
// THEME (Day / Night)
// ============================================
const html = document.documentElement;
const THEME_KEY = 'ts-theme';

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

// Load saved preference (or default to light)
const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(savedTheme);

// Wire up toggle button(s) on the page
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'light';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

if (cursor && trail) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover expansion
  document.querySelectorAll('a, button, .project-card, .outside-card, .cert-item, .tool-tags span').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hovering'); trail.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hovering'); trail.classList.remove('hovering'); });
  });
}

// ============================================
// PAGE TRANSITIONS
// ============================================
const overlay = document.createElement('div');
overlay.className = 'page-transition';
document.body.appendChild(overlay);

window.addEventListener('DOMContentLoaded', () => {
  overlay.classList.add('slide-out');
  setTimeout(() => { overlay.className = 'page-transition'; }, 550);
});

document.querySelectorAll('a.page-link, .nav-link, .nav-cta, .nav-logo').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http') || link.hasAttribute('download')) return;
    e.preventDefault();
    overlay.classList.add('slide-in');
    setTimeout(() => { window.location.href = href; }, 500);
  });
});

// ============================================
// NAV SCROLL
// ============================================
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ============================================
// MOBILE NAV
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ============================================
// HERO PARTICLES
// ============================================
const particleContainer = document.getElementById('heroParticles');
if (particleContainer) {
  const COUNT = 22;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1.5;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${-10 + Math.random() * 10}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${10 + Math.random() * 20}s;
      animation-delay: ${Math.random() * 15}s;
    `;
    particleContainer.appendChild(p);
  }
}

// ============================================
// SCROLL REVEAL
// ============================================
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.project-detail, .timeline-item, .reveal, .section-header, .currently-grid, .tool-group'
).forEach(el => revealObserver.observe(el));

// Staggered reveal for grid children
document.querySelectorAll('.project-grid .project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.09}s`;
});
document.querySelectorAll('.outside-grid .outside-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});
document.querySelectorAll('.cert-grid .cert-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.04}s`;
});
document.querySelectorAll('.tool-tags span').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.03}s`;
});

// ============================================
// SCROLL HINT FADE
// ============================================
const scrollHint = document.getElementById('scrollHint');
if (scrollHint) {
  window.addEventListener('scroll', () => {
    scrollHint.style.opacity = '0';
  }, { passive: true, once: true });
}

// ============================================
// HASH SCROLL (for projects.html#id links)
// ============================================
if (window.location.hash) {
  setTimeout(() => {
    const target = document.querySelector(window.location.hash);
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, 580);
}

// ============================================
// STAT NUMBER COUNTER ANIMATION
// ============================================
function animateCounter(el, target, suffix, duration = 1400) {
  const isPercent = suffix === '%';
  const isDollar  = suffix.startsWith('$');
  let start = null;
  const num = parseFloat(target.replace(/[^0-9.]/g, ''));

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current = eased * num;

    if (isDollar) {
      el.textContent = '$' + Math.round(current) + 'k';
    } else if (isPercent) {
      el.textContent = Math.round(current) + '%';
    } else {
      el.textContent = target; // for non-numeric like "$77k"
    }

    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

// Observe stat numbers on the hero
const statNums = document.querySelectorAll('.stat-num');
if (statNums.length) {
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const original = el.textContent.trim();
        const suffix = original.includes('%') ? '%' : original.includes('$') ? '$k' : '';
        animateCounter(el, original, suffix);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));
}

// ============================================
// CONTACT FORM
// ============================================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      if (res.ok) {
        btn.innerHTML = 'Sent ✓';
        form.reset();
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
      } else throw new Error();
    } catch {
      const name = data.get('name') || '';
      const subj = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(data.get('message') || '');
      window.location.href = `mailto:sriramtharun.n@gmail.com?subject=${subj}&body=${body}`;
      btn.innerHTML = orig;
      btn.disabled = false;
    }
  });
}
