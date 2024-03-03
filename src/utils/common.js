import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { DateFormat } from '../const';

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
 * @param {string} trimmedString
 * @param {number} trimmingPartsCount
 */
export function trimPrefixFromString(trimmedString, trimmingPartsCount = 2) {
  const reg = `([a-z]*-){${trimmingPartsCount}}`;
  const trimmingPart = new RegExp(reg);
  return trimmedString.replace(trimmingPart, '');
}
