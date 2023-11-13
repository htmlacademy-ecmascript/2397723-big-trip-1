import createEditFormTemplate from './edit-form.template';
import { createElement } from '../render';

export default class EditFormView {

  constructor(event, offers, destinations) {
    this.event = event;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEditFormTemplate(this.event, this.offers, this.destinations);
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
