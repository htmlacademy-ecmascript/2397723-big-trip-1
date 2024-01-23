import { capitalizeFirstLetter, humanizeDate, DateFormat, getByKey, getById } from '../utils';

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
    `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
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
    </div>
    </section>`
  );
}

function createDestinationsTemplate(destinations) {
  return (
    destinations.map((item) => (
      `<option value="${item.name}"></option>`
    )).join('')
  );
}

function createRollupButtonTemplate() {
  return '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>';
}

export default function createFormTemplate({ event, offers, destinations, isEditForm }) {

  const currentDestination = event.destination ? getById(event.destination, destinations) : event.destination;

  return (
    ` <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createTypeListTemplate({ eventId: event.id, eventType: event.type, types: offers })}
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${event.id}">
              ${event.type}
            </label>
            <input
            class="event__input  event__input--destination"
            id="event-destination-${event.id}"
            type="text" name="event-destination"
            value="${currentDestination ? currentDestination.name : ''}"
            list="destination-list-${event.id}">
            <datalist id="destination-list-${event.id}">
              ${createDestinationsTemplate(destinations)}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${event.id}">From</label>
            <input
            class="event__input  event__input--time"
            id="event-start-time-${event.id}"
            type="text" name="event-start-time"
            value="${humanizeDate(event.dateFrom, DateFormat.DATE_TIME)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${event.id}">To</label>
            <input
            class="event__input  event__input--time"
            id="event-end-time-${event.id}"
            type="text" name="event-end-time"
            value="${humanizeDate(event.dateTo, DateFormat.DATE_TIME)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${event.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
            class="event__input  event__input--price"
            id="event-price-${event.id}"
            type="text" name="event-price" value="${event.basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isEditForm ? 'Delete' : 'Cancel'}</button>
          ${isEditForm ? createRollupButtonTemplate() : ''}
        </header>
        <section class="event__details">
            ${event.offers && createOffersListTemplate({ eventOffersId: event.offers, type: event.type, offers: offers })}
          ${event.destination && `<section class="event__section  event__section--destination">
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
