import FilterPresentner from './presenter/filter';
import TripEventsPresentner from './presenter/trip-events';

const headerFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');


const filterPresentner = new FilterPresentner({filterContainer: headerFiltersElement});
const tripEventsPresentner = new TripEventsPresentner({tripEventsContainer: tripEventsElement});

filterPresentner.init();
tripEventsPresentner.initSort();
tripEventsPresentner.initEventsList();
tripEventsPresentner.initAddForm();
tripEventsPresentner.initEditForm();
tripEventsPresentner.initTripPoints();

