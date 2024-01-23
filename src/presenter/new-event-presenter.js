import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import FormView from '../view/form.js';
import { nanoid } from 'nanoid';

export default class NewEventPresenter {
  #offers = null;
  #destinations = null;

  #newEventFormContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #formComponent = null;

  constructor({newEventFormContainer, offers, destinations, onDataChange, onDestroy}) {
    this.#newEventFormContainer = newEventFormContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#formComponent !== null) {
      return;
    }

    this.#formComponent = new FormView({
      offers: this.#offers,
      destinations: this.#destinations,
      isEditForm: false,
      onFormSubmit: this.#handleFormSubmit,
      onResetClick: this.#handleDeleteClick
    });

    render(this.#formComponent, this.#newEventFormContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#formComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#formComponent);
    this.#formComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    event.id = nanoid();
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
