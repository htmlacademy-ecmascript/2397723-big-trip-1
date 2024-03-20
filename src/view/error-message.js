import AbstractView from '../framework/view/abstract-view';
import { createErrorMessageTemplate } from './error-message-template';

export default class ErrorMessageView extends AbstractView {
  #message;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createErrorMessageTemplate(this.#message);
  }
}
