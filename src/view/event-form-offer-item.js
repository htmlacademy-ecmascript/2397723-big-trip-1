import createEventFormOfferItemTemplate from './event-form-offer-item.template';
import { createElement } from '../render';

export default class EventFormOfferItemView {

  getTemplate() {
    return createEventFormOfferItemTemplate();
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
