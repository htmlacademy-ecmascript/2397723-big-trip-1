import dayjs from 'dayjs';
import { FilterType } from '../const';

/**
 * Функция, отвечающая, является ли указанная дата прошедшей по отношению к текущей
 * @param {string} date
 * @return {boolean}
 */
function isEventAfter(date) {
  return date && dayjs(date).isAfter(dayjs(), 'D');
}

/**
 * Функция, отвечающая, совпадает ли указанная дата с текущей
 * @param {string} date
 * @return {boolean}
 */
function isEventToday(date) {
  return date && dayjs(date).isSame(dayjs(), 'D');
}

/**
 * Функция, отвечающая, является ли указанная дата будущей по отношению к текущей
 * @param {string} date
 * @return {boolean}
 */
function isEventBefore(date) {
  return date && dayjs(date).isBefore(dayjs(), 'D');
}

/**
 * @const {Object} Объект, объединяющий функции фильтрации
 */
export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventAfter(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventToday(event.dateFrom)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventBefore(event.dateTo)),
};
