import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { DateFormat } from '../const';

/**
 * Функция приведения строки даты в заданный вид
 * @param {string} date
 * @param {string} dateFormat
 * @return {string}
 */
export function humanizeDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

/**
 * Функция расчета продолжительности
 * @param {string} start
 * @param {string} finish
 * @return {string}
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
 * Функция установки первой буквы строки в верхний регистр
 * @param {string} word
 * @return {string}
 */
export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Функция поиска элемента массива по ключу идентификатора
 * @param {string} id
 * @param {Array} array
 * @return {any}
 */
export function getById(id, array) {
  return array.find((item) => item.id === id);
}

/**
 * Функция поиска заданных предложений
 * @param {Array} idsArray
 * @param {Array} offersArray
 * @return {Array}
 */
export function getOffers(idsArray, offersArray) {
  const offersArr = [];
  idsArray.forEach((item) => (
    item && offersArr.push(getById(item, offersArray))
  ));
  return offersArr;
}

/**
 * Функция поиска элемента массива по значению заданного ключа
 * @param {string} key
 * @param {string} value
 * @param {Array} array
 * @return {any}
 */
export function getByKey(key, value, array) {
  return array.find((item) => item[key] === value);
}

/**
 * Функция изменения заданных элементов массива
 * @param {Array} items
 * @param {AbstractView} update
 * @return {Array}
 */
export function updateItemById(items, updatedItem) {
  return items.map((item) => item.id === updatedItem.id ? updatedItem : item);
}

/**
 * Функция удаления заданного количества префиксов из строки
 * @param {string} trimmedString
 * @param {number} trimmingPartsCount
 * @return {string}
 */
export function trimPrefixFromString(trimmedString, trimmingPartsCount = 2) {
  const reg = `([a-z]*-){${trimmingPartsCount}}`;
  const trimmingPart = new RegExp(reg);
  return trimmedString.replace(trimmingPart, '');
}

/**
 * Функция устранения "дребезга"
 * @param {debouncedFunction} callback
 * @param {number} timeoutDelay
 * @return {debouncedFunction}
 */
export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
