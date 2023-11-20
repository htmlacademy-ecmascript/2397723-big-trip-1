import createEmptyEventsListTemplate from './empty-events-list.template';
import { createElement } from '../render';

export default class EmptyEventsListView {

  constructor(filter) {
    this.filter = filter;
  }

  getTemplate() {
    return createEmptyEventsListTemplate(this.filter);
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
