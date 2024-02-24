import Observable from '../framework/observable';

export default class OffersModel extends Observable {
  #service = null;
  #offers = [];

  constructor(service) {
    super();
    this.#service = service;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    const offers = await this.#service.getOffers();
    this.#offers = offers;
  }
}
