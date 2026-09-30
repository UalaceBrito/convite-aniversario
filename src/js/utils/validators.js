const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value) {
  if (typeof value !== 'string') return false;
  return EMAIL_RE.test(value.trim());
}

export function isNonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function sanitizeText(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim();
}

export function isPhoneBR(value) {
  if (typeof value !== 'string') return false;
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}
