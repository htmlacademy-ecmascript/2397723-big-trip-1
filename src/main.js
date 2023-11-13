import FilterPresenter from './presenter/filter';
import TripEventsPresenter from './presenter/trip-events';
import EventModel from './model/event-model';

const headerFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const eventsModel = new EventModel();

const filterPresenter = new FilterPresenter({сontainer: headerFiltersElement});
const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer: tripEventsElement, eventsModel: eventsModel});

filterPresenter.init();
tripEventsPresenter.init();
