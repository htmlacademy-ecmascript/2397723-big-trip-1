import createEventPointTemplate from './event-point.template';
import { createElement } from '../render';

export default class EventPointView {

  getTemplate() {
    return createEventPointTemplate();
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
