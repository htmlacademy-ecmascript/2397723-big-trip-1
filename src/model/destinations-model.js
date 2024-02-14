import { UpdateType } from '../const';
import Observable from '../framework/observable';
import { getByKey } from '../utils';

export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #destinations = [];

  constructor({ destinationsApiService }) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations;
    } catch (err) {
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  getEventsDestination(id) {
    const eventsDestination = getByKey('id', id, this.#destinations);
    return eventsDestination;
  }
}
