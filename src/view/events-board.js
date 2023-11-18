import createEventsBoardTemplate from './events-board.template';
import { createElement } from '../render';

export default class EventsBoardView {

  getTemplate() {
    return createEventsBoardTemplate();
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
