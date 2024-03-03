import { getByKey, getById } from '../utils/common';
import { render, replace, remove } from '../framework/render';
import EventView from '../view/event';
import FormView from '../view/form';
import { UserAction, UpdateType } from '../const';

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

    if (prevEventComponent === null || prevFormComponent === null) {
      render(this.#eventComponent, this.#eventsBoard.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventComponent, prevFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEventToForm();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#formComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#formComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#formComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formComponent.shake(resetFormState);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#formComponent);
  }

  #getEventsDestination(id) {
    return getByKey('id', id, this.#destinations);
  }

  #getEventsOffers({ type, ids }) {
    const currentOffers = getByKey('type', type, this.#offers);
    const eventsOffers = [];
    ids.forEach((item) => (
      item && eventsOffers.push(getById(item, currentOffers.offers))
    ));
    return eventsOffers;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEventToForm();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#formComponent = new FormView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      onResetClick: this.#handleFormDelete
    });
    this.#replaceFormToEvent();
  };

  #handleFormClose = () => {
    this.#replaceEventToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      { ...this.#event, isFavorite: !this.#event.isFavorite }
    );
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event
    );
  };

  #handleFormDelete = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event
    );
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
}
