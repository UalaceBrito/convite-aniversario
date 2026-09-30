import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getTheme,
  getPreference,
  setTheme,
  toggleTheme,
  clearTheme,
  initTheme,
} from '../../src/js/modules/theme.js';

describe('theme.js', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initTheme aplica tema padrão (dark)', () => {
    initTheme();
    expect(document.documentElement.getAttribute('data-theme')).toMatch(/light|dark/);
  });

  it('setTheme("light") aplica e persiste', () => {
    setTheme('light', { silent: true });
    expect(getTheme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('setTheme("dark") aplica e persiste', () => {
    setTheme('dark', { silent: true });
    expect(getTheme()).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggleTheme alterna entre light e dark', () => {
    setTheme('dark', { silent: true });
    toggleTheme();
    expect(getTheme()).toBe('light');
    toggleTheme();
    expect(getTheme()).toBe('dark');
  });

  it('clearTheme volta a seguir o sistema', () => {
    setTheme('light', { silent: true });
    clearTheme();
    expect(localStorage.getItem('theme')).toBeNull();
    expect(getPreference()).toBe('system');
  });

  it('emite evento theme:change', () => {
    const handler = vi.fn();
    document.addEventListener('theme:change', handler);
    setTheme('light');
    expect(handler).toHaveBeenCalled();
    const detail = handler.mock.calls[0][0].detail;
    expect(detail.theme).toBe('light');
    expect(detail.preference).toBe('light');
  });
});
