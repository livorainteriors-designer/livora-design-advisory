/**
 * Livora Interiors - Portfolio Page Object Controller (POM)
 */

import { projectsData, projectCategories } from '../data/projectsData.js';
import { Lightbox } from '../components/Lightbox.js';

export class PortfolioPage {
  constructor() {
    this.lightbox = new Lightbox();
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.init();
  }

  init() {
    this.renderCategoryFilters();
    this.renderProjects();
    this.bindSearch();
  }

  renderCategoryFilters() {
    const container = document.querySelector('#portfolio-filter-container');
    if (!container) return;

    container.innerHTML = projectCategories.map(cat => `
      <button class="filter-btn ${cat.id === this.currentCategory ? 'active' : ''}" data-category="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.getAttribute('data-category');
        this.renderProjects();
      });
    });
  }

  bindSearch() {
    const searchInput = document.querySelector('#portfolio-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderProjects();
    });
  }

  renderProjects() {
    const grid = document.querySelector('#portfolio-grid');
    if (!grid) return;

    let filtered = projectsData;

    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.currentCategory);
    }

    if (this.searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery) ||
        p.categoryLabel.toLowerCase().includes(this.searchQuery)
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No projects found</h3>
          <p style="color: var(--color-text-muted);">Try adjusting your category filter or search terms.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <article class="project-card animate-slide-up" data-project-id="${item.id}">
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
              ${item.video ? 'Watch Walkthrough' : 'View Gallery'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </article>
    `).join('');

    // Bind Lightbox
    grid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        const proj = projectsData.find(p => p.id === id);
        if (proj) {
          const items = [];
          if (proj.video) {
            items.push({ type: 'video', video: proj.video, title: `${proj.title} (3D Walkthrough Reel)` });
          }
          if (proj.secondaryVideo) {
            items.push({ type: 'video', video: proj.secondaryVideo, title: `${proj.title} (Secondary Walkthrough)` });
          }
          if (proj.gallery && proj.gallery.length > 0) {
            proj.gallery.forEach(img => {
              items.push({ image: img, title: `${proj.title} • ${proj.categoryLabel}` });
            });
          } else {
            items.push({ image: proj.image, title: proj.title });
          }
          this.lightbox.open(items, 0);
        }
      });
    });
  }
}
