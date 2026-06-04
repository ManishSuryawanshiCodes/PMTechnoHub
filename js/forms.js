/**
 * Contact form, newsletter, escape handlers.
 */
window.handleContact = function (e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form) form.style.display = 'none';
  if (success) success.style.display = 'block';
};

window.subscribeNewsletter = function () {
  const email = document.getElementById('nlEmail')?.value;
  if (email && email.includes('@')) {
    const msg = document.getElementById('nlMsg');
    if (msg) msg.style.display = 'block';
    document.getElementById('nlEmail').value = '';
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (typeof closeModal === 'function') closeModal();
  if (typeof closeProjectAlbum === 'function') closeProjectAlbum();
});
