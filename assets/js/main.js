/**
 * Livora Interiors - Main Entry Point
 */

import { App } from './core/App.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.bootstrap();
});
