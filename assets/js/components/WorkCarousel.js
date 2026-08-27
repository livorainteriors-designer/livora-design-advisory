/**
 * Livora Interiors - Luxury Work Samples Carousel Component
 * Smooth editorial multi-slide carousel with auto-play, touch swipe, and lightbox integration.
 */

export class WorkCarousel {
  constructor(containerSelector, items, lightboxInstance) {
    this.container = document.querySelector(containerSelector);
    this.items = items || [];
    this.lightbox = lightboxInstance;
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.isPaused = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    if (this.container && this.items.length > 0) {
      this.init();
    }
  }

  init() {
    this.render();
    this.bindEvents();
    this.startAutoPlay();
  }

  render() {
    this.container.innerHTML = `
      <div class="work-carousel-wrapper">
        <div class="work-carousel-track" id="carousel-track">
          ${this.items.map((item, idx) => `
            <div class="carousel-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
              <div class="carousel-slide-inner">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
                <div class="carousel-slide-overlay">
                  <span class="badge-pill badge-gold" style="background: rgba(250, 248, 245, 0.95);">${item.categoryLabel || 'Bespoke Space'}</span>
                  <h3 class="carousel-slide-title">${item.title}</h3>
                  <p class="carousel-slide-location">${item.location || 'Residential Design'} • ${item.year || '2024'}</p>
                  <button class="btn btn-gold btn-sm carousel-view-btn" data-index="${idx}">
                    <span>View in 4K</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <button class="carousel-nav-btn carousel-prev" id="carousel-prev-btn" aria-label="Previous Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button class="carousel-nav-btn carousel-next" id="carousel-next-btn" aria-label="Next Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div class="carousel-indicators" id="carousel-indicators">
          ${this.items.map((_, idx) => `
            <button class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Slide ${idx + 1}"></button>
          `).join('')}
        </div>
      </div>
    `;

    this.track = this.container.querySelector('#carousel-track');
    this.slides = this.container.querySelectorAll('.carousel-slide');
    this.dots = this.container.querySelectorAll('.carousel-dot');
  }

  bindEvents() {
    const prevBtn = this.container.querySelector('#carousel-prev-btn');
    const nextBtn = this.container.querySelector('#carousel-next-btn');

    prevBtn?.addEventListener('click', () => {
      this.prev();
      this.resetAutoPlay();
    });

    nextBtn?.addEventListener('click', () => {
      this.next();
      this.resetAutoPlay();
    });

    this.dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        this.goTo(idx);
        this.resetAutoPlay();
      });
    });

    // Lightbox on slide click or button click
    this.container.querySelectorAll('.carousel-slide').forEach(slide => {
      slide.addEventListener('click', (e) => {
        const idx = parseInt(slide.getAttribute('data-index'), 10);
        const item = this.items[idx];
        if (item && this.lightbox) {
          const gallery = item.gallery ? item.gallery.map(img => ({
            image: img,
            title: `${item.title} • ${item.categoryLabel || ''}`,
            video: item.video
          })) : [{ image: item.image, title: item.title, video: item.video }];
          this.lightbox.open(gallery, 0);
        }
      });
    });

    // Touch support for mobile swipe
    this.container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    }, { passive: true });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => { this.isPaused = true; });
    this.container.addEventListener('mouseleave', () => { this.isPaused = false; });
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
      this.resetAutoPlay();
    }
  }

  goTo(index) {
    if (index < 0) index = this.items.length - 1;
    if (index >= this.items.length) index = 0;

    this.currentIndex = index;
    this.updateClasses();
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  updateClasses() {
    this.slides.forEach((slide, idx) => {
      if (idx === this.currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    this.dots.forEach((dot, idx) => {
      if (idx === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Offset track
    const offset = -this.currentIndex * 100;
    if (this.track) {
      this.track.style.transform = `translateX(${offset}%)`;
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, 4500);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
}
