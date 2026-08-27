/**
 * Livora Interiors - Navbar Component
 */

export class Navbar {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.mobileToggle = document.querySelector('.mobile-toggle');
    this.mobileDrawer = document.querySelector('.mobile-nav-drawer');
    this.drawerOverlay = document.querySelector('.drawer-overlay');
    this.drawerClose = document.querySelector('.drawer-close');
    this.navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    this.init();
  }

  init() {
    this.bindScroll();
    this.bindMobileMenu();
    this.highlightActiveLink();
  }

  bindScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        this.header?.classList.add('scrolled');
      } else {
        this.header?.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  bindMobileMenu() {
    this.mobileToggle?.addEventListener('click', () => this.openMenu());
    this.drawerClose?.addEventListener('click', () => this.closeMenu());
    this.drawerOverlay?.addEventListener('click', () => this.closeMenu());
    
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  openMenu() {
    this.mobileDrawer?.classList.add('open');
    this.drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.mobileDrawer?.classList.remove('open');
    this.drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  highlightActiveLink() {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const cleanHref = href ? href.replace('.html', '') : '';
      const cleanPath = currentPath.replace('.html', '');

      if (
        href === currentPath ||
        cleanHref === cleanPath ||
        (cleanHref === 'index' && (cleanPath === '' || cleanPath === 'index' || cleanPath === 'home'))
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
