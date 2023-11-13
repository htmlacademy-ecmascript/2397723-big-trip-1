import createSortTemplate from './sort.template';
import { createElement } from '../render';

export default class SortView {

  constructor(sortOptions) {
    this.sortOptions = sortOptions;
  }

  getTemplate() {
    return createSortTemplate(this.sortOptions);
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
