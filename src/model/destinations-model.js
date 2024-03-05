import { UpdateType } from '../const';
import Observable from '../framework/observable';

export default class DestinationsModel extends Observable {
  #service = null;
  #destinations = [];

  constructor(service) {
    super();
    this.#service = service;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const destinations = await this.#service.getDestinations();
      this.#destinations = destinations;
    } catch (error) {
      this._notify(UpdateType.ERR, { error: 'Can\'t get destinations' });
    }
  }
}
