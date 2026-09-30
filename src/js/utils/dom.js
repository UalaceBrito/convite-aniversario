export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export function on(target, event, handler, options) {
  target.addEventListener(event, handler, options);
  return () => target.removeEventListener(event, handler, options);
}

export function toggleClass(el, className, force) {
  if (!el) return;
  if (typeof force === 'boolean') {
    el.classList.toggle(className, force);
  } else {
    el.classList.toggle(className);
  }
}
