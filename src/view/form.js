import createFormTemplate from './form.template';
import { createElement } from '../render';

export default class FormView {

  constructor({event, offers, destinations}) {
    this.event = event;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createFormTemplate({event: this.event, offers: this.offers, destinations: this.destinations});
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
