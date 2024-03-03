import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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
