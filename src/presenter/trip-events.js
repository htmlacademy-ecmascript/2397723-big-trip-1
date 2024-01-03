import { render } from '../framework/render';
import EventsBoardView from '../view/events-board';
import EventPresenter from './event';
import EmptyEventsListView from '../view/empty-events-list';
import SortPresenter from './sort';
import { updateItem, sortTimeUp, sortPriceUp } from '../utils';

const SORT = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};
export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #events = [];
  #offers = [];
  #destinations = [];

  #eventPresenters = new Map();

  #sortComponent = null;
  #sourcedEvents = [];
  #currentSortType = SORT.DAY;

  #eventsBoard = new EventsBoardView();

  constructor({ tripEventsContainer, eventsModel, offersModel, destinationsModel }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#sourcedEvents = [...this.#eventsModel.events];
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];

    if (this.#events && this.#events.length > 0) {
      this.#renderSort();
      render(this.#eventsBoard, this.#tripEventsContainer);
      this.#renderEvents();
    } else {
      render(new EmptyEventsListView('Everything'), this.#tripEventsContainer);
    }
  }

  #renderSort() {
    this.#sortComponent = new SortPresenter({
      boardComponent: this.#eventsBoard,
      onSortOptionChange: this.#handleSortOptionChange
    });
    this.#sortComponent.init();
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#sourcedEvents = updateItem(this.#sourcedEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SORT.TIME:
        this.#events.sort(sortTimeUp);
        break;
      case SORT.PRICE:
        this.#events.sort(sortPriceUp);
        break;
      default:
        this.#events = this.#sourcedEvents;

    }
    this.#currentSortType = sortType;
  }

  #handleSortOptionChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderEvents();
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

  #renderEvents() {
    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
  }
}
