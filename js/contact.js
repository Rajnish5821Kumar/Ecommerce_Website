/* === CONTACT PAGE JS === */

function submitContact(e) {
  e.preventDefault();
  let valid = true;

  const fields = [
    { id: 'cf-name',    err: 'err-name',    msg: 'Please enter your full name.' },
    { id: 'cf-email',   err: 'err-email',   msg: 'Please enter a valid email.' },
    { id: 'cf-subject', err: 'err-subject', msg: 'Please select a subject.' },
    { id: 'cf-message', err: 'err-message', msg: 'Please enter your message.' },
  ];

  fields.forEach(f => {
    const el  = document.getElementById(f.id);
    const err = document.getElementById(f.err);
    if (!el.value.trim()) {
      err.textContent = f.msg;
      el.classList.add('error');
      valid = false;
    } else {
      err.textContent = '';
      el.classList.remove('error');
    }
  });

  // Email format check
  const email = document.getElementById('cf-email');
  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    document.getElementById('err-email').textContent = 'Please enter a valid email address.';
    email.classList.add('error');
    valid = false;
  }

  if (!valid) return;

  const btn = document.getElementById('cf-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate send
  setTimeout(() => {
    showToast('✅ Message sent! We\'ll reply within 24 hours.', '✅');
    document.getElementById('contact-form').reset();
    btn.textContent = 'Send Message →';
    btn.disabled = false;
  }, 1400);
}

// Accordion
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.acc-item');
      const body = item.querySelector('.acc-body');
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all
      document.querySelectorAll('.acc-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
      document.querySelectorAll('.acc-body').forEach(b => b.classList.remove('open'));

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        body.classList.add('open');
      }
    });
  });

  // Open first by default
  const first = document.querySelector('.acc-trigger');
  if (first) {
    first.setAttribute('aria-expanded', 'true');
    first.closest('.acc-item').querySelector('.acc-body').classList.add('open');
  }
});
