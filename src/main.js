import FilterPresenter from './presenter/filter';
import TripEventsPresenter from './presenter/trip-events';
import EventsModel from './model/events-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model.js';
import NewEventButtonView from './view/new-event-button.js';
import { render } from './framework/render.js';
import DataApiService from './eventsApiService.js';
import OffersApiService from './offersApiService.js';
import DestinationsApiService from './destinationsApiService.js';

const AUTHORIZATION = 'Basic Om9C2nY5ply';
const ENDPOINT = 'https://20.objects.htmlacademy.pro/big-trip';

const headerFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripHeaderMainElement = document.querySelector('.trip-main');

const eventsModel = new EventsModel({
  eventsApiService: new DataApiService(ENDPOINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(ENDPOINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(ENDPOINT, AUTHORIZATION)
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

offersModel.init();
destinationsModel.init();
eventsModel.init();
filterPresenter.init();
tripEventsPresenter.init();
render(newEventButtonComponent, tripHeaderMainElement);
