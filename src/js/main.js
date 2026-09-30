import { initNavigation } from './modules/navigation.js';
import { initCountdown } from './modules/countdown.js';
import { initReveal } from './modules/reveal.js';
import { initFormValidation } from './modules/form-validation.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initYear } from './modules/year.js';
import { initServiceWorker } from './modules/service-worker.js';
import { initTheme } from './modules/theme.js';
import { initEventData } from './modules/event-data.js';

const boot = () => {
  initNavigation();
  initReveal();
  initFormValidation();
  initSmoothScroll();
  initYear();
  initServiceWorker();
  initTheme();
  initEventData().then(() => initCountdown());
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
