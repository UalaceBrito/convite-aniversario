import { initNavigation } from './modules/navigation.js';
import { initCountdown } from './modules/countdown.js';
import { initReveal } from './modules/reveal.js';
import { initFormValidation } from './modules/form-validation.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initYear } from './modules/year.js';
import { initServiceWorker } from './modules/service-worker.js';
import { initTheme } from './modules/theme.js';

const boot = () => {
  initNavigation();
  initCountdown();
  initReveal();
  initFormValidation();
  initSmoothScroll();
  initYear();
  initServiceWorker();
  initTheme();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
