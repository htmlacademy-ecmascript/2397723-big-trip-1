import createEventFormOpenBtnTemplate from './event-form-open-btn.template';
import { createElement } from '../render';

export default class EventFormOpenBtnView {

  getTemplate() {
    return createEventFormOpenBtnTemplate();
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
