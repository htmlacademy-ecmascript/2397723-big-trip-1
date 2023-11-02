import FilterView from '../view/filter';
import { render } from '../render';

export default class FilterPresentner {
  filterComponent = new FilterView();


  constructor({filterContainer}) {
    this.filterContainer = filterContainer;
  }

  init() {
    render(this.filterComponent, this.filterContainer);
  }
}
