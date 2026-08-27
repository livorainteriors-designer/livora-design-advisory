/**
 * Livora Interiors - About Page Object Controller (POM)
 */

import { companyData } from '../data/companyData.js';

export class AboutPage {
  constructor() {
    this.init();
  }

  init() {
    this.populateStats();
  }

  populateStats() {
    const container = document.querySelector('#about-stats-container');
    if (!container) return;

    container.innerHTML = companyData.stats.map(s => `
      <div class="stat-item">
        <h3>${s.value}</h3>
        <p>${s.label}</p>
      </div>
    `).join('');
  }
}
