import FilterPresenter from './presenter/filter-presenter';
import TripEventsPresenter from './presenter/trip-events-presenter';
import EventsModel from './model/events-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import NewEventButtonView from './view/new-event-button';
import ErrorMessagePresenter from './presenter/error-message-presenter';
import { render } from './framework/render';
import DataApiService from './data-api-service';
import TripMainPresenter from './presenter/trip-main-presenter';

const AUTHORIZATION = 'Basic Om9C2nY5ply';
const ENDPOINT = 'https://20.objects.htmlacademy.pro/big-trip';

const headerFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripHeaderMainElement = document.querySelector('.trip-main');

const dataApiService = new DataApiService(ENDPOINT, AUTHORIZATION);

const eventsModel = new EventsModel(dataApiService);
const offersModel = new OffersModel(dataApiService);
const destinationsModel = new DestinationsModel(dataApiService);

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

const tripMainPresenter = new TripMainPresenter({
  eventsModel,
  offersModel,
  destinationsModel,
  tripMainContainer: tripHeaderMainElement
});

const errorMessagePresenter = new ErrorMessagePresenter({
  container: tripEventsElement,
  eventsModel,
  offersModel,
  destinationsModel
});

async function initModels() {
  await Promise.all([
    offersModel.init(),
    destinationsModel.init(),
  ]);
  await eventsModel.init();
}

initModels().then(() => {
  if (eventsModel.events.length > 0 && offersModel.offers.length > 0 && destinationsModel.destinations.length > 0) {
    render(newEventButtonComponent, tripHeaderMainElement);
    tripMainPresenter.init();
  }
});

errorMessagePresenter.init();
filterPresenter.init();
tripEventsPresenter.init();
