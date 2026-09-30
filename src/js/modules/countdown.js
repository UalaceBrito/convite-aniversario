import { SELECTORS } from '../config/constants.js';

const PAD = (n) => String(Math.max(0, n)).padStart(2, '0');

export function initCountdown() {
  const root = document.querySelector(SELECTORS.countdown);
  if (!root) return;

  const target = root.getAttribute('data-countdown');
  if (!target) return;

  const targetTime = new Date(target).getTime();
  if (Number.isNaN(targetTime)) return;

  const fields = {
    dias: root.querySelector('[data-unit="dias"]'),
    horas: root.querySelector('[data-unit="horas"]'),
    minutos: root.querySelector('[data-unit="minutos"]'),
    segundos: root.querySelector('[data-unit="segundos"]'),
  };

  const message = document.querySelector(SELECTORS.countdownMessage);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let intervalId = null;

  const tick = () => {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      if (message) message.hidden = false;
      root.hidden = true;
      if (intervalId) clearInterval(intervalId);
      return;
    }

    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    if (fields.dias) fields.dias.textContent = PAD(d);
    if (fields.horas) fields.horas.textContent = PAD(h);
    if (fields.minutos) fields.minutos.textContent = PAD(m);
    if (fields.segundos) fields.segundos.textContent = PAD(sec);
  };

  tick();
  intervalId = setInterval(tick, reduceMotion ? 1000 : 1000);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (intervalId) clearInterval(intervalId);
    } else {
      tick();
      intervalId = setInterval(tick, 1000);
    }
  });
}
