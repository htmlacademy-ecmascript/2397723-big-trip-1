import {remove, render, RenderPosition} from '../framework/render';
import {UserAction, UpdateType} from '../const';
import FormView from '../view/form';

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

  setSaving() {
    this.#formComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#formComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formComponent.shake(resetFormState);
  }

  #handleFormSubmit = (event) => {
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
