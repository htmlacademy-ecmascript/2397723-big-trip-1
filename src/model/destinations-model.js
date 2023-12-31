import destinations from '../mock/destinations.json';
import { getByKey } from '../utils';

export default class DestinationsModel {
  #destinations = destinations;

  get destinations() {
    return this.#destinations;
  }

  getEventsDestination(id) {
    const eventsDestination = getByKey('id', id, this.#destinations);
    return eventsDestination;
  }
}
