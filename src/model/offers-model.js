import { UpdateType } from '../const';
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
    try {
      const offers = await this.#service.getOffers();
      this.#offers = offers;
    } catch (error) {
      this._notify(UpdateType.ERR, { error: 'Can\'t get offers' });
    }
  }
}
