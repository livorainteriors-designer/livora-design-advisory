/**
 * Livora Interiors - Core Application Controller
 * Coordinates Page Object Model instances and global components
 */

import { Navbar } from '../components/Navbar.js';
import { ConsultationModal } from '../components/ConsultationModal.js';
import { HomePage } from '../page-objects/HomePage.js';
import { PortfolioPage } from '../page-objects/PortfolioPage.js';
import { ServicesPage } from '../page-objects/ServicesPage.js';
import { AboutPage } from '../page-objects/AboutPage.js';
import { ContactPage } from '../page-objects/ContactPage.js';

export class App {
  constructor() {
    this.pageControllers = {
      home: HomePage,
      portfolio: PortfolioPage,
      services: ServicesPage,
      about: AboutPage,
      contact: ContactPage
    };
  }

  bootstrap() {
    // 1. Initialize Shared Global Components
    this.navbar = new Navbar();
    this.consultationModal = new ConsultationModal();

    // 2. Initialize Page-Specific Controller (POM)
    const pageId = document.body.getAttribute('data-page');
    if (pageId && this.pageControllers[pageId]) {
      const ControllerClass = this.pageControllers[pageId];
      this.currentPage = new ControllerClass();
    }

    // 3. Dynamic Footer Year & Global Utility
    const yearEl = document.querySelector('#current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    this.bindGlobalAdvisorTriggers();
  }

  bindGlobalAdvisorTriggers() {
    document.querySelectorAll('[data-action="open-advisor"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.consultationModal.open();
      });
    });
  }
}
