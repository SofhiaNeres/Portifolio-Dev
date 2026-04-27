/* =========================================================
   SOFHIA NERES — Portfolio · script.js
   ========================================================= */

/* ── Custom Cursor ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

/* Smooth ring follow */
(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

/* Ring grows on hoverable elements */
const hoverables = document.querySelectorAll('a, button, .skill-card, .projeto-card');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width  = '56px';
    cursorRing.style.height = '56px';
    cursorRing.style.opacity = '0.6';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width  = '32px';
    cursorRing.style.height = '32px';
    cursorRing.style.opacity = '1';
  });
});

/* ── Nav Scroll State ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Reveal on Scroll ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      /* Animate skill bar if inside a skill card */
      const bar = entry.target.querySelector?.('.skill-bar');
      if (bar) entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .skill-card').forEach(el => {
  revealObserver.observe(el);
});

/* ── Contact Form ── */
const form  = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form?.addEventListener('submit', e => {
  e.preventDefault();
  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 3500);
});

/* ── Smooth active nav link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));