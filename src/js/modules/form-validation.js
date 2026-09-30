import { SELECTORS } from '../config/constants.js';
import { isValidEmail, isNonEmpty, sanitizeText } from '../utils/validators.js';

const messages = {
  nome: {
    valueMissing: 'Por favor, informe seu nome completo.',
    tooShort: 'O nome deve ter pelo menos 3 caracteres.',
  },
  email: {
    valueMissing: 'Por favor, informe seu e-mail.',
    typeMismatch: 'Informe um e-mail válido (ex.: nome@dominio.com).',
  },
};

export function initFormValidation() {
  const form = document.querySelector(SELECTORS.rsvpForm);
  const success = document.querySelector(SELECTORS.formSuccess);
  const successName = document.querySelector(SELECTORS.successName);
  if (!form || !success) return;

  const nomeInput = form.querySelector('#nome');
  const emailInput = form.querySelector('#email');
  const mensagemInput = form.querySelector('#mensagem');

  const setError = (input, message) => {
    const field = input.closest('.field');
    const errorId = input.getAttribute('aria-describedby');
    const errorEl = errorId ? document.getElementById(errorId) : null;

    if (message) {
      input.setAttribute('aria-invalid', 'true');
      field?.classList.add('has-error');
      if (errorEl) errorEl.textContent = message;
    } else {
      input.removeAttribute('aria-invalid');
      field?.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
    }
  };

  const validateNome = () => {
    const value = sanitizeText(nomeInput.value);
    if (!isNonEmpty(value)) {
      setError(nomeInput, messages.nome.valueMissing);
      return false;
    }
    if (value.length < 3) {
      setError(nomeInput, messages.nome.tooShort);
      return false;
    }
    setError(nomeInput, '');
    return true;
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    if (!isNonEmpty(value)) {
      setError(emailInput, messages.email.valueMissing);
      return false;
    }
    if (!isValidEmail(value)) {
      setError(emailInput, messages.email.typeMismatch);
      return false;
    }
    setError(emailInput, '');
    return true;
  };

  nomeInput?.addEventListener('blur', validateNome);
  emailInput?.addEventListener('blur', validateEmail);

  nomeInput?.addEventListener('input', () => {
    if (nomeInput.getAttribute('aria-invalid') === 'true') validateNome();
  });
  emailInput?.addEventListener('input', () => {
    if (emailInput.getAttribute('aria-invalid') === 'true') validateEmail();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const okNome = validateNome();
    const okEmail = validateEmail();

    if (!okNome) {
      nomeInput.focus();
      return;
    }
    if (!okEmail) {
      emailInput.focus();
      return;
    }

    const nome = sanitizeText(nomeInput.value);
    if (successName) successName.textContent = nome;

    form.hidden = true;
    success.hidden = false;
    success.focus({ preventScroll: true });
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });

    console.info('[RSVP] Confirmação (demo):', {
      nome,
      email: emailInput.value.trim(),
      acompanhantes: Number(form.querySelector('#acompanhantes').value),
      mensagem: sanitizeText(mensagemInput?.value ?? ''),
      timestamp: new Date().toISOString(),
    });
  });
}
