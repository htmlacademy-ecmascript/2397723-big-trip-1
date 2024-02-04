import { RenderPosition, remove, render } from '../framework/render';
import EventsBoardView from '../view/events-board';
import EventPresenter from './event';
import EmptyEventsListView from '../view/empty-events-list';
import SortPresenter from './sort';
import { sortDateDown, sortTimeUp, sortPriceUp, filter } from '../utils';
import { UserAction, UpdateType, FilterType } from '../const';
import NewEventPresenter from './new-event-presenter';

const Sort = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};
export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #eventModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #offers = [];
  #destinations = [];

  #eventPresenters = new Map();

  #sortPresenter = null;
  #newEventPresenter = null;

  #currentSortType = Sort.DAY;
  #filterType = FilterType.EVERYTHING;

  #eventsBoard = new EventsBoardView();
  #emptyEventsListView = null;

  #onNewEventDestroy = null;

  constructor({ tripEventsContainer, eventModel, offersModel, destinationsModel, filterModel, onNewEventDestroy }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#eventModel = eventModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#onNewEventDestroy = () => {
      if (this.events.length === 0) {
        this.#emptyEventsListView = new EmptyEventsListView(this.#filterType);
        render(this.#emptyEventsListView, this.#tripEventsContainer);
      }
      onNewEventDestroy();
    };

    this.#newEventPresenter = new NewEventPresenter({
      newEventFormContainer: this.#eventsBoard.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewEventDestroy
    });

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case Sort.DAY:
        return filteredEvents.sort(sortDateDown);
      case Sort.TIME:
        return filteredEvents.sort(sortTimeUp);
      case Sort.PRICE:
        return filteredEvents.sort(sortPriceUp);
    }
    return filteredEvents;
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
      this.#emptyEventsListView = new EmptyEventsListView(this.#filterType);
      render(this.#emptyEventsListView, this.#tripEventsContainer);
    }
  }

  createEvent() {
    this.#currentSortType = Sort.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    if (this.#emptyEventsListView) {
      remove(this.#emptyEventsListView);
      render(this.#eventsBoard, this.#tripEventsContainer);
    }
    this.#newEventPresenter.init();
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      currentSortType: this.#currentSortType,
      boardComponent: this.#tripEventsContainer,
      onSortOptionChange: this.#handleSortOptionChange
    });
    this.#sortPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList({ resetSortType: false });
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsList({ resetSortType: true });
        this.#renderEvents();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortOptionChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEventsList({ resetSortType: false });
    this.#renderEvents();
  };

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      offers: this.#offers,
      destinations: this.#destinations,
      eventsBoard: this.#eventsBoard,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents() {
    if (this.#emptyEventsListView) {
      remove(this.#emptyEventsListView);
    }
    if (this.events.length === 0) {
      if (this.#sortPresenter) {
        this.#sortPresenter.destroy();
      }
      this.#emptyEventsListView = new EmptyEventsListView(this.#filterType);
      render(this.#emptyEventsListView, this.#tripEventsContainer);
    }
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #clearEventsList({ resetSortType }) {
    if (resetSortType) {
      this.#currentSortType = Sort.DAY;
      if (this.#sortPresenter) {
        this.#sortPresenter.destroy();
        this.#sortPresenter.init();
      }
    }
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
  }
}
