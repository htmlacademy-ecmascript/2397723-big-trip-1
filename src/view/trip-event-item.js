import createEventItemTemplate from './trip-event-item.template';
import { createElement } from '../render';

export default class EventItemView {

  getTemplate() {
    return createEventItemTemplate();
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
