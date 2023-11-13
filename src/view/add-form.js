import createAddFormTemplate from './add-form.template';
import { createElement } from '../render';

export default class AddFormView {

  constructor(offers, destinations) {
    this.offers = offers;
    this.destinations = destinations
  }

  getTemplate() {
    return createAddFormTemplate(this.offers, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
