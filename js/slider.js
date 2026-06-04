/**
 * Testimonials carousel (home page).
 */
(function () {
  const track = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderDots');
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.review-card');
  let curSlide = 0;
  let perSlide = 3;
  let intervalId;

  function updateSlider() {
    perSlide = window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1;
    const totalSlides = Math.ceil(cards.length / perSlide);
    if (curSlide >= totalSlides) curSlide = 0;
    cards.forEach((c) => {
      c.style.minWidth = `calc(${100 / perSlide}% - ${((perSlide - 1) * 24) / perSlide}px)`;
    });
    track.style.transform = `translateX(-${curSlide * (100 / perSlide)}%)`;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const d = document.createElement('button');
      d.className = `dot${i === curSlide ? ' active' : ''}`;
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.addEventListener('click', () => {
        curSlide = i;
        updateSlider();
      });
      dotsContainer.appendChild(d);
    }
  }

  updateSlider();
  window.addEventListener('resize', updateSlider);
  intervalId = setInterval(() => {
    const total = Math.ceil(cards.length / perSlide);
    curSlide = (curSlide + 1) % total;
    updateSlider();
  }, 4500);
})();
