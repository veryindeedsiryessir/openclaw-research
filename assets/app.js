function markActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

function injectFooterDate() {
  const el = document.querySelector('[data-build-date]');
  if (!el) return;
  const d = new Date();
  el.textContent = d.toISOString().slice(0, 10);
}

markActiveNav();
injectFooterDate();
