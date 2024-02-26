import { render, RenderPosition } from '../framework/render';
import TripMainView from '../view/trip-main';

export default class TripMainPresenter {
  #events = [];
  #offers = [];
  #destinations = [];
  #tripMainContainer = null;
  #tripMainComponent = null;

  constructor({ events, offers, destinations, tripMainContainer }) {
    this.#events = events;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#tripMainContainer = tripMainContainer;
  }


  init() {
    this.#renderTripMain();
  }

  #renderTripMain() {
    this.#tripMainComponent = new TripMainView();

    render(this.#tripMainComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }
}
