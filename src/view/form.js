import createFormTemplate from './form.template';
import AbstractView from '../framework/view/abstract-view';


export default class FormView extends AbstractView {
  #event = null;
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleFormClose = null;

  constructor({ event, offers, destinations, onFormSubmit, onFormClose }) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;

    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formCloseHandler);
  }

  get template() {
    return createFormTemplate({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };
}
