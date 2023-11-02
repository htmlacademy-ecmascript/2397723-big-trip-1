import createEventFormDetailsTemplate from './event-form-details.template';
import { createElement } from '../render';

export default class EventFormDetailsView {

  getTemplate() {
    return createEventFormDetailsTemplate();
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
