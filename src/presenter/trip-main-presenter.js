import { render, RenderPosition } from '../framework/render';
import TripMainView from '../view/trip-main';

export default class TripMainPresenter {
  #events = [];
  #offers = [];
  #destinations = [];

  #eventsModel = [];
  #offersModel = [];
  #destinationsModel = [];
  #tripMainContainer = null;
  #tripMainComponent = null;

  #title = '';
  #duration = '';
  #cost = '';
  #isEmpty = false;

  constructor({ eventsModel, offersModel, destinationsModel, tripMainContainer }) {
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#tripMainContainer = tripMainContainer;
  }


  init() {

    this.#isEmpty = false;
    this.#calculateTitle();
    this.#calculateDuration();
    this.#calculateCost();
    this.#renderTripMain();
  }

  #calculateDuration() {
    this.#duration = 'Too much';
  }

  #calculateCost() {
    this.#cost = 444;
  }

  #calculateTitle() {
    this.#title = 'Bla-bla';
  }

  #renderTripMain() {
    this.#tripMainComponent = new TripMainView({
      title: this.#title,
      duration: this.#duration,
      cost: this.#cost,
      isEmpty: this.#isEmpty
    });

    render(this.#tripMainComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }
}
