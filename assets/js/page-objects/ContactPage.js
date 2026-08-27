/**
 * Livora Interiors - Contact Page Object Controller (POM)
 */

import { companyData } from '../data/companyData.js';
import { ToastNotification } from '../components/ToastNotification.js';

export class ContactPage {
  constructor() {
    this.init();
  }

  init() {
    this.bindForm();
    this.bindWhatsAppButtons();
  }

  bindForm() {
    const form = document.querySelector('#main-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.querySelector('#contact-name')?.value.trim();
      const email = document.querySelector('#contact-email')?.value.trim();
      const phone = document.querySelector('#contact-phone')?.value.trim();
      const service = document.querySelector('#contact-service')?.value;
      const budget = document.querySelector('#contact-budget')?.value;
      const message = document.querySelector('#contact-message')?.value.trim();

      const subject = encodeURIComponent(`Livora Interiors Project Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Hello Bindhu,\n\nI would like to discuss a project / freelance design advisory with Livora Interiors.\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Selected Service: ${service}\n` +
        `Budget Range: ${budget}\n\n` +
        `Project Notes:\n${message}\n\n` +
        `Best regards,\n${name}`
      );

      window.location.href = `mailto:${companyData.contact.email}?subject=${subject}&body=${body}`;
      ToastNotification.show("Inquiry generated! Opening your email client to send to Bindhu...");
    });
  }

  bindWhatsAppButtons() {
    const directBtn = document.querySelector('#contact-page-wa-btn');
    if (!directBtn) return;

    directBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = encodeURIComponent(
        `Hi Bindhu! I visited Livora Interiors and would like to inquire about your Freelance Interior Design & Advisory services.`
      );
      const url = `https://api.whatsapp.com/send?phone=${companyData.contact.whatsappNumber.replace(/[^0-9]/g, '')}&text=${msg}`;
      window.open(url, '_blank');
      ToastNotification.show("Connecting to Bindhu on WhatsApp...");
    });
  }
}
