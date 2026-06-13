/**
 * Contact form, newsletter, escape handlers.
 */
window.handleContact = async function (e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  const submitBtnText = submitBtn ? submitBtn.querySelector('span') : null;

  if (!form) return;
  const formData = new FormData(form);

  if (submitBtn) submitBtn.disabled = true;
  if (submitBtnText) submitBtnText.textContent = 'Sending...';

  try {
    const response = await fetch('https://formspree.io/f/mgobpqpn', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    } else {
      const data = await response.json();
      alert(data.errors ? data.errors.map(err => err.message).join(', ') : 'Oops! There was a problem submitting your form.');
      if (submitBtn) submitBtn.disabled = false;
      if (submitBtnText) submitBtnText.textContent = 'Send Message';
    }
  } catch (err) {
    alert('Oops! There was a problem connecting to the server. Please try again later.');
    if (submitBtn) submitBtn.disabled = false;
    if (submitBtnText) submitBtnText.textContent = 'Send Message';
  }
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
