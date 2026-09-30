import { describe, it, expect } from 'vitest';
import { pad, diffParts } from '../../src/js/utils/dates.js';

describe('pad', () => {
  it('preenche com zero', () => {
    expect(pad(0)).toBe('00');
    expect(pad(7)).toBe('07');
    expect(pad(42)).toBe('42');
  });
});

describe('diffParts', () => {
  it('calcula dias/horas/min/seg', () => {
    const from = Date.UTC(2027, 0, 1, 0, 0, 0);
    const to = Date.UTC(2027, 0, 2, 1, 2, 3);
    const p = diffParts(from, to);
    expect(p.days).toBe(1);
    expect(p.hours).toBe(1);
    expect(p.minutes).toBe(2);
    expect(p.seconds).toBe(3);
  });
});
