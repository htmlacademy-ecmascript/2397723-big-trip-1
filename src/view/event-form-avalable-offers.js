import createEventFormAvalableOffersTemplate from './event-form-avalable-offers.template';
import { createElement } from '../render';

export default class EventFormAvalableOffersView {

  getTemplate() {
    return createEventFormAvalableOffersTemplate();
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
