import { render } from '../framework/render';
import SortView from '../view/sort';
import EventsBoardView from '../view/events-board';
import EventPresenter from './event';
import EmptyEventsListView from '../view/empty-events-list';
import { updateItem } from '../utils';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #events = [];
  #offers = [];
  #destinations = [];

  #eventPresenters = new Map();

  #eventsBoard = new EventsBoardView();

  constructor({ tripEventsContainer, eventsModel, offersModel, destinationsModel }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];

    if (this.#events && this.#events.length > 0) {
      render(new SortView(), this.#tripEventsContainer);
      render(this.#eventsBoard, this.#tripEventsContainer);
      this.#events.forEach((event) => this.#renderEvent(event));
    } else {
      render(new EmptyEventsListView('Everything'), this.#tripEventsContainer);
    }
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      offers: this.#offers,
      destinations: this.#destinations,
      eventsBoard: this.#eventsBoard.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }
}
