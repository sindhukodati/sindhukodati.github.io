/* Simple JS: smooth scroll, active nav, mobile menu, reveal, contact demo */

const q = s => document.querySelector(s);
const qa = s => Array.from(document.querySelectorAll(s));

// fill year
const y = q('#year');
if (y) y.textContent = new Date().getFullYear();

// Smooth scroll + active nav
const navLinks = qa('.nav-links a');

function updateActive() {
  const secs = qa('section');
  const top = window.scrollY + 140;
  let cur = secs.find(s => s.offsetTop <= top && s.offsetTop + s.offsetHeight > top);
  if (!cur) cur = secs[secs.length-1];
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur.id));
}
window.addEventListener('scroll', updateActive, {passive:true});
updateActive();

navLinks.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const id = a.getAttribute('href').substring(1);
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({top: el.offsetTop - 84, behavior:'smooth'});
  const navLinksEl = q('#navLinks');
  if (navLinksEl && window.innerWidth < 1000) navLinksEl.style.display = 'none';
}));

// Mobile burger
const burger = q('#burger'), navLinksEl = q('#navLinks');
if (burger && navLinksEl) {
  burger.addEventListener('click', () => {
    navLinksEl.style.display = navLinksEl.style.display === 'flex' ? 'none' : 'flex';
  });
  document.addEventListener('click', (ev) => {
    if (window.innerWidth >= 1000) return;
    if (!navLinksEl.contains(ev.target) && !burger.contains(ev.target)) navLinksEl.style.display = 'none';
  });
}

// Reveal on scroll (simple)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, {threshold: 0.12});
qa('.reveal').forEach(el => observer.observe(el));

// Contact form demo handler
const form = q('#contactForm'), status = q('#formStatus');
if (form) {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = (form.name?.value||'').trim();
    const email = (form.email?.value||'').trim();
    const message = (form.message?.value||'').trim();
    if (!name || !email || !message) {
      status.style.color = 'salmon';
      status.textContent = 'Please complete all fields.';
      return;
    }
    status.style.color = '#6ff';
    status.textContent = 'Sending... (demo)';
    setTimeout(()=> { form.reset(); status.style.color='#6ff'; status.textContent = 'Thanks — message sent! (demo)'; }, 900);
  });
}

// scroll helper used by brand click
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({top: el.offsetTop - 84, behavior:'smooth'});
}
