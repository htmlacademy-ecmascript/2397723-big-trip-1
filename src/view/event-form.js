import createEventFormTemplate from './event-form.template';
import { createElement } from '../render';

export default class EventFormView {

  getTemplate() {
    return createEventFormTemplate();
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
