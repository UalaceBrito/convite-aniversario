export function initServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (!import.meta.env?.PROD && location.hostname === 'localhost') return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('[SW] Falha ao registrar:', err);
    });
  });
}
