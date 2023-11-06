import createEventFormAvailableOffersTemplate from './event-form-available-offers.template';
import { createElement } from '../render';

export default class EventFormAvailableOffersView {

  getTemplate() {
    return createEventFormAvailableOffersTemplate();
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
