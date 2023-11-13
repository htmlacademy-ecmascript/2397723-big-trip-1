import createEventTemplate from './event.template';
import { createElement } from '../render';

export default class EventsView {

  constructor(events, offers, destinations) {
    this.events = events;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEventTemplate(this.events, this.offers, this.destinations);
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
