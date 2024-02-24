import FilterPresenter from './presenter/filter';
import TripEventsPresenter from './presenter/trip-events';
import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model.js';
import NewEventButtonView from './view/new-event-button.js';
import { render } from './framework/render.js';
import DataApiService from './dataApiService.js';

const AUTHORIZATION = 'Basic Om9C2nY5ply';
const ENDPOINT = 'https://20.objects.htmlacademy.pro/big-trip';

const headerFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripHeaderMainElement = document.querySelector('.trip-main');

const dataApiService = new DataApiService(ENDPOINT, AUTHORIZATION);

const offersModel = new OffersModel(dataApiService);
const destinationsModel = new DestinationsModel(dataApiService);
const eventsModel = new EventsModel({
  service: dataApiService,
  destinationsModel,
  offersModel
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  container: headerFiltersElement,
  filterModel,
  eventsModel
});

const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsElement,
  onNewEventDestroy: handleNewEventFormClose,
  eventsModel,
  offersModel,
  destinationsModel,
  filterModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventButtonClick() {
  tripEventsPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

filterPresenter.init();
tripEventsPresenter.init();
eventsModel.init()
  .finally(() => {
    render(newEventButtonComponent, tripHeaderMainElement);
  });
