import createFilterTemplate from './filter-template';
import AbstractView from '../framework/view/abstract-view';

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #disabledFilters = [];
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, disabledFilters, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#disabledFilters = disabledFilters;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate({
      filters: this.#filters,
      currentFilterType: this.#currentFilter,
      disabledFilters: this.#disabledFilters});
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
