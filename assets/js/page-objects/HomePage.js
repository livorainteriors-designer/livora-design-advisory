/**
 * Livora Interiors - Home Page Object Controller (POM)
 * Completely dynamic data-driven rendering with luxury work samples carousel.
 */

import { projectsData } from '../data/projectsData.js';
import { reviewsData } from '../data/reviewsData.js';
import { companyData } from '../data/companyData.js';
import { Lightbox } from '../components/Lightbox.js';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider.js';
import { WorkCarousel } from '../components/WorkCarousel.js';

export class HomePage {
  constructor() {
    this.lightbox = new Lightbox();
    this.init();
  }

  init() {
    this.initWorkCarousel();
    this.renderDynamicHero();
    this.renderFeaturedProjects();
    this.renderTestimonials();
    this.initBeforeAfter();
    this.bindVideoModal();
  }

  initWorkCarousel() {
    const carouselContainer = '#work-samples-carousel-container';
    // Select top 6 high-impact architectural work samples
    const curatedWorkSamples = projectsData.slice(0, 6);
    this.workCarousel = new WorkCarousel(carouselContainer, curatedWorkSamples, this.lightbox);
  }

  renderDynamicHero() {
    // Dynamic Stats Ribbon
    const statsContainer = document.querySelector('#home-stats-grid');
    if (statsContainer) {
      statsContainer.innerHTML = companyData.stats.map(s => `
        <div class="stat-item">
          <h3>${s.value}</h3>
          <p>${s.label}</p>
        </div>
      `).join('');
    }
  }

  renderFeaturedProjects() {
    const container = document.querySelector('#featured-projects-grid');
    if (!container) return;

    const featured = projectsData.filter(p => p.featured).slice(0, 6);

    container.innerHTML = featured.map((item, idx) => `
      <article class="project-card animate-slide-up" data-project-id="${item.id}" data-index="${idx}">
        <div class="project-card-image">
          <span class="project-card-badge">${item.categoryLabel}</span>
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="project-card-body">
          <div>
            <h3 class="project-card-title">${item.title}</h3>
            <p class="project-card-desc">${item.description}</p>
          </div>
          <div class="project-card-footer">
            <span>${item.location} • ${item.year}</span>
            <span class="project-view-btn">
              View Space
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </article>
    `).join('');

    // Bind Lightbox on card click
    container.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        const proj = projectsData.find(p => p.id === id);
        if (proj) {
          const items = proj.gallery ? proj.gallery.map(img => ({
            image: img,
            title: `${proj.title} • ${proj.categoryLabel}`,
            video: proj.video
          })) : [{ image: proj.image, title: proj.title, video: proj.video }];
          this.lightbox.open(items, 0);
        }
      });
    });
  }

  renderTestimonials() {
    const container = document.querySelector('#testimonials-grid');
    if (!container) return;

    container.innerHTML = reviewsData.slice(0, 3).map(rev => `
      <div class="value-box animate-slide-up">
        <div style="display: flex; gap: 0.25rem; color: var(--color-accent-gold); margin-bottom: 0.75rem;">
          ${'★'.repeat(rev.rating)}
        </div>
        <p style="font-size: 0.95rem; font-style: italic; line-height: 1.65; color: var(--color-text-secondary); margin-bottom: 1.25rem;">
          "${rev.quote}"
        </p>
        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 0.2rem;">${rev.client}</h4>
          <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.08em;">${rev.type}</span>
        </div>
      </div>
    `).join('');
  }

  initBeforeAfter() {
    new BeforeAfterSlider('#home-before-after');
  }

  bindVideoModal() {
    const playBtn = document.querySelector('#hero-play-reel-btn');
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.lightbox.open([
          { type: 'video', video: 'assets/videos/1.mp4', title: 'Livora Interiors - Architectural 3D Walkthrough Reel 01' },
          { type: 'video', video: 'assets/videos/2nd.mp4', title: 'Livora Interiors - Architectural 3D Walkthrough Reel 02' },
          { type: 'video', video: 'assets/videos/my cab.mp4', title: 'Livora Interiors - Executive Director Cabin Walkthrough' }
        ], 0);
      });
    }
  }
}
