import createTripMainTemplate from './trip-main-info.template';
import AbstractView from '../framework/view/abstract-view';

export default class TripMainView extends AbstractView {
  #title = '';
  #duration = '';
  #cost = '';
  #isEmpty = true;

  constructor({ title, duration, cost, isEmpty }) {
    super();
    this.#title = title;
    this.#duration = duration;
    this.#cost = cost;
    this.#isEmpty = isEmpty;
  }

  get template() {
    return createTripMainTemplate({
      title: this.#title,
      duration: this.#duration,
      cost: this.#cost,
      isEmpty: this.#isEmpty
    });
  }
}
