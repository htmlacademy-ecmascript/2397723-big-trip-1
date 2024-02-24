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
    const destinations = await this.#service.getDestinations();
    this.#destinations = destinations;
  }
}
