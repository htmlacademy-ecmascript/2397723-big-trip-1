import { FilterType } from './const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const DateFormat = {
  POINT_TIME: 'HH:mm',
  POINT_DAY: 'MMM DD',
  DURATION_DAYS: 'DD[D] HH[H] mm[M]',
  DURATION_HOURS: 'HH[H] mm[M]',
  DURATION_MINUTES: 'mm[M]',
  DATE_TIME: 'DD/MM/YY HH:mm',
  FLATPICKR: 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
};

/**
 * @param {string} dueDate
 * @param {string} dateFormat
 */
export function humanizeDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

/**
 * @param {string} start
 * @param {string} finish
 */
export function calculateDuration(start, finish) {
  const startDate = dayjs(start);
  const finishDate = dayjs(finish);
  const eventDuration = dayjs.duration(finishDate.diff(startDate));
  if (eventDuration.days() === 0 && eventDuration.hours() === 0) {
    return eventDuration.format(DateFormat.DURATION_MINUTES);
  }
  if (eventDuration.days() === 0) {
    return eventDuration.format(DateFormat.DURATION_HOURS);
  }
  return eventDuration.format(DateFormat.DURATION_DAYS);
}

/**
 * @param {string} word
 */
export const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * @param {string} id
 * @param {Array} array
 */
export function getById(id, array) {
  return array.find((item) => item.id === id);
}

/**
 * @param {Array} idsArray
 * @param {Array} offersArray
 */
export function getOffers(idsArray, offersArray) {
  const offersArr = [];
  idsArray.forEach((item) => (
    item && offersArr.push(getById(item, offersArray))
  ));
  return offersArr;
}

/**
 * @param {string} key
 * @param {string} value
 * @param {Array} array
 */
export function getByKey(key, value, array) {
  return array.find((item) => item[key] === value);
}

/**
 * @param {Array} items
 * @param {AbstractView} update
 */
export function updateItemById(items, updatedItem) {
  return items.map((item) => item.id === updatedItem.id ? updatedItem : item);
}

/**
 * @param {Object} eventA
 * @param {Object} eventB
 */
export function sortDateDown(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

/**
 * @param {Object} eventA
 * @param {Object} eventB
 */
export function sortTimeUp(eventA, eventB) {
  const durationA = dayjs.duration(dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom)));
  const durationB = dayjs.duration(dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom)));
  return durationB - durationA;
}

/**
 * @param {Object} eventA
 * @param {Object} eventB
 */
export function sortPriceUp(eventA, eventB) {
  const priceA = eventA.basePrice;
  const priceB = eventB.basePrice;
  return priceB - priceA;
}

/**
 * @param {string} idString
 * @param {number} trimmingPartsCount
 */
export function trimPrefixFromIdString(idString, trimmingPartsCount = 2) {
  const reg = `([a-z]*-){${trimmingPartsCount}}`;
  const trimmingPart = new RegExp(reg);
  return idString.replace(trimmingPart, '');
}

function isEventAfter(date) {
  return date && dayjs(date).isAfter(dayjs(), 'D');
}

function isEventToday(date) {
  return date && dayjs(date).isSame(dayjs(), 'D');
}

function isEventBefore(date) {
  return date && dayjs(date).isBefore(dayjs(), 'D');
}

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventAfter(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventToday(event.dateFrom)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventBefore(event.dateTo)),
};
