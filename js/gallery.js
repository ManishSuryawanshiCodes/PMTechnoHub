/**
 * PM TECHNO HUBB — Premium MongoDB-integrated Gallery & Lightbox
 */
(function () {
  const grid = document.getElementById('gallery-bento');
  const filterGroup = document.getElementById('gallery-filter');
  if (!grid) return;

  let galleryItems = []; // Contains project objects
  let filteredItems = []; // Contains filtered project objects
  let activeProject = null;
  let activeMediaIndex = 0;

  // Lightbox container setup
  const lightbox = document.createElement('div');
  lightbox.className = 'project-lightbox';
  lightbox.id = 'projectLightbox';
  lightbox.innerHTML = `
    <button type="button" class="project-lightbox-close" aria-label="Close">&times;</button>
    <div class="project-lightbox-main" id="projectLightboxMain"></div>
    <div class="project-lightbox-thumbs" id="projectLightboxThumbs"></div>
    <div class="project-lightbox-nav">
      <button type="button" id="projectPrev">← Prev</button>
      <button type="button" id="projectNext">Next →</button>
    </div>`;
  document.body.appendChild(lightbox);
  const mainEl = document.getElementById('projectLightboxMain');
  const thumbsEl = document.getElementById('projectLightboxThumbs');
  const prevBtn = document.getElementById('projectPrev');
  const nextBtn = document.getElementById('projectNext');

  // Load gallery data
  async function initGallery() {
    try {
      console.log('Fetching projects from MongoDB API...');
      const response = await fetch('/api/gallery');
      if (!response.ok) throw new Error('API response not OK');
      
      const data = await response.json();
      if (data && data.length > 0) {
        galleryItems = data;
        console.log(`Loaded ${galleryItems.length} projects from MongoDB.`);
      } else {
        throw new Error('No items in database');
      }
    } catch (err) {
      console.warn('MongoDB Gallery fetch failed. Falling back to local static data:', err.message);
      
      // Fallback: structured list of projects utilizing existing local media files
      const fallbackProjects = [
        {
          _id: 'fallback-p0',
          title: 'Robotics Workshop',
          category: 'Robotics',
          size: 'large',
          coverPath: 'images/gallery/IMG20211223150621.jpg',
          coverType: 'image',
          media: [
            { title: 'Robotics Arm Mechanism Design', path: 'images/gallery/IMG20211223150621.jpg', type: 'image', date: 'Dec 23, 2021' },
            { title: 'Chassis Development & Assembly', path: 'images/gallery/IMG20220510201314.jpg', type: 'image', date: 'May 10, 2022' },
            { title: 'Robot Speed Run', path: 'images/gallery/VID-20220518-WA0000.mp4', type: 'video', date: 'May 18, 2022' }
          ]
        },
        {
          _id: 'fallback-p1',
          title: 'Arduino & Sensors Lab',
          category: 'Arduino & Sensors',
          size: 'wide',
          coverPath: 'images/gallery/IMG20220216091538.jpg',
          coverType: 'image',
          media: [
            { title: 'Multi-sensor Shield Debugging', path: 'images/gallery/IMG20220216091538.jpg', type: 'image', date: 'Feb 16, 2022' },
            { title: 'Buzzer Melodies & Keypad Matrix', path: 'images/gallery/IMG20220525201247.jpg', type: 'image', date: 'May 25, 2022' }
          ]
        },
        {
          _id: 'fallback-p2',
          title: 'PCB Soldering',
          category: 'PCB Soldering',
          size: 'tall',
          coverPath: 'images/gallery/IMG20220217112105.jpg',
          coverType: 'image',
          media: [
            { title: 'Soldering Practice & Iron Safety', path: 'images/gallery/IMG20220217112105.jpg', type: 'image', date: 'Feb 17, 2022' },
            { title: 'Soldering Resistors on Custom PCB', path: 'images/gallery/IMG20220525213755.jpg', type: 'image', date: 'May 25, 2022' }
          ]
        },
        {
          _id: 'fallback-p3',
          title: 'Innovation Lab Setup',
          category: 'IoT & Smart Devices',
          size: 'medium',
          coverPath: 'images/gallery/IMG20220215101303.jpg',
          coverType: 'image',
          media: [
            { title: 'Node-RED Dashboard Configuration', path: 'images/gallery/IMG20220215101303.jpg', type: 'image', date: 'Feb 15, 2022' },
            { title: 'Smart Lighting Demo', path: 'images/gallery/VID-20220518-WA0011.mp4', type: 'video', date: 'May 18, 2022' }
          ]
        },
        {
          _id: 'fallback-p4',
          title: 'Smart Home Project',
          category: 'IoT & Smart Devices',
          size: 'small',
          coverPath: 'images/gallery/IMG20220519195647.jpg',
          coverType: 'image',
          media: [
            { title: 'Smart Irrigation System Prep', path: 'images/gallery/IMG20220519195647.jpg', type: 'image', date: 'May 19, 2022' }
          ]
        },
        {
          _id: 'fallback-p5',
          title: 'Competition Day',
          category: 'Competitions',
          size: 'medium',
          coverPath: 'images/gallery/IMG20220217204604.jpg',
          coverType: 'image',
          media: [
            { title: 'Winning Team Group Photo', path: 'images/gallery/IMG20220217204604.jpg', type: 'image', date: 'Feb 17, 2022' },
            { title: 'National STEM Competition Day', path: 'images/gallery/IMG20220526150634.jpg', type: 'image', date: 'May 26, 2022' }
          ]
        }
      ];
      galleryItems = fallbackProjects;
    }

    filteredItems = [...galleryItems];
    renderGrid();
    setupFilters();
  }

  // Render bento grid items
  function renderGrid() {
    grid.innerHTML = '';
    
    if (galleryItems.length === 0) {
      grid.innerHTML = '<div style="grid-column: span 12; text-align: center; padding: 40px; color: var(--text-dim);">No projects available.</div>';
      return;
    }

    galleryItems.forEach((project, index) => {
      const el = document.createElement('article');
      const isVideoCover = project.coverType === 'video';
      
      el.className = `gallery-bento-item size-${project.size || 'medium'} ${isVideoCover ? 'is-video' : ''} reveal`;
      el.dataset.id = project._id;

      // Badges content
      const badgeCategoryText = `${isVideoCover ? '📹' : '📷'} ${project.category}`;
      const badgeCountText = `📁 ${project.media.length} files`;

      let mediaHtml = '';
      if (isVideoCover) {
        // Use #t=0.5 to extract and show the video frame at 0.5s as poster, preload metadata for efficiency
        mediaHtml = `<video src="${project.coverPath}#t=0.5" preload="metadata" muted playsinline></video>`;
      } else {
        mediaHtml = `<img src="${project.coverPath}" alt="${project.title}" loading="lazy" onerror="this.style.display='none'"/>`;
      }

      el.innerHTML = `
        ${mediaHtml}
        <span class="gallery-card-badge">${badgeCategoryText}</span>
        <span class="gallery-card-count-badge">${badgeCountText}</span>
        <div class="overlay"><span class="overlay-icon">${isVideoCover ? '▶' : '🔍'}</span></div>`;

      el.addEventListener('click', () => {
        // Find index in filtered items
        const activeIdx = filteredItems.findIndex(f => f._id === project._id);
        if (activeIdx !== -1) {
          openLightbox(activeIdx);
        }
      });

      grid.appendChild(el);
    });

    // Staggered reveal effect
    setTimeout(() => {
      const reveals = grid.querySelectorAll('.reveal');
      reveals.forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 50);
      });
      // Alert core UI to run scroll reveal observer on new items
      document.dispatchEvent(new CustomEvent('pmthub:rendered'));
    }, 100);

    // Sync visibility with current filters
    updateFilterVisibility();
  }

  // Setup category and format filter tabs
  function setupFilters() {
    if (!filterGroup) return;

    filterGroup.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        filterGroup.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const filterVal = tab.dataset.filter;
        
        // Filter elements logically
        if (filterVal === 'all') {
          filteredItems = [...galleryItems];
        } else if (filterVal === 'video') {
          // Projects where cover is video or contains videos
          filteredItems = galleryItems.filter(p => p.coverType === 'video' || p.media.some(m => m.type === 'video'));
        } else if (filterVal === 'image') {
          // Projects where cover is image or contains images
          filteredItems = galleryItems.filter(p => p.coverType === 'image' || p.media.some(m => m.type === 'image'));
        } else {
          // Filter by project category
          filteredItems = galleryItems.filter(p => p.category === filterVal);
        }

        updateFilterVisibility();
      });
    });
  }

  // Update card visibility in UI with transitions
  function updateFilterVisibility() {
    const cards = grid.querySelectorAll('.gallery-bento-item');
    cards.forEach(card => {
      const itemId = card.dataset.id;
      const isVisible = filteredItems.some(project => project._id === itemId);
      
      if (isVisible) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // Lightbox functionality
  function openLightbox(projectIdx) {
    activeProject = filteredItems[projectIdx];
    activeMediaIndex = 0;
    renderLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    // Clear content to stop any playing videos
    mainEl.innerHTML = '';
    thumbsEl.innerHTML = '';
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderLightboxContent() {
    if (!activeProject || !activeProject.media || activeProject.media.length === 0) return;
    
    const item = activeProject.media[activeMediaIndex];
    
    // Clear main content
    mainEl.innerHTML = '';

    if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.path;
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      mainEl.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = item.path;
      img.alt = activeProject.title;
      img.onerror = () => {
        img.outerHTML = `<div style="padding: 40px; color: var(--blue); text-align: center;">Error loading image file</div>`;
      };
      mainEl.appendChild(img);
    }

    // Render thumbnail strip
    thumbsEl.innerHTML = activeProject.media.map((m, i) => {
      const isAct = i === activeMediaIndex ? 'active' : '';
      if (m.type === 'video') {
        // Thumbnail for video with play indicator and preloaded cover frame
        return `
          <button type="button" data-i="${i}" class="${isAct}" style="position:relative;">
            <span style="position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);font-size:12px;color:#fff;">▶</span>
            <video src="${m.path}#t=0.5" preload="metadata" muted playsinline style="width:100%;height:100%;object-fit:cover;opacity:0.6;pointer-events:none;"></video>
          </button>`;
      } else {
        return `
          <button type="button" data-i="${i}" class="${isAct}">
            <img src="${m.path}" alt="" style="width:100%;height:100%;object-fit:cover;pointer-events:none;"/>
          </button>`;
      }
    }).join('');

    // Attach click events to thumbnails
    thumbsEl.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        activeMediaIndex = parseInt(btn.dataset.i, 10);
        renderLightboxContent();
      });
    });

    // Toggle navigation buttons
    prevBtn.style.display = activeProject.media.length > 1 ? 'block' : 'none';
    nextBtn.style.display = activeProject.media.length > 1 ? 'block' : 'none';
  }

  function showNext() {
    if (!activeProject || activeProject.media.length <= 1) return;
    activeMediaIndex = (activeMediaIndex + 1) % activeProject.media.length;
    renderLightboxContent();
  }

  function showPrev() {
    if (!activeProject || activeProject.media.length <= 1) return;
    activeMediaIndex = (activeMediaIndex - 1 + activeProject.media.length) % activeProject.media.length;
    renderLightboxContent();
  }

  // Event Listeners for Lightbox
  lightbox.querySelector('.project-lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === mainEl) {
      closeLightbox();
    }
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Run on start
  initGallery();

})();
