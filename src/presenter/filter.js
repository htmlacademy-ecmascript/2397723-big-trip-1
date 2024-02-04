import FilterView from '../view/filter';
import { render, remove, replace } from '../framework/render';
import { UpdateType, FilterType } from '../const';

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
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#component, this.#container);
      return;
    }

    replace(this.#component, prevFilterComponent);
    remove(prevFilterComponent);
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
