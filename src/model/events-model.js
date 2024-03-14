import { UpdateType } from '../const';
import Observable from '../framework/observable';
export default class EventsModel extends Observable {
  #service = null;
  #events = [];

  constructor(service) {
    super();
    this.#service = service;
  }

  get events() {
    return this.#events;
  }

  async init() {
    try {
      const events = await this.#service.getEvents();
      this.#events = events.map(this.#adaptToClient);
      this._notify(UpdateType.INIT, { isError: false });
    } catch (error) {
      this.#events = [];
      this._notify(UpdateType.ERR, { error: 'Something wrong' });
    }
  }

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#service.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        update,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, updatedEvent);
    } catch (error) {
      this._notify(UpdateType.ERR, { error: 'Can\'t update task', refreshBoard: false });
      throw new Error('Can\'t update task');
    }
  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#service.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [
        newEvent,
        ...this.#events,
      ];
      this._notify(updateType, newEvent);
    } catch (error) {
      this._notify(UpdateType.ERR, { error: 'Can\'t add task', refreshBoard: false });
      throw new Error('Can\'t add task');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }
    try {
      await this.#service.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (error) {
      this._notify(UpdateType.ERR, { error: 'Can\'t delete task', refreshBoard: false });
      throw new Error('Can\'t delete task');
    }
  }

  #adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'],
      dateTo: event['date_to'],
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
