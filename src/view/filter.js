import createFilterTemplate from './filter.template';
import { createElement } from '../render';

export default class FilterView {

  constructor(filters) {
    this.filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this.filters);
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
