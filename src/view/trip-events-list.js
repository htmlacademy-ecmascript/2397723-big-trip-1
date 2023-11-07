import createEventsListTemplate from './trip-events-list.template';
import { createElement } from '../render';

export default class EventsListView {

  getTemplate() {
    return createEventsListTemplate();
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
