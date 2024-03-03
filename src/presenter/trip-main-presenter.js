import { remove, render, RenderPosition, replace } from '../framework/render';
import { getTripTitle, getTripDuration, getTripCost } from '../utils/trip-main-info-utils';
import TripMainView from '../view/trip-main-info';

export default class TripMainPresenter {
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

  get events() {
    return this.#eventsModel.events;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }


  init() {
    this.#renderTripMain();
    this.#eventsModel.addObserver(this.#eventsModelHandler);
  }

  #calculateParams() {
    this.#title = getTripTitle(this.events, this.destinations);
    this.#duration = getTripDuration(this.events);
    this.#cost = getTripCost(this.events, this.offers);
  }

  #renderTripMain = () => {
    const prevTripMainComponent = this.#tripMainComponent;
    this.#calculateParams();

    this.#tripMainComponent = new TripMainView({
      title: this.#title,
      duration: this.#duration,
      cost: this.#cost,
      isEmpty: this.#isEmpty
    });

    if (prevTripMainComponent === null) {
      render(this.#tripMainComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#tripMainComponent, prevTripMainComponent);
    remove(prevTripMainComponent);
  };

  #eventsModelHandler = () => {
    this.#renderTripMain();
  };
}
