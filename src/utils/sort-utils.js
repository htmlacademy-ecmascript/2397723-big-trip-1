import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

/**
 * Функция сотрировки от самой ранней даты до самой поздней
 * @param {Object} eventA
 * @param {Object} eventB
 * @return {number}
 */
export function sortDateDown(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

/**
 * Функция сортировки по убыванию продолжительности
 * @param {Object} eventA
 * @param {Object} eventB
 * @return {number}
 */
export function sortTimeUp(eventA, eventB) {
  const durationA = dayjs.duration(dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom)));
  const durationB = dayjs.duration(dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom)));
  return durationB - durationA;
}

/**
 * Функция сортироваки по убыванию цены
 * @param {Object} eventA
 * @param {Object} eventB
 * @return {number}
 */
export function sortPriceUp(eventA, eventB) {
  const priceA = eventA.basePrice;
  const priceB = eventB.basePrice;
  return priceB - priceA;
}
