import dayjs from 'dayjs';

export const DATE_FORMAT = {
  pointTime: 'HH:mm',
  pointDurationHours: 'HH',
  pointDurationMinutes: 'mm',
  pointDay: 'MMM DD',
  dateTime: 'DD/MM/YY HH:mm'
};

export function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

export const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * @param {string} id
 * @param {object[]} array
 */
export function getById(id, array) {
  return array.find((item) => item.id === id);
}

export function getOffers(idsArray, offersArray) {
  const offersArr = [];
  idsArray.forEach((item) => (
    item && offersArr.push(getById(item, offersArray))
  ));
  return offersArr;
}

export function getByKey(key, value, array) {
  return array.find((item) => item[key] === value);
}
