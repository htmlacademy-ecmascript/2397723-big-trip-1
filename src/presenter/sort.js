import { remove, render } from '../framework/render';
import SortView from '../view/sort';

export default class SortPresenter {
  #boardComponent = null;
  #sortComponent = null;
  #handlerSortOptionChange = null;
  #currentSortType;

  constructor({ currentSortType, boardComponent, onSortOptionChange }) {
    this.#currentSortType = currentSortType;
    this.#boardComponent = boardComponent;
    this.#handlerSortOptionChange = onSortOptionChange;
  }

  init() {
    this.#renderSort();
  }

  #sortClick = (sortType) => {
    this.#handlerSortOptionChange(sortType);
  };

  #renderSort () {
    this.#sortComponent = new SortView({ currentSortType: this.#currentSortType, onSortClick: this.#sortClick});
    render(this.#sortComponent, this.#boardComponent.element);
  }

  destroy() {
    remove(this.#sortComponent);
  }
}
