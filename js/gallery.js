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
          title: 'EMBEDDED IoT',
          category: 'EMBEDDED IoT',
          size: 'large',
          coverPath: 'images/gallery/IMG20211223150621.jpg',
          coverType: 'image',
          media: [
            { title: 'Robotics Arm Mechanism Design', path: 'images/gallery/IMG20211223150621.jpg', type: 'image', date: 'Dec 23, 2021' },
            { title: 'Smart Home Automation Demo', path: 'images/gallery/IMG20220217112105.jpg', type: 'image', date: 'Feb 17, 2022' },
            { title: 'Node-RED Dashboard Configuration', path: 'images/gallery/IMG20220806133859.jpg', type: 'image', date: 'Aug 6, 2022' },
            { title: 'Soldering Resistors on Custom PCB', path: 'images/gallery/IMG20220216091538.jpg', type: 'image', date: 'Feb 16, 2022' },
            { title: 'PCB Layout Component Alignment', path: 'images/gallery/IMG20221220175240.jpg', type: 'image', date: 'Dec 20, 2022' },
            { title: 'Robotics Workshop Team Assembly', path: 'images/gallery/IMG20230706161523.jpg', type: 'image', date: 'Jul 6, 2023' }
          ]
        },
        {
          _id: 'fallback-p_college',
          title: 'COLLEGE PROJECTS',
          category: 'COLLEGE PROJECTS',
          size: 'wide',
          coverPath: 'images/gallery/IMG20220525213755.jpg',
          coverType: 'image',
          media: [
            { title: 'Autonomous Obstacle Avoidance Bot', path: 'images/gallery/IMG20220525213755.jpg', type: 'image', date: 'May 25, 2022' },
            { title: 'Line Follower Robot Calibration', path: 'images/gallery/IMG20221125172021.jpg', type: 'image', date: 'Nov 25, 2022' },
            { title: 'Robotics Workshop Team Assembly', path: 'images/gallery/IMG20230514190305.jpg', type: 'image', date: 'May 14, 2023' },
            { title: 'Robot Arm Programming Session', path: 'images/gallery/IMG_20230612_131717.jpg', type: 'image', date: 'Jun 12, 2023' },
            { title: 'Arduino LED Matrix Display Code', path: 'images/gallery/IMG20220526150634.jpg', type: 'image', date: 'May 26, 2022' },
            { title: 'Multi-sensor Shield Debugging', path: 'images/gallery/IMG20221125172028.jpg', type: 'image', date: 'Nov 25, 2022' },
            { title: 'Servo Motor Angle Control', path: 'images/gallery/VID-20220518-WA0000.mp4', type: 'video', date: 'May 18, 2022' },
            { title: 'Node-RED Dashboard Configuration', path: 'images/gallery/IMG20220601224927.jpg', type: 'image', date: 'Jun 1, 2022' },
            { title: 'ESP32 WiFi Web Server Lab', path: 'images/gallery/IMG20230224184202.jpg', type: 'image', date: 'Feb 24, 2023' },
            { title: 'Smart Irrigation System Prep', path: 'images/gallery/VID-20220526-WA0020.mp4', type: 'video', date: 'May 26, 2022' },
            { title: 'ESP32 WiFi Web Server Lab', path: 'images/gallery/IMG20230224221958.jpg', type: 'image', date: 'Feb 24, 2023' },
            { title: 'MQTT Broker Communication Test', path: 'images/gallery/IMG20231102155050.jpg', type: 'image', date: 'Nov 2, 2023' },
            { title: 'Smart Irrigation System Prep', path: 'images/gallery/VID-20220610-WA0008.mp4', type: 'video', date: 'Jun 10, 2022' },
            { title: 'Circuit Continuity Multi-meter Test', path: 'images/gallery/IMG20220531155324.jpg', type: 'image', date: 'May 31, 2022' },
            { title: 'Soldering Practice & Iron Safety', path: 'images/gallery/IMG20230611153327.jpg', type: 'image', date: 'Jun 11, 2023' },
            { title: 'Desoldering & Troubleshooting PCBs', path: 'images/gallery/VID-20220518-WA0011.mp4', type: 'video', date: 'May 18, 2022' },
            { title: 'SMD Soldering Demonstration', path: 'images/gallery/VID_20211021193833.mp4', type: 'video', date: 'Oct 21, 2021' },
            { title: 'Robotics Arm Mechanism Design', path: 'images/gallery/IMG20220519195647.jpg', type: 'image', date: 'May 19, 2022' },
            { title: 'Autonomous Obstacle Avoidance Bot', path: 'images/gallery/IMG20221016000723.jpg', type: 'image', date: 'Oct 16, 2022' },
            { title: 'Line Follower Robot Calibration', path: 'images/gallery/IMG20230317214654.jpg', type: 'image', date: 'Mar 17, 2023' },
            { title: 'Robot Arm Programming Session', path: 'images/gallery/VID20220607124714.mp4', type: 'video', date: 'Jun 7, 2022' },
            { title: 'Innovation Lab Project Exhibition', path: 'images/gallery/IMG20220510201314.jpg', type: 'image', date: 'May 10, 2022' },
            { title: 'National STEM Competition Day', path: 'images/gallery/IMG20220810094335.jpg', type: 'image', date: 'Aug 10, 2022' },
            { title: 'Robot Racing Arena Trials', path: 'images/gallery/IMG20230225145228.jpg', type: 'image', date: 'Feb 25, 2023' },
            { title: 'Arduino Project Presentation', path: 'images/gallery/IMG20230706142821.jpg', type: 'image', date: 'Jul 6, 2023' },
            { title: 'Annual Tech Fest Showcase', path: 'images/gallery/VID-20220610-WA0013.mp4', type: 'video', date: 'Jun 10, 2022' },
            { title: 'Ultrasonic Sensor Wiring & Testing', path: 'images/gallery/IMG20220525201247.jpg', type: 'image', date: 'May 25, 2022' },
            { title: 'Arduino LED Matrix Display Code', path: 'images/gallery/IMG20221016000735.jpg', type: 'image', date: 'Oct 16, 2022' },
            { title: 'Multi-sensor Shield Debugging', path: 'images/gallery/IMG20230514152701.jpg', type: 'image', date: 'May 14, 2023' },
            { title: 'LCD Display Interface Workshop', path: 'images/gallery/IMG20230821152603.jpg', type: 'image', date: 'Aug 21, 2023' },
            { title: 'Servo Motor Angle Control', path: 'images/gallery/VID20230224221850.mp4', type: 'video', date: 'Feb 24, 2023' }
          ]
        },
        {
          _id: 'fallback-p_industrial',
          title: 'INDUSTRIAL AUTOMATION',
          category: 'INDUSTRIAL AUTOMATION',
          size: 'tall',
          coverPath: 'images/gallery/IMG20230905172210.jpg',
          coverType: 'image',
          media: [
            { title: 'Gear Motor Transmission Testing', path: 'images/gallery/IMG20230905172210.jpg', type: 'image', date: 'Sep 5, 2023' },
            { title: 'Chassis Development & Assembly', path: 'images/gallery/IMG20231004105318.jpg', type: 'image', date: 'Oct 4, 2023' },
            { title: 'Analog Signal Read Calibration', path: 'images/gallery/IMG20230907180133.jpg', type: 'image', date: 'Sep 7, 2023' },
            { title: 'Breadboard Circuit Basics', path: 'images/gallery/IMG20231004105334.jpg', type: 'image', date: 'Oct 4, 2023' },
            { title: 'Smart Weather Station Prototype', path: 'images/gallery/IMG20230907180308.jpg', type: 'image', date: 'Sep 7, 2023' },
            { title: 'MQTT Broker Communication Test', path: 'images/gallery/IMG20231102155042.jpg', type: 'image', date: 'Nov 2, 2023' },
            { title: 'Smart Weather Station Prototype', path: 'images/gallery/IMG20230907180317.jpg', type: 'image', date: 'Sep 7, 2023' },
            { title: 'Completed PCB Assembly Inspection', path: 'images/gallery/IMG20230907180304.jpg', type: 'image', date: 'Sep 7, 2023' },
            { title: 'Through-Hole Soldering Technique', path: 'images/gallery/IMG20231102155031.jpg', type: 'image', date: 'Nov 2, 2023' },
            { title: 'Gear Motor Transmission Testing', path: 'images/gallery/IMG20230911173320.jpg', type: 'image', date: 'Sep 11, 2023' },
            { title: 'Chassis Development & Assembly', path: 'images/gallery/IMG20231110155250.jpg', type: 'image', date: 'Nov 10, 2023' },
            { title: 'Winning Team Group Photo', path: 'images/gallery/IMG20230907180326.jpg', type: 'image', date: 'Sep 7, 2023' },
            { title: 'STEM Project Design Defence', path: 'images/gallery/IMG20231106131808.jpg', type: 'image', date: 'Nov 6, 2023' },
            { title: 'Analog Signal Read Calibration', path: 'images/gallery/IMG20230918155548.jpg', type: 'image', date: 'Sep 18, 2023' },
            { title: 'Breadboard Circuit Basics', path: 'images/gallery/IMG20231204151832.jpg', type: 'image', date: 'Dec 4, 2023' }
          ]
        },
        {
          _id: 'fallback-p_home',
          title: 'HOME AUTOMATION',
          category: 'HOME AUTOMATION',
          size: 'medium',
          coverPath: 'images/gallery/IMG_20230612_131717.jpg',
          coverType: 'image',
          media: [
            { title: 'Robot Arm Programming Session', path: 'images/gallery/IMG_20230612_131717.jpg', type: 'image', date: 'Jun 12, 2023' },
            { title: 'LCD Display Interface Workshop', path: 'images/gallery/IMG20230611153014.jpg', type: 'image', date: 'Jun 11, 2023' },
            { title: 'SteriGuard Medical IoT Assembly', path: 'images/gallery/IMG20230706141406.jpg', type: 'image', date: 'Jul 6, 2023' },
            { title: 'Soldering Practice & Iron Safety', path: 'images/gallery/IMG20230611153327.jpg', type: 'image', date: 'Jun 11, 2023' }
          ]
        },
        {
          _id: 'fallback-p_robotics',
          title: 'ROBOTICS',
          category: 'ROBOTICS',
          size: 'small',
          coverPath: 'images/gallery/IMG20230612131543.jpg',
          coverType: 'image',
          media: [
            { title: 'SteriGuard Medical IoT Assembly', path: 'images/gallery/IMG20230612131543.jpg', type: 'image', date: 'Jun 12, 2023' }
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
