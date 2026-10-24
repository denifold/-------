const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Mobile menu
const menuBtn = $('#menu-btn'), mobileMenu = $('#mobile-menu');
function toggleMenu(open) {
  mobileMenu.classList.toggle('hidden', !open);
  $('#icon-open').classList.toggle('hidden', open);
  $('#icon-close').classList.toggle('hidden', !open);
  menuBtn.setAttribute('aria-expanded', String(open));
}
menuBtn.addEventListener('click', () => toggleMenu(mobileMenu.classList.contains('hidden')));
$$('a', mobileMenu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// 2. Dark / light theme (choice is saved)
$('#theme-btn').addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
});

// 3. Typing effect for roles in the Hero
const roles = ['Data Curation Associate', 'Junior Data Analyst', 'CS Graduate', 'Aspiring Front-end Developer'];
const typedEl = $('#typed');
if (reduceMotion) {
  typedEl.textContent = roles[0];
} else {
  let r = 0, c = 0, deleting = false;
  (function tick() {
    const word = roles[r];
    typedEl.textContent = word.slice(0, c);
    let delay = deleting ? 40 : 90;
    if (!deleting && c === word.length) { deleting = true; delay = 1500; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 400; }
    else { c += deleting ? -1 : 1; }
    setTimeout(tick, delay);
  })();
}

// 4. Reveal elements on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

// 5. Animated counters
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const fmt = v => el.dataset.nogroup ? v.toFixed(decimals) : v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  if (reduceMotion) { el.textContent = fmt(target); return; }
  const start = performance.now(), duration = 1400;
  (function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(start);
}
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countObserver.unobserve(e.target); } });
}, { threshold: 0.6 });
$$('[data-count]').forEach(el => countObserver.observe(el));

// 6. Expandable experience cards
$$('.exp-card').forEach(card => {
  const toggle = () => {
    const body = $('.exp-body', card);
    const open = body.classList.toggle('hidden') === false;
    card.setAttribute('aria-expanded', String(open));
    $('.chev', card).style.transform = open ? 'rotate(180deg)' : '';
  };
  card.addEventListener('click', toggle);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
});
// First card is open by default
const firstCard = $('.exp-card'); if (firstCard) firstCard.click();

// 7. Project filter
$$('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
  const f = btn.dataset.filter;
  $$('.filter-btn').forEach(b => {
    const active = b === btn;
    b.classList.toggle('bg-brand-600', active);
    b.classList.toggle('text-white', active);
    b.classList.toggle('bg-slate-100', !active);
    b.classList.toggle('text-slate-700', !active);
    b.classList.toggle('dark:bg-slate-800', !active);
    b.classList.toggle('dark:text-slate-300', !active);
  });
  $$('.project').forEach(p => p.classList.toggle('hidden', f !== 'all' && p.dataset.cat !== f));
}));

// 8. Highlight the active menu item
const sections = ['home', 'experience', 'projects', 'skills', 'contact'].map(id => document.getElementById(id));
const links = $$('.nav-link');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && spy.observe(s));

// 9. Scroll progress bar and "back to top" button
const bar = $('#progress'), toTop = $('#to-top');
function onScroll() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  const show = h.scrollTop > 500;
  toTop.classList.toggle('hidden', !show);
  toTop.classList.toggle('flex', show);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

// 10. Copy email
$('#copy-email').addEventListener('click', async (e) => {
  const btn = e.currentTarget, original = btn.textContent;
  try { await navigator.clipboard.writeText('nazar.kosux@ukr.net'); btn.textContent = '✅ Copied!'; }
  catch (err) { btn.textContent = 'nazar.kosux@ukr.net'; }
  setTimeout(() => (btn.textContent = original), 2000);
});

// 11. Form: character counter, validation, send via mailto
const form = $('#contact-form'), status = $('#form-status'), msg = $('#message');
msg.addEventListener('input', () => ($('#counter').textContent = msg.value.length + ' / 500'));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim(), email = form.email.value.trim(), message = msg.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  status.classList.remove('hidden', 'text-green-600', 'text-red-600');
  if (!name || !emailOk || !message) {
    status.textContent = 'Please fill in all fields and enter a valid email address.';
    status.classList.add('text-red-600');
    return;
  }
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + '\n' + email);
  window.location.href = 'mailto:nazar.kosux@ukr.net?subject=' + subject + '&body=' + body;
  status.textContent = 'Opening your email app…';
  status.classList.add('text-green-600');
});

$('#year').textContent = new Date().getFullYear();