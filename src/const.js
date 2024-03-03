export const DateFormat = {
  POINT_TIME: 'HH:mm',
  POINT_DAY: 'MMM DD',
  DURATION_DAYS: 'DD[D] HH[H] mm[M]',
  DURATION_HOURS: 'HH[H] mm[M]',
  DURATION_MINUTES: 'mm[M]',
  DATE_TIME: 'DD/MM/YY HH:mm',
  FLATPICKR: 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]',
  MAIN_INFO_DURATION: 'DD MMM'
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price'
};
