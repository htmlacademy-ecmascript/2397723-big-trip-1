import { capitalizeFirstLetter } from '../utils';

// Делать под этот шаблон отдельный View? Или как сейчас просто использовать его в другом шаблоне? Замечу, конкретно этот шаблон используется в ДВУХ других.

export function createTypeListTemplate({eventId = 0, eventType = 'taxi', types = []}) {
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
