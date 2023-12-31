import { getByKey, getById } from '../utils';
import { render, replace, remove } from '../framework/render';
import EventView from '../view/event';
import FormView from '../view/form';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class EventPresenter {
  #event = null;
  #mode = Mode.DEFAULT;

  #offers = [];
  #destinations = [];
  #eventsBoard = null;
  #eventComponent = null;
  #formComponent = null;

  #handleModeChange = null;
  #handleDataChange = null;


  constructor({ offers, destinations, eventsBoard, onDataChange, onModeChange }) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#eventsBoard = eventsBoard;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevFormComponent = this.#formComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      offers: this.#getEventsOffers({
        type: this.#event.type,
        ids: this.#event.offers
      }),
      destination: this.#getEventsDestination(this.#event.destination),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#formComponent = new FormView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose
    });

    if (prevEventComponent === null || prevFormComponent === null) {
      render(this.#eventComponent, this.#eventsBoard);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#formComponent, prevFormComponent);
    }
    remove(prevEventComponent);
    remove(prevFormComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceEventToForm();
    }
  }

  #getEventsDestination(id) {
    const eventsDestination = getByKey('id', id, this.#destinations);
    return eventsDestination;
  }

  #getEventsOffers({ type, ids }) {
    const currentOffers = getByKey('type', type, this.#offers);
    const eventsOffers = [];
    ids.forEach((item) => (
      item && eventsOffers.push(getById(item, currentOffers.offers))
    ));
    return eventsOffers;
  }

  #escKeyDownHandler(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEventToForm();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #handleEditClick = () => {
    this.#replaceFormToEvent();
  };

  #handleFormClose = () => {
    this.#replaceEventToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#event, isFavorite: !this.#event.isFavorite });
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(event);
    this.#replaceEventToForm();
  };

  #replaceFormToEvent() {
    replace(this.#formComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEventToForm() {
    replace(this.#eventComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#formComponent);
  }
}
