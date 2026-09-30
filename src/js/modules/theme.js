/**
 * theme.js
 * --------------------------------------------------------------------------
 * Módulo de alternância de tema (claro / escuro / sistema).
 *
 * Responsabilidades:
 *  - Detectar preferência do sistema via `prefers-color-scheme`
 *  - Persistir escolha do usuário em `localStorage`
 *  - Aplicar `data-theme` no `<html>` para acionar tokens CSS
 *  - Sincronizar com mudanças do SO em tempo real
 *  - Atualizar `aria-pressed` / `aria-label` dos botões de alternância
 *  - Evitar FOUC (flash of unstyled content) — ver `inline-theme.js`
 *  - Respeitar `prefers-reduced-motion` ao trocar tema
 *
 * Contrato público:
 *  - `initTheme()`         → inicializa o módulo
 *  - `setTheme('light')`   → aplica tema programaticamente
 *  - `getTheme()`          → retorna tema resolvido ('light' | 'dark')
 *  - `getPreference()`     → retorna preferência salva ('light' | 'dark' | 'system')
 *  - `toggleTheme()`       → alterna entre claro e escuro
 *  - `clearTheme()`        → remove preferência, volta ao sistema
 *
 * Eventos emitidos no `document`:
 *  - `theme:change`  → { detail: { theme, preference } }
 * --------------------------------------------------------------------------
 */

import { THEME_STORAGE_KEY, THEME_ATTRIBUTE, THEME_TOGGLE_SELECTOR } from '../config/constants.js';

const THEMES = Object.freeze(['light', 'dark']);
const PREFERENCES = Object.freeze(['light', 'dark', 'system']);
const DEFAULT_THEME = 'dark';

const MEDIA_QUERY = '(prefers-color-scheme: dark)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function createMediaQueryList(matches = false, media = '') {
  return {
    matches,
    media,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  };
}

/* ==========================================================================
   Estado interno
   ========================================================================== */

/** @type {MediaQueryList | null} */
let darkModeQuery = null;

/** @type {MediaQueryList | null} */
let reducedMotionQuery = null;

/** @type {boolean} */
let initialized = false;

/* ==========================================================================
   Detecção e leitura
   ========================================================================== */

/**
 * Verifica se `localStorage` está disponível e acessível.
 * Em modo privado do Safari ou com cookies bloqueados, pode lançar erro.
 * @returns {boolean}
 */
function isStorageAvailable() {
  try {
    const test = '__theme_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Lê a preferência salva em `localStorage`.
 * @returns {'light' | 'dark' | 'system' | null}
 */
function readStoredPreference() {
  if (!isStorageAvailable()) return null;

  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (value && PREFERENCES.includes(value)) return value;
  } catch {
    /* noop */
  }
  return null;
}

/**
 * Persiste a preferência em `localStorage`.
 * @param {'light' | 'dark' | 'system'} preference
 */
function writeStoredPreference(preference) {
  if (!isStorageAvailable()) return;

  try {
    if (preference === 'system') {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  } catch {
    /* noop */
  }
}

/**
 * Detecta a preferência do sistema operacional.
 * @returns {'light' | 'dark'}
 */
function getSystemTheme() {
  if (!darkModeQuery) return DEFAULT_THEME;
  return darkModeQuery.matches ? 'dark' : 'light';
}

/**
 * Resolve a preferência salva em um tema concreto.
 * @param {'light' | 'dark' | 'system' | null} preference
 * @returns {'light' | 'dark'}
 */
function resolveTheme(preference) {
  if (preference === 'light' || preference === 'dark') return preference;
  return getSystemTheme();
}

/* ==========================================================================
   Aplicação do tema
   ========================================================================== */

/**
 * Aplica o tema atual ao `<html>`.
 * @param {'light' | 'dark'} theme
 * @param {boolean} [withTransition=false]
 */
function applyTheme(theme, withTransition = false) {
  const root = document.documentElement;

  if (!THEMES.includes(theme)) return;

  if (withTransition && !prefersReducedMotion()) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 320);
  }

  root.setAttribute(THEME_ATTRIBUTE, theme);
  root.style.colorScheme = theme;
  updateThemeColorMeta(theme);
}

/**
 * Atualiza `<meta name="theme-color">` para acompanhar o tema atual.
 * @param {'light' | 'dark'} theme
 */
function updateThemeColorMeta(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;

  const colors = { light: '#faf7f2', dark: '#0c0918' };
  meta.setAttribute('content', colors[theme] ?? colors.dark);
}

/**
 * Atualiza o atributo `aria-pressed` e `aria-label` dos botões de toggle.
 * @param {'light' | 'dark'} theme
 */
