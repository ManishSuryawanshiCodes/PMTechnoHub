/**
 * Asymmetric bento gallery + project album lightbox
 */
(function () {
  const grid = document.getElementById('gallery-bento');
  if (!grid || typeof PMTHUB_DATA === 'undefined') return;

  const projects = PMTHUB_DATA.galleryProjects || [];
  let albumState = { images: [], index: 0, title: '' };

  const lightbox = document.createElement('div');
  lightbox.className = 'project-lightbox';
  lightbox.id = 'projectLightbox';
  lightbox.innerHTML = `
    <button type="button" class="project-lightbox-close" aria-label="Close">&times;</button>
    <h3 id="projectLightboxTitle"></h3>
    <div class="project-lightbox-main" id="projectLightboxMain"></div>
    <div class="project-lightbox-thumbs" id="projectLightboxThumbs"></div>
    <div class="project-lightbox-nav">
      <button type="button" id="projectPrev">← Prev</button>
      <button type="button" id="projectNext">Next →</button>
    </div>`;
  document.body.appendChild(lightbox);

  const titleEl = document.getElementById('projectLightboxTitle');
  const mainEl = document.getElementById('projectLightboxMain');
  const thumbsEl = document.getElementById('projectLightboxThumbs');

  function placeholder(title) {
    return `<div style="width:100%;min-height:280px;background:linear-gradient(135deg,rgba(0,112,243,0.1),rgba(0,198,255,0.08));display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;font-family:var(--font-heading);color:var(--blue)">${title}</div>`;
  }

  function renderMain() {
    const src = albumState.images[albumState.index];
    mainEl.innerHTML = src
      ? `<img src="${src}" alt="${albumState.title}" onerror="this.outerHTML='${placeholder(albumState.title).replace(/'/g, '&#39;')}'"/>`
      : placeholder(albumState.title);
    thumbsEl.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === albumState.index));
  }

  function openAlbum(project) {
    albumState = {
      title: project.title,
      images: project.images && project.images.length ? project.images : [project.cover],
      index: 0,
    };
    titleEl.textContent = project.title;
    thumbsEl.innerHTML = albumState.images
      .map(
        (src, i) =>
          `<button type="button" data-i="${i}" class="${i === 0 ? 'active' : ''}"><img src="${src}" alt="" onerror="this.parentElement.style.background='rgba(0,112,243,0.2)'"/></button>`
      )
      .join('');
    thumbsEl.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        albumState.index = +btn.dataset.i;
        renderMain();
      });
    });
    renderMain();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAlbum() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  window.closeProjectAlbum = closeAlbum;

  lightbox.querySelector('.project-lightbox-close').addEventListener('click', closeAlbum);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeAlbum(); });
  document.getElementById('projectPrev').addEventListener('click', () => {
    albumState.index = (albumState.index - 1 + albumState.images.length) % albumState.images.length;
    renderMain();
  });
  document.getElementById('projectNext').addEventListener('click', () => {
    albumState.index = (albumState.index + 1) % albumState.images.length;
    renderMain();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeAlbum();
    if (e.key === 'ArrowRight') document.getElementById('projectNext').click();
    if (e.key === 'ArrowLeft') document.getElementById('projectPrev').click();
  });

  projects.forEach((p) => {
    const el = document.createElement('article');
    el.className = `gallery-bento-item size-${p.size || 'medium'} reveal`;
    el.innerHTML = `
      <img src="${p.cover}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'"/>
      <span class="gallery-bento-caption">${p.title}</span>
      <div class="overlay"><span class="overlay-icon">🔍</span></div>`;
    el.addEventListener('click', () => openAlbum(p));
    grid.appendChild(el);
  });

  document.dispatchEvent(new CustomEvent('pmthub:rendered'));
})();
