import FilterView from '../view/filter';
import { render, remove, replace } from '../framework/render';
import { UpdateType, FilterType } from '../const';
import { filter } from '../utils/filter-utils';

export default class FilterPresenter {
  #component = null;
  #container = null;
  #filterModel = null;
  #eventsModel = null;

  constructor({container, filterModel, eventsModel}) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return Object.values(FilterType).map((type) => ({
      type,
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#component;

    this.#component = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      disabledFilters: this.#getDisabledFilters(),
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#component, this.#container);
      return;
    }

    replace(this.#component, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #getDisabledFilters() {
    const allFilters = Object.values(FilterType);
    const disabledFilters = [];
    allFilters.forEach((filterType) => {
      const filteredEvents = filter[filterType](this.#eventsModel.events);
      if (filteredEvents.length <= 0) {
        disabledFilters.push(filterType);
      }
    });
    return disabledFilters;
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
