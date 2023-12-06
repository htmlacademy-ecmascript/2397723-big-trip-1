import { render, replace } from '../framework/render';
import SortView from '../view/sort';
import EventView from '../view/event';
import EventsBoardView from '../view/events-board';
import FormView from '../view/form';
import EmptyEventsListView from '../view/empty-events-list';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #events = [];
  #offers = [];
  #destinations = [];

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
      for (const event of this.#events) {
        this.#renderEvent({ event: event, offers: this.#offers, destinations: this.#destinations });
      }
      // TODO render(new FormView({ offers: this.#offers, destinations: this.#destinations }), this.eventsBoard.element, RenderPosition.AFTERBEGIN);
    } else {
      render(new EmptyEventsListView('Everything'), this.#tripEventsContainer);
    }
  }

  #renderEvent({ event, offers, destinations }) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEventToForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      event: event,
      offers: this.#offersModel.getEventsOffers({
        type: event.type,
        ids: event.offers
      }),
      destination: this.#destinationsModel.getEventsDestination(event.destination),
      onEditClick: () => {
        replaceFormToEvent();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new FormView({
      event,
      offers,
      destinations,
      onFormSubmit: () => {
        console.log('save');
      },
      onFormClose: () => {
        replaceEventToForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceFormToEvent() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceEventToForm() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#eventsBoard.element);
  }
}
