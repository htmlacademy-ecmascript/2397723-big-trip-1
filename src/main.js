import FilterPresenter from './presenter/filter';
import TripEventsPresenter from './presenter/trip-events';
import EventModel from './model/event-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model.js';


const headerFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const eventModel = new EventModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  container: headerFiltersElement,
  filterModel,
  eventModel
});
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsElement,
  eventModel,
  offersModel,
  destinationsModel,
  filterModel
});

filterPresenter.init();
tripEventsPresenter.init();
