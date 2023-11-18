import createSortTemplate from './sort.template';
import { createElement } from '../render';

const SORT_OPTIONS = [
  {
    name: 'day',
    isDisable: false,
    isChecked: true
  },
  {
    name: 'event',
    isDisable: true,
    isChecked: false
  },
  {
    name: 'time',
    isDisable: false,
    isChecked: false
  },
  {
    name: 'price',
    isDisable: false,
    isChecked: false
  },
  {
    name: 'offer',
    isDisable: true,
    isChecked: false
  },
];
export default class SortView {

  getTemplate() {
    return createSortTemplate(SORT_OPTIONS);
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
