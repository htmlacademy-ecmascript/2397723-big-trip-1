import { render } from '../framework/render';
import SortView from '../view/sort';

export default class SortPresenter {
  #boardComponent = null;
  #handlerSortOptionChange = null;

  constructor({ boardComponent, onSortOptionChange }) {
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
    const sortComponent = new SortView({ onSortClick: this.#sortClick});
    render(sortComponent, this.#boardComponent.element);
  }
}
