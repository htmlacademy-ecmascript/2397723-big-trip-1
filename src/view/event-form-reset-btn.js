import createEventFormResetBtnTemplate from './event-form-reset-btn.template';
import { createElement } from '../render';

export default class EventFormResetBtnView {

  constructor(title) {
    this.title = title;
  }

  getTemplate() {
    return createEventFormResetBtnTemplate(this.title);
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
