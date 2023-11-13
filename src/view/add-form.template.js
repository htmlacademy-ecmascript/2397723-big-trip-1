import { createTypeListTemplate } from './type-list.template';
import { createOffersListTemplate } from './edit-form.template';
import { capitalizeFirstLetter, getById } from '../utils';

// Названия ключей взяты из апишки. Где-то дальше, на сколько я понял, в уроках будет показано, как их здесь писать кемелКейсом, но получать с сервера в таком виде.
// Впрочем, я и сейчас могу этим заморочиться. Но вроде требовать должны дальше.

const initialData = {
  id: '',
  type: 'taxi',
  date_from: '',
  date_to: '',
  destination: '',
  base_price: '',
  is_favorite: false,
  offers: []
};

function createDestinationsTemplate(destinationsArr) {
  return (
    destinationsArr.map((item) => (
      `<option value="${item.name}"></option>`
    )).join('')
  );
}

export default function createAddFormTemplate(offers, destinations) {

  const currentDestination = initialData.destination && getById(initialData.destination, destinations)
  return (
    ` <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createTypeListTemplate({ types: offers })}
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${initialData.id}">
              ${capitalizeFirstLetter(initialData.type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${initialData.id}" type="text" name="event-destination" value="" list="destination-list-${initialData.id}">
            <datalist id="destination-list-${initialData.id}">
              ${createDestinationsTemplate(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${initialData.id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${initialData.id}" type="text" name="event-start-time" value="${initialData.date_from}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${initialData.id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${initialData.id}" type="text" name="event-end-time" value="${initialData.date_to}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${initialData.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${initialData.id}" type="text" name="event-price" value="${initialData.base_price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${createOffersListTemplate({ eventOffersId: initialData.offers, type: initialData.type, offers: offers })}
          </section>

          ${initialData.destination && `<section class="event__section  event__section--destination">
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
