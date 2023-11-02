import createEventFormDestinationTemplate from './event-form-destination.template';
import { createElement } from '../render';

export default class EventFormDestinationView {

  getTemplate() {
    return createEventFormDestinationTemplate();
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
