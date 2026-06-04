/**
 * Renders mapped data into service, workshop, product, and why-choose grids.
 */
(function () {
  if (typeof PMTHUB_DATA === 'undefined') return;

  function accentClass(accent) {
    return accent === 'cyan' ? 'cyan-accent' : 'blue-accent';
  }

  const servicesEl = document.getElementById('services-grid');
  if (servicesEl && PMTHUB_DATA.services) {
    servicesEl.innerHTML = PMTHUB_DATA.services
      .map(
        (s, i) => `
      <div class="offer-card ${accentClass(s.accent)} card-lift reveal reveal-delay-${(i % 4) + 1}">
        <div class="offer-icon">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <span class="offer-tag">${s.tag}</span>
      </div>`
      )
      .join('');
  }

  const workshopsEl = document.getElementById('workshops-grid');
  if (workshopsEl && PMTHUB_DATA.workshops) {
    workshopsEl.innerHTML = PMTHUB_DATA.workshops
      .map(
        (w, i) => `
      <div class="workshop-card card-lift reveal reveal-delay-${(i % 4) + 1}">
        ${w.open ? '<div class="badge-open">Open</div>' : ''}
        <div class="ws-duration">⏱ ${w.duration}</div>
        <h3>${w.title}</h3>
        <ul class="ws-topics">${w.topics.map((t) => `<li>${t}</li>`).join('')}</ul>
        <button type="button" class="ws-register" data-workshop="${w.title}">Register Now →</button>
      </div>`
      )
      .join('');
    workshopsEl.querySelectorAll('.ws-register').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (typeof openModal === 'function') openModal(btn.dataset.workshop);
      });
    });
    const modalSelect = document.querySelector('#modalOverlay select');
    if (modalSelect) {
      modalSelect.innerHTML =
        '<option value="" disabled selected>Select Workshop</option>' +
        PMTHUB_DATA.workshops.map((w) => `<option>${w.title}</option>`).join('');
    }
  }

  const productsEl = document.getElementById('products-grid');
  if (productsEl && PMTHUB_DATA.products) {
    productsEl.innerHTML = PMTHUB_DATA.products
      .map(
        (p, i) => `
      <article class="product-card card-lift reveal reveal-delay-${(i % 4) + 1}">
        <div class="product-card-head"><div class="offer-icon">${p.icon}</div><span class="offer-tag">${p.tag}</span></div>
        <div class="product-card-body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <span class="product-price">Inquire to Buy</span>
          <a href="contact.html" class="btn-secondary product-cta">Contact Us</a>
        </div>
      </article>`
      )
      .join('');
  }

  const whyEl = document.getElementById('why-grid');
  if (whyEl && PMTHUB_DATA.whyChoose) {
    whyEl.innerHTML = PMTHUB_DATA.whyChoose
      .map(
        (w, i) => `
      <div class="why-card ${w.cert ? 'cert-card' : ''} reveal reveal-delay-${(i % 4) + 1}">
        <div class="why-icon">${w.icon}</div>
        <h4>${w.title}</h4>
      </div>`
      )
      .join('');
  }

  const statsEl = document.getElementById('stats-grid');
  if (statsEl && PMTHUB_DATA.stats) {
    statsEl.innerHTML = PMTHUB_DATA.stats
      .map(
        (s) => `
      <div class="stat-card">
        <div class="stat-number" data-target="${s.target}" data-suffix="${s.label.includes('%') ? '%' : '+'}">0</div>
        <div class="stat-label">${s.label}</div>
      </div>`
      )
      .join('');
  }

  document.dispatchEvent(new CustomEvent('pmthub:rendered'));
})();
