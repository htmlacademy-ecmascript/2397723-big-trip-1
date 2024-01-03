import createSortTemplate from './sort.template';
import AbstractView from '../framework/view/abstract-view';

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
export default class SortView extends AbstractView {
  #sortOptions = SORT_OPTIONS;
  #handlerSortClick;

  constructor({ onSortClick }) {
    super();
    this.#handlerSortClick = onSortClick;
    this.element.querySelectorAll('.trip-sort__btn').forEach((elem) => elem.addEventListener('click', this.#sortClickHandler));
  }

  get template() {
    return createSortTemplate(this.#sortOptions);
  }

  #sortClickHandler = (evt) => {
    this.#handlerSortClick(evt.target.textContent.trim());
  };
}
