import Observable from '../framework/observable';
import destinations from '../mock/destinations.json';
import { getByKey } from '../utils';

export default class DestinationsModel extends Observable {
  #destinations = destinations;

  get destinations() {
    return this.#destinations;
  }

  getEventsDestination(id) {
    const eventsDestination = getByKey('id', id, this.#destinations);
    return eventsDestination;
  }
}
