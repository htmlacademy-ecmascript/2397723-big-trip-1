import createEventFormOffersListTemplate from './event-form-offers-list.template';
import { createElement } from '../render';

export default class EventFormOffersListView {

  getTemplate() {
    return createEventFormOffersListTemplate();
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
