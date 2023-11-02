import createEventFormHeaderTemplate from './event-form-header.template';
import { createElement } from '../render';

export default class EventFormHeaderView {

  getTemplate() {
    return createEventFormHeaderTemplate();
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
