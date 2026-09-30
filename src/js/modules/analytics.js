const noop = () => {};

export function track(event, payload = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.plausible === 'function') {
    window.plausible(event, { props: payload });
    return;
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
    return;
  }
  noop();
}
