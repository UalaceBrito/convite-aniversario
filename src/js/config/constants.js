export const SELECTORS = Object.freeze({
  navToggle: '#navToggle',
  nav: '#primaryNav',
  countdown: '[data-countdown]',
  countdownMessage: '[data-countdown-message]',
  rsvpForm: '#rsvpForm',
  formSuccess: '#formSuccess',
  successName: '#successName',
});

export const EVENT = Object.freeze({
  date: '2027-08-15T19:00:00-03:00',
  endDate: '2027-08-16T00:00:00-03:00',
  rsvpDeadline: '2027-08-01T23:59:59-03:00',
  venue: 'Espaço Villa Jardim',
  address: 'Rua das Acácias, 123 — Jardim Primavera, São Paulo/SP',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+das+Ac%C3%A1cias+123+Jardim+Primavera+S%C3%A3o+Paulo',
});

export const BREAKPOINTS = Object.freeze({
  sm: 480,
  md: 720,
  lg: 1024,
  xl: 1280,
});

export const THEME_STORAGE_KEY = 'theme';
export const THEME_ATTRIBUTE = 'data-theme';
export const THEME_TOGGLE_SELECTOR = '[data-theme-toggle]';
