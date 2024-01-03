import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const DATE_FORMAT = {
  pointTime: 'HH:mm',
  pointDay: 'MMM DD',
  duration: 'HH[H] mm[M]'
};

/**
 * @param {string} dueDate
 * @param {string} dateFormat
 */
export function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

/**
 * @param {string} start
 * @param {string} finish
 * @param {string} dateFormat
 */
export function calculateDuration(start, finish, dateFormat) {
  const startDate = dayjs(start);
  const finishDate = dayjs(finish);
  const eventDuration = dayjs.duration(finishDate.diff(startDate));
  return eventDuration.format(dateFormat);
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
export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

/**
 * @param {string} eventA
 * @param {string} eventB
 */
export function sortTimeUp(eventA, eventB) {
  const durationA = dayjs.duration(dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom)));
  const durationB = dayjs.duration(dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom)));
  return durationB - durationA;
}

/**
 * @param {string} eventA
 * @param {string} eventB
 */
export function sortPriceUp(eventA, eventB) {
  const priceA = eventA.basePrice;
  const priceB = eventB.basePrice;
  return priceB - priceA;
}
