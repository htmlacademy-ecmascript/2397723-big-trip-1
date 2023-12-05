import FilterView from '../view/filter';
import { render } from '../framework/render';
export default class FilterPresenter {
  сomponent = new FilterView();

  constructor({сontainer}) {
    this.сontainer = сontainer;
  }

  init() {
    render(this.сomponent, this.сontainer);
  }
}
