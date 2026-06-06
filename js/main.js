/**
 * Core UI: navbar, mobile menu, scroll reveal, stat counters, nav active state.
 */
(function () {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener(
      'scroll',
      () => navbar.classList.toggle('scrolled', window.scrollY > 50),
      { passive: true }
    );
  }

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
    navMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navMenu.classList.remove('open'))
    );
  }

  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`[data-nav="${page}"]`).forEach((el) => el.classList.add('nav-active'));
  }

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || e.target.classList.contains('counted')) return;
        e.target.classList.add('counted');
        const target = +e.target.dataset.target;
        const suffix = e.target.dataset.suffix || '+';
        let cur = 0;
        const step = target / 60;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          e.target.textContent = Math.floor(cur) + suffix;
          if (cur >= target) clearInterval(t);
        }, 20);
      });
    },
    { threshold: 0.5 }
  );
  function observeCounters() {
    document.querySelectorAll('[data-target]').forEach((c) => counterObs.observe(c));
  }
  observeCounters();

  function observeReveals() {
    document.querySelectorAll('.reveal:not(.observed)').forEach((el) => {
      el.classList.add('observed');
      revealObs.observe(el);
    });
  }
  observeReveals();

  document.addEventListener('pmthub:rendered', () => {
    observeReveals();
    observeCounters();
  });

  // Bubble pop-up animation in hero
  function initBubbles() {
    const bubbleContainer = document.querySelector('.bubble-container');
    if (!bubbleContainer) return;

    const techIcons = ['🤖', '📡', '⚙️', '🔌', '🔋', '💡', '🧠', '🛠️', '📟', '💾', '💻', '🛰️'];

    function createBubble() {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
      bubble.innerHTML = `<span class="bubble-icon">${randomIcon}</span>`;
      
      const size = Math.floor(Math.random() * 25) + 35; // 35px to 60px
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      
      const duration = Math.floor(Math.random() * 5) + 8; // 8s to 13s
      bubble.style.animationDuration = `${duration}s`;
      
      bubbleContainer.appendChild(bubble);

      setTimeout(() => bubble.remove(), duration * 1000);
    }

    // Create initial bubbles
    for (let i = 0; i < 6; i++) {
      setTimeout(() => createBubble(), i * 1500);
    }

    // Create bubbles continuously
    setInterval(() => createBubble(), 2200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBubbles);
  } else {
    initBubbles();
  }
})();
