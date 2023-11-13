import FilterView from '../view/filter';
import { FILTERS } from '../const';
import { render } from '../render';
export default class FilterPresenter {
  сomponent = new FilterView(FILTERS);

  constructor({сontainer}) {
    this.сontainer = сontainer;
  }

  init() {
    render(this.сomponent, this.сontainer);
  }
}
