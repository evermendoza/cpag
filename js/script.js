/* ═══════════════════════════════════════════════
   CPAG — script.js
   ═══════════════════════════════════════════════ */

// ── Dark Mode ──
const html      = document.documentElement;
const themeBtn  = document.getElementById('themeBtn');
const themeIcon = themeBtn.querySelector('.theme-icon');

// Load saved preference
const savedTheme = localStorage.getItem('cpag-theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = `theme-icon fas ${savedTheme === 'dark' ? 'fa-sun' : 'fa-moon'}`;

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeIcon.className = `theme-icon fas ${next === 'dark' ? 'fa-sun' : 'fa-moon'}`;
  localStorage.setItem('cpag-theme', next);
});

// ── Navbar scroll shadow ──
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile menu ──
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  const spans = burger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
    const spans = burger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Scroll animations (IntersectionObserver) ──
const animEls = document.querySelectorAll('[data-anim]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

animEls.forEach(el => observer.observe(el));

// ── Smooth active nav link highlight ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  },
  { rootMargin: '-50% 0px -50% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));