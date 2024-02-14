import { UpdateType } from '../const';
import Observable from '../framework/observable';
import { getById, getByKey } from '../utils';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor({ offersApiService }) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offers = offers;
    } catch (err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  }

  getEventsOffers({type, ids}) {
    const currentOffers = getByKey('type', type, this.#offers);
    const eventsOffers = [];
    ids.forEach((item) => (
      item && eventsOffers.push(getById(item, currentOffers.offers))
    ));
    return eventsOffers;
  }
}
