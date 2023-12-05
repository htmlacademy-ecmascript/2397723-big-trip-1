import { capitalizeFirstLetter, humanizeTaskDueDate, DATE_FORMAT, getByKey, getById } from '../utils';

const initialData = {
  id: '0',
  type: 'taxi',
  dateFrom: '',
  dateTo: '',
  destination: '',
  basePrice: '',
  isFavorite: false,
  offers: []
};

function createTypeListTemplate({ eventId, eventType, types }) {
  return (
    `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-${eventId}">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventId}" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

      ${types.map((type) => (
      `<div class="event__type-item">
          <input
            id="event-type-${type.type}-${eventId}"
            class="event__type-input  visually-hidden"
            type="radio"
            name="event-type"
            value="${type.type}"
            ${type.type === eventType ? 'checked' : ''}>
          <label
            class="event__type-label  event__type-label--${type.type}"
            for="event-type-${type.type}-${eventId}">
          ${capitalizeFirstLetter(type.type)}
          </label>
        </div>`
    )).join('')}
      </fieldset>
    </div>
  </div>`
  );
}


function createOffersListTemplate({ eventOffersId = [], type, offers }) {
  const offersList = getByKey('type', type, offers).offers;
  return (
    `<div class="event__available-offers">
      ${offersList.map((item) => (
      `<div class="event__offer-selector">
        <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${item.id}"
        type="checkbox"
        name="event-offer-luggage"
        ${eventOffersId.includes(item.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${item.id}">
          <span class="event__offer-title">${item.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${item.price}</span>
        </label>
      </div>`
    )).join('')}
    </div>`
  );
}

function createDestinationsTemplate(destinations) {
  return (
    destinations.map((item) => (
      `<option value="${item.name}"></option>`
    )).join('')
  );
}

export default function createFormTemplate({ event, offers, destinations }) {

  let data = initialData;

  if (event) {
    data = {
      id: event.id,
      type: event.type,
      dateFrom: event.dateFrom,
      dateTo: event.dateTo,
      destination: event.destination,
      basePrice: event.basePrice,
      isFavorite: false,
      offers: event.offers
    };
  }
  const currentDestination = data.destination ? getById(data.destination, destinations) : data.destination;

  return (
    ` <li class="trip-events__item" style="list-style-type: none">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">

          ${createTypeListTemplate({ eventId: data.id, eventType: data.type, types: offers })}
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${data.id}">
              ${data.type}
            </label>
            <input
            class="event__input  event__input--destination"
            id="event-destination-${data.id}"
            type="text" name="event-destination"
            value="${currentDestination ? currentDestination.name : ''}"
            list="destination-list-${data.id}">
            <datalist id="destination-list-${data.id}">
              ${createDestinationsTemplate(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${data.id}">From</label>
            <input
            class="event__input  event__input--time"
            id="event-start-time-${data.id}"
            type="text" name="event-start-time"
            value="${humanizeTaskDueDate(data.dateFrom, DATE_FORMAT.dateTime)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${data.id}">To</label>
            <input
            class="event__input  event__input--time"
            id="event-end-time-${data.id}"
            type="text" name="event-end-time"
            value="${humanizeTaskDueDate(data.dateTo, DATE_FORMAT.dateTime)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${data.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
            class="event__input  event__input--price"
            id="event-price-${data.id}"
            type="text" name="event-price" value="${data.basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${data.offers && createOffersListTemplate({ eventOffersId: data.offers, type: data.type, offers: offers })}
          </section>

          ${data.destination && `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${currentDestination.description && `<p class="event__destination-description">${currentDestination.description}</p>`}
        ${currentDestination.pictures &&
    `<div class="event__photos-container">
              <div class="event__photos-tape">
              ${currentDestination.pictures.map((picture) => (
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
    )).join('')}
              </div>
            </div>`}
      </section>`}
        </section>
      </form>
    </li>`
  );
}
