import { humanizeTaskDueDate, DATE_FORMAT, getByKey, getById } from '../utils';
import { createTypeListTemplate } from './type-list.template';

export function createOffersListTemplate({eventOffersId = [], type, offers}) {
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

function createDestinationsTemplate(destinationsArr) {
  return (
    destinationsArr.map((item) => (
      `<option value="${item.name}"></option>`
    )).join('')
  )
}

export default function createEditFormTemplate(event, offers, destinations) {

  const currentDestination = getById(event.destination, destinations);

  return (
    ` <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">

          ${createTypeListTemplate({eventId: event.id, eventType: event.type, types: offers})}
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${event.id}">
              ${event.type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${event.id}" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-${event.id}">
            <datalist id="destination-list-${event.id}">
              ${createDestinationsTemplate(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${event.id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${event.id}" type="text" name="event-start-time" value="${humanizeTaskDueDate(event.date_from, DATE_FORMAT.dateTime)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${event.id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${event.id}" type="text" name="event-end-time" value="${humanizeTaskDueDate(event.date_to, DATE_FORMAT.dateTime)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${event.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${event.id}" type="text" name="event-price" value="${event.base_price}">
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
            ${createOffersListTemplate({eventOffersId: event.offers, type: event.type, offers: offers})}
          </section>

          <section class="event__section  event__section--destination">
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
          </section>
        </section>
      </form>
    </li>`
  );
}
