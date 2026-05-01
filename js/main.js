/* =========================================
   NEXUS STORE — Shared JS (main.js)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar scroll effect --- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  /* --- Mobile hamburger --- */
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('nav-links');
  ham?.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
  });
  // close on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      ham?.classList.remove('open');
      menu?.classList.remove('open');
    });
  });

  /* --- Active nav link by current page --- */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* --- Scroll-reveal via IntersectionObserver --- */
  const reveals = document.querySelectorAll('[data-reveal]');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-fade-up');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => { el.style.opacity = 0; revealObs.observe(el); });

  /* --- Toast helper (global) --- */
  window.showToast = function(msg, icon = '✅') {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  };

  /* --- Smooth counter animation --- */
  function animateCounter(el) {
    const target = +el.dataset.count;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
    }, 16);
  }
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); cObs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  /* --- Cart count badge (persisted in localStorage) --- */
  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('nexus_cart') || '[]');
    const total = cart.reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll('.cart-count').forEach(b => {
      b.textContent = total;
      b.style.display = total ? 'flex' : 'none';
    });
  }
  window.addToCart = function(name, price) {
    const cart = JSON.parse(localStorage.getItem('nexus_cart') || '[]');
    const idx  = cart.findIndex(i => i.name === name);
    if (idx > -1) cart[idx].qty++;
    else cart.push({ name, price, qty: 1 });
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
    updateCartBadge();
    showToast(`"${name}" added to cart! 🛒`);
  };
  updateCartBadge();
});
