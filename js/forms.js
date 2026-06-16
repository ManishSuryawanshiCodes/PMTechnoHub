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

  const formspreeId = (window.ENV_CONFIG && window.ENV_CONFIG.FORMSPREE_ID) || 'mgobpqpn';

  try {
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
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
      let errorMessage = 'Oops! There was a problem submitting your form.';
      try {
        const data = await response.json();
        if (data && data.errors) {
          errorMessage = data.errors.map(err => err.message).join(', ');
        }
      } catch (jsonErr) {
        if (response.status === 404) {
          errorMessage = 'The contact form endpoint was not found (404). Please verify that your Formspree ID is correct.';
        } else if (response.status === 403) {
          errorMessage = 'The contact form submission was forbidden (403). Make sure your domain is allowed in your Formspree form settings.';
        }
      }
      alert(errorMessage);
      if (submitBtn) submitBtn.disabled = false;
      if (submitBtnText) submitBtnText.textContent = 'Send Message';
    }
  } catch (err) {
    alert('Oops! There was a problem connecting to the server. Please check your internet connection and try again.');
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
