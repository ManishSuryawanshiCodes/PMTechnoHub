/**
 * Workshop registration modal.
 */
(function () {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  window.openModal = function (workshop) {
    const subtitle = document.getElementById('modal-subtitle');
    if (subtitle) subtitle.textContent = `Register for: ${workshop}`;
    const select = overlay.querySelector('select');
    if (select) select.value = workshop;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  window.handleRegister = function (e) {
    e.preventDefault();
    const n = e.target.querySelector('input[type="text"]')?.value || 'Guest';
    closeModal();
    setTimeout(() => alert(`Registration confirmed for ${n}!\nWe'll contact you shortly.`), 300);
    e.target.reset();
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();
