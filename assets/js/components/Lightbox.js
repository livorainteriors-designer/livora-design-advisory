/**
 * Livora Interiors - Lightbox Modal Component
 */

export class Lightbox {
  constructor() {
    this.items = [];
    this.currentIndex = 0;
    this.modal = null;
    this.createModal();
    this.bindGlobalEvents();
  }

  createModal() {
    let existing = document.querySelector('.lightbox-modal');
    if (existing) {
      this.modal = existing;
      return;
    }

    this.modal = document.createElement('div');
    this.modal.className = 'lightbox-modal';
    this.modal.innerHTML = `
      <div class="lightbox-header">
        <div class="lightbox-counter" id="lightbox-counter">1 / 1</div>
        <button class="lightbox-close" id="lightbox-close" aria-label="Close Lightbox">✕</button>
      </div>
      <div class="lightbox-content">
        <button class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Previous image">‹</button>
        <div class="lightbox-img-wrapper" id="lightbox-media-container"></div>
        <button class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Next image">›</button>
      </div>
      <div class="lightbox-footer" id="lightbox-caption"></div>
    `;

    document.body.appendChild(this.modal);

    this.closeBtn = this.modal.querySelector('#lightbox-close');
    this.prevBtn = this.modal.querySelector('#lightbox-prev');
    this.nextBtn = this.modal.querySelector('#lightbox-next');
    this.mediaContainer = this.modal.querySelector('#lightbox-media-container');
    this.counter = this.modal.querySelector('#lightbox-counter');
    this.caption = this.modal.querySelector('#lightbox-caption');

    this.closeBtn.addEventListener('click', () => this.close());
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal || e.target.classList.contains('lightbox-content')) {
        this.close();
      }
    });
  }

  bindGlobalEvents() {
    window.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  open(items, startIndex = 0) {
    if (!items || items.length === 0) return;
    this.items = items;
    this.currentIndex = startIndex;
    this.renderCurrent();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    // Pause any playing videos
    const video = this.mediaContainer.querySelector('video');
    if (video) video.pause();
  }

  next() {
    if (this.items.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.renderCurrent();
  }

  prev() {
    if (this.items.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.renderCurrent();
  }

  renderCurrent() {
    const item = this.items[this.currentIndex];
    this.counter.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
    this.caption.textContent = item.title || item.caption || 'Livora Interiors Architectural Design';

    if (item.type === 'video' || (typeof item === 'string' && item.endsWith('.mp4')) || item.video) {
      const src = item.video || (typeof item === 'string' ? item : item.src);
      this.mediaContainer.innerHTML = `
        <video src="${src}" controls autoplay loop style="max-height: 75vh; border-radius: var(--radius-sm);"></video>
      `;
    } else {
      const src = typeof item === 'string' ? item : (item.image || item.src);
      this.mediaContainer.innerHTML = `
        <img src="${src}" alt="${item.title || 'Portfolio Image'}" class="animate-fade-in" />
      `;
    }
  }
}
