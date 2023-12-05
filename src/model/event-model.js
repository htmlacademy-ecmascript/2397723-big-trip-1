import events from '../mock/points.json';

export default class EventModel {
  #events = events;

  get events() {
    return this.#events;
  }
}
