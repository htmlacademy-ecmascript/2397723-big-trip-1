import dayjs from 'dayjs';
import { sortDateDown } from './sort-utils';
import { DateFormat } from '../const';

/**
 * @const {number} Количество мест назначения, свыше которого отображаться будут только первый и последний
 */
const DESTINATIONS_ITEMS_AMOUNT = 3;

/**
 * Функция расчета и генерации строки с общей продолжительности путешествия
 * @param {Array} events
 * @return {string}
 */
export function getTripDuration(events = []) {
  const sortedEvents = events.sort(sortDateDown);
  if (sortedEvents.length <= 0) {
    return '';
  }

  const startDate = dayjs(sortedEvents.at(0).dateFrom).format(DateFormat.MAIN_INFO_DURATION);
  const endDate = dayjs(sortedEvents.at(-1).dateTo).format(DateFormat.MAIN_INFO_DURATION);
  return `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
}

/**
 * Функция генерации строки с маршрутом путешествия
 * @param {Array} events
 * @param {Array} destinations
 * @return {string}
 */
export function getTripTitle(events = [], destinations = []) {
  const destinationsNames = events.sort(sortDateDown)
    .map((event) => destinations.find((destination) => destination.id === event.destination).name);

  if (destinationsNames.length <= DESTINATIONS_ITEMS_AMOUNT) {
    return destinationsNames.join('&nbsp;&mdash;&nbsp;');
  }
  return `${destinationsNames.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationsNames.at(-1)}`;
}

/**
 * Функция расчета стоимости активных предложений
 * @param {Array} eventOffersIds
 * @param {Array} offers
 * @returns {number}
 */
function getOffersCost(eventOffersIds = [], offers = []) {
  return eventOffersIds.reduce(
    (result, id) => result + (offers.find((offer) => offer.id === id)?.price ?? 0),
    0
  );
}

/**
 * Функция расчета общей стоимости путушествия
 * @param {Array} events
 * @param {Array} offers
 * @returns {number}
 */
export function getTripCost(events = [], offers = []) {
  return events.reduce(
    (result, event) => result + Number(event.basePrice) + getOffersCost(event.offers, offers.find((offer) => event.type === offer.type)?.offers),
    0
  );
}
