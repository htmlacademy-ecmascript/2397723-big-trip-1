import createEventTemplate from './event.template';
import AbstractView from '../framework/view/abstract-view';

export default class EventView extends AbstractView {
  #event = null;
  #offers = null;
  #destination = null;
  #handleEditClick = null;

  constructor({ event, offers, destination, onEditClick }) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destination = destination;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createEventTemplate({
      event: this.#event,
      offers: this.#offers,
      destination: this.#destination
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
