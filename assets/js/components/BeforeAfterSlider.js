/**
 * Livora Interiors - Before & After Comparison Slider
 */

export class BeforeAfterSlider {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.beforeWrapper = this.container.querySelector('.before-image-wrapper');
    this.handle = this.container.querySelector('.slider-handle');
    this.isDragging = false;

    this.init();
  }

  init() {
    if (!this.beforeWrapper || !this.handle) return;

    const onStart = (e) => {
      this.isDragging = true;
      this.updatePosition(e);
    };

    const onMove = (e) => {
      if (!this.isDragging) return;
      this.updatePosition(e);
    };

    const onEnd = () => {
      this.isDragging = false;
    };

    this.container.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    this.container.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
  }

  updatePosition(e) {
    const rect = this.container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let offsetX = clientX - rect.left;

    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    this.beforeWrapper.style.width = `${percentage}%`;
    this.handle.style.left = `${percentage}%`;
  }
}
