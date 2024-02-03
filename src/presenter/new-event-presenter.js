import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import FormView from '../view/form.js';
import { nanoid } from 'nanoid';

export default class NewEventPresenter {
  #offers = null;
  #destinations = null;

  #eventsBoard = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #formComponent = null;

  constructor({eventsBoard, offers, destinations, onDataChange, onDestroy}) {
    this.#eventsBoard = eventsBoard;
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
      onResetClick: this.#handleResetClick
    });
    console.log(this.#eventsBoard)
    render(this.#formComponent, this.#eventsBoard.element, RenderPosition.BEFOREBEGIN);

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

  #handleResetClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
