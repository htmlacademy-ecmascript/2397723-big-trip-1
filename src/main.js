import FilterPresenter from './presenter/filter';
import TripEventsPresenter from './presenter/trip-events';

const headerFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const filterPresenter = new FilterPresenter({filterContainer: headerFiltersElement});
const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer: tripEventsElement});

filterPresenter.init();
tripEventsPresenter.initSort();
tripEventsPresenter.initEventsList();
tripEventsPresenter.initAddForm();
tripEventsPresenter.initEditForm();
tripEventsPresenter.initTripPoints();

