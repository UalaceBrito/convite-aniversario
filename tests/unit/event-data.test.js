import { afterEach, describe, expect, it, vi } from 'vitest';
import { initEventData } from '../../src/js/modules/event-data.js';

const event = {
  name: 'Aniversário de Maria Silva',
  startDate: '2027-08-15T19:00:00-03:00',
  endDate: '2027-08-16T00:00:00-03:00',
  rsvpDeadline: '2027-08-01T23:59:59-03:00',
  dressCode: 'Esporte fino',
  location: {
    name: 'Espaço Villa Jardim',
    street: 'Rua das Acácias, 123',
    district: 'Jardim Primavera',
    city: 'São Paulo',
    state: 'SP',
    postalCode: '00000-000',
  },
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

describe('initEventData', () => {
  it('carrega os arquivos JSON e renderiza os dados do convite', async () => {
    document.body.innerHTML = `
      <span data-event-name></span>
      <span data-event-date></span>
      <span data-event-time></span>
      <span data-event-location></span>
      <span data-event-dress-code></span>
      <span data-event-rsvp-deadline></span>
      <div data-countdown></div>
      <a data-event-map></a>
      <div role="img"><span data-event-map-label></span></div>
      <ul data-gallery><li>galeria antiga</li></ul>
      <ol data-schedule><li>programação antiga</li></ol>
      <p data-event-data-error hidden></p>
    `;
    const gallery = [{ src: 'galeria-1.svg', alt: 'Bolo de aniversário' }];
    const schedule = [{ time: '19:00', title: 'Recepção', description: 'Boas-vindas.' }];
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => event })
      .mockResolvedValueOnce({ ok: true, json: async () => gallery })
      .mockResolvedValueOnce({ ok: true, json: async () => schedule });
    vi.stubGlobal('fetch', fetchMock);

    await initEventData();

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(document.querySelector('[data-event-name]').textContent).toBe(
      'Aniversário de Maria Silva',
    );
    expect(document.querySelector('[data-event-date]').textContent).toContain(
      '15 de agosto de 2027',
    );
    expect(document.querySelector('[data-countdown]').dataset.countdown).toBe(event.startDate);
    expect(document.querySelector('[data-gallery] img').alt).toBe('Bolo de aniversário');
    expect(document.querySelector('[data-schedule] .schedule__title').textContent).toBe('Recepção');
    expect(document.querySelector('[data-event-data-error]').hidden).toBe(true);
  });

  it('mantém o conteúdo disponível e exibe um aviso quando a requisição falha', async () => {
    document.body.innerHTML = `
      <ul data-gallery><li>galeria disponível</li></ul>
      <p data-event-data-error hidden></p>
    `;
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Falha de rede')));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await initEventData();

    expect(document.querySelector('[data-gallery]').textContent).toBe('galeria disponível');
    expect(document.querySelector('[data-event-data-error]').hidden).toBe(false);
  });
});
