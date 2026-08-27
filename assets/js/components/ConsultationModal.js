/**
 * Livora Interiors - Consultation & Freelance Advisory Booking Modal
 */

import { companyData } from '../data/companyData.js';
import { ToastNotification } from './ToastNotification.js';

export class ConsultationModal {
  constructor() {
    this.modal = null;
    this.createModal();
    this.bindTriggers();
  }

  createModal() {
    let existing = document.querySelector('#consultation-modal');
    if (existing) {
      this.modal = existing;
      return;
    }

    this.modal = document.createElement('div');
    this.modal.id = 'consultation-modal';
    this.modal.className = 'modal-backdrop';
    this.modal.innerHTML = `
      <div class="modal-box">
        <button class="modal-close" id="close-consultation-modal" aria-label="Close Modal">✕</button>
        <span class="subheading-editorial">Begin Your Journey</span>
        <h2 style="font-size: 1.85rem; margin-bottom: 0.5rem;">Book a Design Consultation</h2>
        <p style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 1.75rem;">
          Connect directly with <strong>Bindhu</strong> for freelance interior architecture, 3D visualization, or strategic spatial advisory.
        </p>

        <form id="consultation-form">
          <div class="form-row-2">
            <div class="form-group">
              <label class="form-label" for="modal-client-name">Your Full Name *</label>
              <input type="text" id="modal-client-name" class="form-input" placeholder="e.g. Sarah Jenkins" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="modal-client-phone">Phone / WhatsApp *</label>
              <input type="tel" id="modal-client-phone" class="form-input" placeholder="e.g. +91 98765 43210" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="modal-client-email">Email Address *</label>
            <input type="email" id="modal-client-email" class="form-input" placeholder="e.g. sarah@example.com" required />
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label class="form-label" for="modal-service-type">Service Required *</label>
              <select id="modal-service-type" class="form-select" required>
                <option value="Freelance Design Advisory">Freelance Design Advisory & Consultation</option>
                <option value="3D Architectural Visualization">3D Photorealistic Architectural Visualization</option>
                <option value="Full Residential Interior">Full-Scope Residential Interiors</option>
                <option value="Executive Cabin / Office">Executive Cabin & Commercial Workspace</option>
                <option value="Bespoke Wardrobe & Millwork">Bespoke Wardrobes & Custom Millwork</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="modal-project-timeline">Target Timeline</label>
              <select id="modal-project-timeline" class="form-select">
                <option value="Immediately (Within 2 weeks)">Immediately (Within 2 weeks)</option>
                <option value="1 - 2 Months">1 - 2 Months</option>
                <option value="3 - 6 Months">3 - 6 Months</option>
                <option value="Planning / Exploratory">Planning / Exploratory</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="modal-project-notes">Project Details & Space Dimensions</label>
            <textarea id="modal-project-notes" class="form-textarea" rows="3" placeholder="Tell Bindhu about your home/space, square footage, design style, or specific requirements..."></textarea>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
            <button type="submit" class="btn btn-gold" style="flex: 1;">
              <span>Send Inquiry via Email</span>
            </button>
            <button type="button" id="modal-whatsapp-btn" class="btn btn-primary" style="flex: 1; background-color: #25D366; border-color: #25D366; color: #FFFFFF;">
              <span>💬 Direct WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(this.modal);

    this.closeBtn = this.modal.querySelector('#close-consultation-modal');
    this.closeBtn.addEventListener('click', () => this.close());
    
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    const form = this.modal.querySelector('#consultation-form');
    form.addEventListener('submit', (e) => this.handleEmailSubmit(e));

    const waBtn = this.modal.querySelector('#modal-whatsapp-btn');
    waBtn.addEventListener('click', () => this.handleWhatsAppDirect());
  }

  bindTriggers() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-open-modal="consultation"]');
      if (target) {
        e.preventDefault();
        this.open();
      }
    });
  }

  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  getFormData() {
    return {
      name: document.querySelector('#modal-client-name')?.value.trim() || 'Client',
      phone: document.querySelector('#modal-client-phone')?.value.trim() || '',
      email: document.querySelector('#modal-client-email')?.value.trim() || '',
      service: document.querySelector('#modal-service-type')?.value || 'Freelance Design Advisory',
      timeline: document.querySelector('#modal-project-timeline')?.value || '1 - 2 Months',
      notes: document.querySelector('#modal-project-notes')?.value.trim() || 'No specific notes added.'
    };
  }

  handleWhatsAppDirect() {
    const data = this.getFormData();
    const formattedMsg = `*New Interior Inquiry - Livora Interiors*\n\n` +
      `👤 *Name:* ${data.name}\n` +
      `📞 *Phone:* ${data.phone || 'Provided via chat'}\n` +
      `✉️ *Email:* ${data.email || 'Provided via chat'}\n` +
      `🏛️ *Service:* ${data.service}\n` +
      `⏱️ *Timeline:* ${data.timeline}\n` +
      `📝 *Notes:* ${data.notes}\n\n` +
      `_Connecting with Bindhu for Freelance Design & Advisory_`;

    const encoded = encodeURIComponent(formattedMsg);
    const waUrl = `https://api.whatsapp.com/send?phone=${companyData.contact.whatsappNumber.replace(/[^0-9]/g, '')}&text=${encoded}`;
    
    window.open(waUrl, '_blank');
    ToastNotification.show("Opening direct WhatsApp chat with Bindhu...");
    this.close();
  }

  handleEmailSubmit(e) {
    e.preventDefault();
    const data = this.getFormData();
    
    // Construct mailto link
    const subject = encodeURIComponent(`Livora Interiors Project Inquiry from ${data.name}`);
    const body = encodeURIComponent(
      `Hello Bindhu,\n\nI would like to consult with you for interior design / freelance advisory.\n\n` +
      `Name: ${data.name}\n` +
      `Phone: ${data.phone}\n` +
      `Email: ${data.email}\n` +
      `Service: ${data.service}\n` +
      `Timeline: ${data.timeline}\n\n` +
      `Project Details:\n${data.notes}\n\n` +
      `Best regards,\n${data.name}`
    );

    window.location.href = `mailto:${companyData.contact.email}?subject=${subject}&body=${body}`;
    ToastNotification.show("Inquiry generated! Opening your mail client...");
    this.close();
  }
}
