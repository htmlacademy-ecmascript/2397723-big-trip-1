import dayjs from 'dayjs';

export const DATE_FORMAT = {
  pointTime: 'HH:mm',
  pointDurationHours: 'HH',
  pointDurationMinutes: 'mm',
  pointDay: 'MMM DD',
  dateTime: 'DD/MM/YY HH:mm',
  subtractDate: 'HH[H] mm[M]'
};

/**
 * @param {string} dueDate
 * @param {string} dateFormat
 */
export function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
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

export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}
