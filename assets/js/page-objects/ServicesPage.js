/**
 * Livora Interiors - Services Page Object Controller (POM)
 */

import { servicesData, processSteps } from '../data/servicesData.js';

export class ServicesPage {
  constructor() {
    this.init();
  }

  init() {
    this.renderServices();
    this.renderProcessTimeline();
  }

  renderServices() {
    const container = document.querySelector('#services-cards-grid');
    if (!container) return;

    container.innerHTML = servicesData.map(svc => `
      <div class="service-card animate-slide-up">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
            <div class="service-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            ${svc.badge ? `<span class="badge-pill badge-gold">${svc.badge}</span>` : ''}
          </div>

          <h3 style="font-size: 1.5rem; margin-bottom: 0.4rem;">${svc.title}</h3>
          <span style="display: block; font-size: 0.85rem; color: var(--color-accent-gold); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 1rem;">
            ${svc.tagline}
          </span>
          <p style="font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.65; margin-bottom: 1.5rem;">
            ${svc.description}
          </p>

          <h4 style="font-family: var(--font-sans); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-text-primary); margin-bottom: 0.75rem;">
            Scope & Features Included:
          </h4>
          <ul class="service-feature-list">
            ${svc.features.map(f => `
              <li class="service-feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="padding-top: 1.5rem; border-top: 1px solid var(--color-border-subtle); display: flex; flex-direction: column; gap: 1rem;">
          <div style="font-size: 0.8rem; color: var(--color-text-muted);">
            <strong>Timeline:</strong> ${svc.timeline}<br/>
            <strong>Key Deliverables:</strong> ${svc.deliverables}
          </div>
          <button class="btn btn-secondary" data-open-modal="consultation" style="width: 100%;">
            <span>Inquire About This Service</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  renderProcessTimeline() {
    const container = document.querySelector('#process-timeline-container');
    if (!container) return;

    container.innerHTML = processSteps.map(step => `
      <div class="process-card animate-slide-up">
        <div class="process-step-num">${step.step}</div>
        <h3>${step.title}</h3>
        <p>${step.description}</p>
      </div>
    `).join('');
  }
}
