import dayjs from 'dayjs';
import { sortDateDown } from '../utils';

const DESTINATIONS_ITEMS_AMOUNT = 3;

export function getTripDuration(events = []) {
  const sortedEvents = events.sort(sortDateDown);
  const duration = `${dayjs(sortedEvents.at(0).dateFrom).format('DD MMM')}&nbsp;&mdash;&nbsp;${dayjs(sortedEvents.at(-1).dateTo).format('DD MMM')}`;
  if (sortedEvents.length > 0) {
    return duration;
  }
  return '';
}

export function getTripTitle(events = [], destinations = []) {
  const destinationsNames = events.sort(sortDateDown)
    .map((event) => destinations.find((destination) => destination.id === event.destination).name);

  if (destinationsNames.length <= DESTINATIONS_ITEMS_AMOUNT) {
    return destinationsNames.join('&nbsp;&mdash;&nbsp;');
  }
  return `${destinationsNames.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationsNames.at(-1)}`;
}

function getOffersCost(eventOffersIds = [], offers = []) {
  const offersCost = eventOffersIds.reduce(
    (result, id) => result + (offers.find((offer) => offer.id === id)?.price ?? 0),
    0
  );
  return offersCost;
}

export function getTripCost(events = [], offers = []) {
  const tripCost = events.reduce(
    (result, event) => result + event.basePrice + getOffersCost(event.offers, offers.find((offer) => event.type === offer.type)?.offers),
    0
  );
  return tripCost;
}
