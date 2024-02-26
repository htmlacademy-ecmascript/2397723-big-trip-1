import createTripMainTemplate from './trip-main.template';
import AbstractView from '../framework/view/abstract-view';

export default class FilterView extends AbstractView {

  get template() {
    return createTripMainTemplate();
  }
}
