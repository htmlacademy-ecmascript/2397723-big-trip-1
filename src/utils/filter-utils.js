import dayjs from 'dayjs';
import { FilterType } from '../const';

/**
 * @param {string} date
 */
function isEventAfter(date) {
  return date && dayjs(date).isAfter(dayjs(), 'D');
}

/**
 * @param {string} date
 */
function isEventToday(date) {
  return date && dayjs(date).isSame(dayjs(), 'D');
}

/**
 * @param {string} date
 */
function isEventBefore(date) {
  return date && dayjs(date).isBefore(dayjs(), 'D');
}

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventAfter(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventToday(event.dateFrom)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventBefore(event.dateTo)),
};
