import { humanizeTaskDueDate, DATE_FORMAT, getByKey } from '../utils';
import createOffersListTemplate from './offers-list.template';

export default function createEventTemplate(events, offers, destinations) {
  // Тут надо будет расширить список в соответствии с ТЗ (надпись меняется в зависимости от фильтра). Просто пока еще не определился, где состояние фильтров хранится.
  if (!events) {
    return (
      `<p class="trip-events__msg">
        Click New Event to create your first point
      </p>`
    );
  }


  return (
    `<ul class="trip-events__list">${events.map((event) => (
      `<li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="2019-03-18">${humanizeTaskDueDate(event.date_from, DATE_FORMAT.pointDay)}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${event.type} ${getByKey('id', event.destination, destinations).name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${event.date_from}">${humanizeTaskDueDate(event.date_from, DATE_FORMAT.pointTime)}</time>
              &mdash;
              <time class="event__end-time" datetime="${event.date_to}">${humanizeTaskDueDate(event.date_to, DATE_FORMAT.pointTime)}</time>
            </p>
            <p class="event__duration">
            ${humanizeTaskDueDate(new Date(event.date_from) - new Date(event.date_to), DATE_FORMAT.pointDurationHours)}H
            ${humanizeTaskDueDate(new Date(event.date_from) - new Date(event.date_to), DATE_FORMAT.pointDurationMinutes)}M
            </p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${event.base_price}</span>
          </p>

          ${createOffersListTemplate(event.offers, event.type, offers)}
          <button class="event__favorite-btn  ${event.is_favorite ? 'event__favorite-btn--active' : ''}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    )).join('')}</ul>`
  );
}
