import createEventFormSaveBtnTemplate from './event-form-save-btn.template';
import { createElement } from '../render';

export default class EventFormSaveBtnView {

  getTemplate() {
    return createEventFormSaveBtnTemplate();
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
