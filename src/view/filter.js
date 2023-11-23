import createFilterTemplate from './filter.template';
import { createElement } from '../render';

const FILTERS = [
  {
    name: 'everything',
    isChecked: false
  },
  {
    name: 'future',
    isChecked: false
  },
  {
    name: 'present',
    isChecked: false
  },
  {
    name: 'past',
    isChecked: true
  },
];

export default class FilterView {

  getTemplate() {
    return createFilterTemplate(FILTERS);
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
