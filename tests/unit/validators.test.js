import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isNonEmpty,
  sanitizeText,
  isPhoneBR,
} from '../../src/js/utils/validators.js';

describe('isValidEmail', () => {
  it('aceita e-mails válidos', () => {
    expect(isValidEmail('a@b.com')).toBe(true);
    expect(isValidEmail('nome.sobrenome@dominio.co')).toBe(true);
  });
  it('rejeita e-mails inválidos', () => {
    expect(isValidEmail('a@b')).toBe(false);
    expect(isValidEmail('a b@c.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail(null)).toBe(false);
  });
});

describe('isNonEmpty', () => {
  it('detecta strings vazias', () => {
    expect(isNonEmpty('   ')).toBe(false);
    expect(isNonEmpty('a')).toBe(true);
    expect(isNonEmpty(undefined)).toBe(false);
  });
});

describe('sanitizeText', () => {
  it('normaliza espaços', () => {
    expect(sanitizeText('  Maria   Silva  ')).toBe('Maria Silva');
  });
});

describe('isPhoneBR', () => {
  it('aceita fixo e celular', () => {
    expect(isPhoneBR('(11) 90000-0000')).toBe(true);
    expect(isPhoneBR('1133334444')).toBe(true);
  });
  it('rejeita inválidos', () => {
    expect(isPhoneBR('123')).toBe(false);
    expect(isPhoneBR('')).toBe(false);
  });
});
