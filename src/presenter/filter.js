import FilterView from '../view/filter';
import { render } from '../framework/render';
export default class FilterPresenter {
  #component = new FilterView();
  #container = null;

  constructor({container}) {
    this.#container = container;
  }

  init() {
    render(this.#component, this.#container);
  }
}
