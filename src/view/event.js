import createEventTemplate from './event.template';
import AbstractView from '../framework/view/abstract-view';
import { debounce } from '../utils/common';

export default class EventView extends AbstractView {
  #event = null;
  #offers = null;
  #destination = null;
  #handleEditClick = null;
  #handlerFavoriteClick = null;

  constructor({ event, offers, destination, onEditClick, onFavoriteClick }) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destination = destination;
    this.#handleEditClick = onEditClick;
    this.#handlerFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
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

  #favoriteClickHandler = debounce((evt) => {
    evt.preventDefault();
    this.#handlerFavoriteClick();
  });
}
