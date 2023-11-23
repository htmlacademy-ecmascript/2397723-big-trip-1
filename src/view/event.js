import createEventTemplate from './event.template';
import { createElement } from '../render';

export default class EventView {

  constructor({ event, offers, destination }) {
    this.event = event;
    this.offers = offers;
    this.destination = destination;
  }

  getTemplate() {
    return createEventTemplate({
      event: this.event,
      offers: this.offers,
      destination: this.destination
    });
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
