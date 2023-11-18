import { render, RenderPosition } from '../render';
import SortView from '../view/sort';
import EventsView from '../view/event';
import AddFormView from '../view/add-form';
import EditFormView from '../view/edit-form';

export default class TripEventsPresenter {

  constructor({ tripEventsContainer, eventsModel }) {
    this.tripEventsContainer = tripEventsContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    this.offers = [...this.eventsModel.getOffers()];
    this.destinations = [...this.eventsModel.getDestinations()];
    this.eventsList = new EventsView(this.events, this.offers, this.destinations);

    render(new SortView(), this.tripEventsContainer);
    render(this.eventsList, this.tripEventsContainer);
    render(new EditFormView(this.events[1], this.offers, this.destinations), this.eventsList.getElement(), RenderPosition.AFTERBEGIN);
    render(new AddFormView(this.offers, this.destinations), this.eventsList.getElement(), RenderPosition.AFTERBEGIN);
  }
}
