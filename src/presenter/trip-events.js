import { render } from '../framework/render';
import EventsBoardView from '../view/events-board';
import EventPresenter from './event';
import EmptyEventsListView from '../view/empty-events-list';
import SortPresenter from './sort';
import { sortTimeUp, sortPriceUp } from '../utils';
import { UserAction, UpdateType } from '../const';

const Sort = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};
export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #offers = [];
  #destinations = [];

  #eventPresenters = new Map();

  #sortPresenter = null;
  #currentSortType = Sort.DAY;

  #eventsBoard = new EventsBoardView();

  constructor({ tripEventsContainer, eventsModel, offersModel, destinationsModel }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    switch (this.#currentSortType) {
      case Sort.TIME:
        return [...this.#eventsModel.events].sort(sortTimeUp);
      case Sort.PRICE:
        return [...this.#eventsModel.events].sort(sortPriceUp);
    }
    return this.#eventsModel.events;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];

    if (this.events && this.events.length > 0) {
      this.#renderSort();
      render(this.#eventsBoard, this.#tripEventsContainer);
      this.#renderEvents();
    } else {
      render(new EmptyEventsListView('Everything'), this.#tripEventsContainer);
    }
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      boardComponent: this.#eventsBoard,
      onSortOptionChange: this.#handleSortOptionChange
    });
    this.#sortPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortOptionChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderEvents();
  };

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      offers: this.#offers,
      destinations: this.#destinations,
      eventsBoard: this.#eventsBoard.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents() {
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
  }
}