function updateToggleButtons(theme) {
  const buttons = document.querySelectorAll(THEME_TOGGLE_SELECTOR);
  const isDark = theme === 'dark';

  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
    button.dataset.theme = theme;
  });
}

/* ==========================================================================
   Preferências do usuário
   ========================================================================== */

/**
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return reducedMotionQuery ? reducedMotionQuery.matches : false;
}

/* ==========================================================================
   Emissão de eventos
   ========================================================================== */

/**
 * Emite `theme:change` com o estado atual.
 * @param {'light' | 'dark'} theme
 * @param {'light' | 'dark' | 'system'} preference
 */
function emitChange(theme, preference) {
  document.dispatchEvent(
    new CustomEvent('theme:change', {
      detail: { theme, preference },
      bubbles: false,
    }),
  );
}

/* ==========================================================================
   API pública
   ========================================================================== */

/**
 * Retorna o tema atual aplicado ao `<html>`.
 * @returns {'light' | 'dark'}
 */
export function getTheme() {
  const attr = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return THEMES.includes(attr) ? attr : DEFAULT_THEME;
}

/**
 * Retorna a preferência salva do usuário.
 * @returns {'light' | 'dark' | 'system'}
 */
export function getPreference() {
  return readStoredPreference() ?? 'system';
}

/**
 * Define o tema a ser aplicado e persiste a preferência.
 * @param {'light' | 'dark' | 'system'} preference
 * @param {{ persist?: boolean, silent?: boolean, transition?: boolean }} [options]
 */
export function setTheme(preference, options = {}) {
  const { persist = true, silent = false, transition = true } = options;

  if (!PREFERENCES.includes(preference)) return;

  const theme = resolveTheme(preference);
  applyTheme(theme, transition);

  if (persist) writeStoredPreference(preference);

  updateToggleButtons(theme);

  if (!silent) emitChange(theme, preference);
}

/**
 * Alterna entre claro e escuro com base no tema atual.
 * Se o tema atual for claro → vai para escuro, e vice-versa.
 */
export function toggleTheme() {
  const current = getTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next, { persist: true, transition: true });
}

/**
 * Remove a preferência salva e volta a seguir o sistema.
 */
export function clearTheme() {
  writeStoredPreference('system');
  setTheme('system', { persist: false, transition: true });
}

/* ==========================================================================
   Inicialização
   ========================================================================== */

/**
 * Inicializa o módulo de tema.
 *
 * - Aplica o tema salvo (ou o do sistema) imediatamente
 * - Vincula cliques aos botões `[data-theme-toggle]`
 * - Escuta mudanças de `prefers-color-scheme` em tempo real
 * - Escuta mudanças de `prefers-reduced-motion`
 */
export function initTheme() {
  if (initialized) return;
  initialized = true;

  darkModeQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia(MEDIA_QUERY)
      : createMediaQueryList(DEFAULT_THEME === 'dark', MEDIA_QUERY);

  reducedMotionQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia(REDUCED_MOTION_QUERY)
      : createMediaQueryList(false, REDUCED_MOTION_QUERY);

  // 1. Aplica o tema inicial sem transição (evita "flash" no load)
  const preference = getPreference();
  const theme = resolveTheme(preference);
  applyTheme(theme, false);
  updateToggleButtons(theme);

  // 2. Vincula botões de alternância
  bindToggleButtons();

  // 3. Escuta mudanças do sistema (só aplica se o usuário estiver em 'system')
  darkModeQuery.addEventListener('change', (event) => {
    if (getPreference() !== 'system') return;
    const next = event.matches ? 'dark' : 'light';
    applyTheme(next, true);
    updateToggleButtons(next);
    emitChange(next, 'system');
  });

  // 4. Sincroniza entre abas/janelas via `storage` event
  window.addEventListener('storage', (event) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    const preference = readStoredPreference() ?? 'system';
    const theme = resolveTheme(preference);
    applyTheme(theme, true);
    updateToggleButtons(theme);
    emitChange(theme, preference);
  });
}

/**
 * Vincula os botões `[data-theme-toggle]` ao toggle de tema.
 * Delegação de eventos — suporta elementos adicionados dinamicamente.
 */
function bindToggleButtons() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest(THEME_TOGGLE_SELECTOR);
    if (!button) return;
    event.preventDefault();
    toggleTheme();
  });
}

/* ==========================================================================
   Auto-init
   --------------------------------------------------------------------------
   `main.js` chama `initTheme()` explicitamente. Este bloco garante que o
   módulo funcione mesmo se importado isoladamente (ex.: em testes).
   ========================================================================== */

if (typeof window !== 'undefined' && !window.__THEME_MODULE_LOADED__) {
  window.__THEME_MODULE_LOADED__ = true;
}
