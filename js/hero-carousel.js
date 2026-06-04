/**
 * Hero background carousel — home page
 */
(function () {
  const hero = document.getElementById('hero');
  if (!hero || !hero.classList.contains('has-carousel')) return;

  const slides = hero.querySelectorAll('.hero-slide');
  const dots = hero.querySelectorAll('.hero-carousel-dots button');
  if (!slides.length) return;

  let idx = 0;
  let timer;

  function goTo(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('active', n === idx));
    dots.forEach((d, n) => d.classList.toggle('active', n === idx));
  }

  function next() { goTo(idx + 1); }

  dots.forEach((btn, i) => btn.addEventListener('click', () => { goTo(i); resetTimer(); }));

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5500);
  }

  goTo(0);
  resetTimer();
})();
