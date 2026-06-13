/**
 * Shared logo markup + full site footer for PM TECHNO HUBB
 */
(function () {
  const LOGO_SRC = 'images/logo.png';
  const BRAND = 'PM TECHNO HUBB';

  document.querySelectorAll('.logo').forEach((el) => {
    if (el.querySelector('.logo-text')) {
      el.classList.add('logo--with-text');
    }
    if (el.querySelector('.logo-img')) return;
    const icon = el.querySelector('.logo-icon');
    if (icon) icon.remove();
    const img = document.createElement('img');
    img.src = LOGO_SRC;
    img.alt = BRAND;
    img.className = 'logo-img';
    img.width = 48;
    img.height = 48;
    el.prepend(img);
    const text = el.querySelector('.logo-text');
    if (text) text.textContent = BRAND;
  });

  const footerEl = document.getElementById('site-footer');
  if (!footerEl || footerEl.dataset.loaded) return;
  footerEl.dataset.loaded = '1';
  footerEl.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo logo--footer">
          <img src="${LOGO_SRC}" alt="${BRAND}" class="logo-img" width="56" height="56" />
          <span class="logo-text">${BRAND}</span>
        </a>
        <p>We Build Intelligence — IoT, robotics &amp; STEM in Karvenagar, Pune.</p>
        <div class="footer-social">
          <a href="https://instagram.com/pmtechnohubb" class="social-btn" target="_blank" rel="noopener" aria-label="Instagram">📸</a>
          <a href="mailto:pmtechnohub@gmail.com" class="social-btn" aria-label="Email">✉️</a>
          <a href="tel:+919021800883" class="social-btn" aria-label="Phone">📞</a>
        </div>
      </div>
      <div class="footer-col"><h5>Quick Links</h5><ul>
        <li><a href="index.html">Home</a></li><li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li><li><a href="workshops.html">Workshops</a></li>
        <li><a href="contact.html">Contact</a></li></ul></div>
      <div class="footer-col"><h5>Explore</h5><ul>
        <li><a href="products.html">Products</a></li><li><a href="partnerships.html">Partnerships</a></li>
        <li><a href="services.html">Industrial IoT</a></li></ul></div>
      <div class="footer-col"><h5>Newsletter</h5>
        <p style="font-size:13px;color:var(--text-dim)">Workshop updates from ${BRAND}.</p>
        <div class="newsletter-form"><input type="email" id="nlEmail" placeholder="your@email.com" aria-label="Email" />
        <button type="button" onclick="subscribeNewsletter()" aria-label="Subscribe">→</button></div>
        <p id="nlMsg" style="display:none;font-size:12px;color:var(--blue);margin-top:8px">Thanks for subscribing!</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 ${BRAND}. Karvenagar, Pune, Maharashtra.</p>
      <div class="footer-links"><a href="#">Privacy</a><a href="#">Terms</a></div>
    </div>`;
})();
