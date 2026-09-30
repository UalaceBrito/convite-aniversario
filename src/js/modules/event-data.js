import gallery1Url from '../../assets/images/galeria-1.svg';
import gallery2Url from '../../assets/images/galeria-2.svg';
import gallery3Url from '../../assets/images/galeria-3.svg';
import gallery4Url from '../../assets/images/galeria-4.svg';
import gallery5Url from '../../assets/images/galeria-5.svg';
import gallery6Url from '../../assets/images/galeria-6.svg';

const GALLERY_IMAGES = new Map([
  ['galeria-1.svg', gallery1Url],
  ['galeria-2.svg', gallery2Url],
  ['galeria-3.svg', gallery3Url],
  ['galeria-4.svg', gallery4Url],
  ['galeria-5.svg', gallery5Url],
  ['galeria-6.svg', gallery6Url],
]);

const fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`A requisição para ${url} falhou com status ${response.status}.`);
  }

  return response.json();
};

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const validateData = (event, gallery, schedule) => {
  if (
    !isObject(event) ||
    typeof event.name !== 'string' ||
    typeof event.startDate !== 'string' ||
    Number.isNaN(Date.parse(event.startDate)) ||
    typeof event.endDate !== 'string' ||
    Number.isNaN(Date.parse(event.endDate)) ||
    typeof event.rsvpDeadline !== 'string' ||
    Number.isNaN(Date.parse(event.rsvpDeadline)) ||
    typeof event.dressCode !== 'string' ||
    !isObject(event.location) ||
    !['name', 'street', 'district', 'city', 'state', 'postalCode'].every(
      (key) => typeof event.location[key] === 'string',
    )
  ) {
    throw new TypeError('Os dados do evento estão em um formato inválido.');
  }

  if (
    !Array.isArray(gallery) ||
    !gallery.every(
      (item) =>
        isObject(item) &&
        typeof item.src === 'string' &&
        GALLERY_IMAGES.has(item.src) &&
        typeof item.alt === 'string',
    )
  ) {
    throw new TypeError('Os dados da galeria estão em um formato inválido.');
  }

  if (
    !Array.isArray(schedule) ||
    !schedule.every(
      (item) =>
        isObject(item) &&
        typeof item.time === 'string' &&
        typeof item.title === 'string' &&
        typeof item.description === 'string',
    )
  ) {
    throw new TypeError('Os dados da programação estão em um formato inválido.');
  }
};

const formatDate = (value) =>
  new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value));

const formatTime = (value) =>
  new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  })
    .format(new Date(value))
    .replace(':', 'h');

const getAddress = (location) =>
  `${location.street} — ${location.district}, ${location.city} / ${location.state} — CEP ${location.postalCode}`;

const renderSchedule = (schedule) => {
  const list = document.querySelector('[data-schedule]');
  if (!list) return;

  const items = schedule.map((entry) => {
    const item = document.createElement('li');
    item.className = 'schedule__item';

    const time = document.createElement('span');
    time.className = 'schedule__time';
    time.textContent = entry.time;

    const body = document.createElement('div');
    body.className = 'schedule__body';

    const title = document.createElement('h3');
    title.className = 'schedule__title';
    title.textContent = entry.title;

    const description = document.createElement('p');
    description.className = 'schedule__desc';
    description.textContent = entry.description;

    body.append(title, description);
    item.append(time, body);
    return item;
  });

  list.replaceChildren(...items);
};

const renderGallery = (gallery) => {
  const list = document.querySelector('[data-gallery]');
  if (!list) return;

  const items = gallery.map((entry) => {
    const imageUrl = GALLERY_IMAGES.get(entry.src);
    if (!imageUrl) {
      throw new Error(`A imagem ${entry.src} não foi encontrada.`);
    }

    const item = document.createElement('li');
    item.className = 'gallery__item';

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = entry.alt;
    image.width = 800;
    image.height = 600;
    image.loading = 'lazy';
    image.decoding = 'async';

    item.append(image);
    return item;
  });

  list.replaceChildren(...items);
};

const renderEvent = (event) => {
  const locationName = event.location.name;
  const address = getAddress(event.location);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${event.location.street} ${event.location.district} ${event.location.city} ${event.location.state}`,
  )}`;
  const rsvpDate = new Date(event.rsvpDeadline);
  document.querySelectorAll('[data-event-name]').forEach((element) => {
    element.textContent = event.name;
  });
  document.querySelectorAll('[data-event-date]').forEach((element) => {
    element.textContent = formatDate(event.startDate);
  });
  document.querySelectorAll('[data-event-time]').forEach((element) => {
    element.textContent = `${formatTime(event.startDate)} às ${formatTime(event.endDate)}`;
  });
  document.querySelectorAll('[data-event-start-time]').forEach((element) => {
    element.textContent = formatTime(event.startDate);
  });
  document.querySelectorAll('[data-event-location]').forEach((element) => {
    element.textContent = locationName;
  });
  document.querySelectorAll('[data-event-address]').forEach((element) => {
    element.textContent = address;
  });
  document.querySelectorAll('[data-event-dress-code]').forEach((element) => {
    element.textContent = event.dressCode;
  });
  document.querySelectorAll('[data-event-rsvp-deadline]').forEach((element) => {
    element.textContent = formatDate(rsvpDate.toISOString());
  });

  const countdown = document.querySelector('[data-countdown]');
  if (countdown) countdown.dataset.countdown = event.startDate;

  const mapLink = document.querySelector('[data-event-map]');
  if (mapLink) mapLink.href = mapUrl;

  const map = document.querySelector('[data-event-map-label]');
  if (map) {
    map.textContent = locationName;
    map.parentElement.setAttribute(
      'aria-label',
      `Mapa ilustrativo da localização do evento — ${locationName}, ${address}`,
    );
  }
};

export async function initEventData() {
  const errorMessage = document.querySelector('[data-event-data-error]');
  const dataUrl = (file) => `${import.meta.env.BASE_URL}data/${file}`;

  try {
    const [event, gallery, schedule] = await Promise.all([
      fetchJson(dataUrl('event.json')),
      fetchJson(dataUrl('gallery.json')),
      fetchJson(dataUrl('schedule.json')),
    ]);
    validateData(event, gallery, schedule);
    renderEvent(event);
    renderGallery(gallery);
    renderSchedule(schedule);
  } catch (error) {
    console.error('Não foi possível carregar os dados do convite.', error);
    if (errorMessage) errorMessage.hidden = false;
  }
}
