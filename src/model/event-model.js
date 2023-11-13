import events from '../mock/points.json';
import offers from '../mock/offers.json';
import destinations from '../mock/destinations.json';

export default class EventModel {

  events = events;
  offers = offers;
  destinations = destinations;

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
