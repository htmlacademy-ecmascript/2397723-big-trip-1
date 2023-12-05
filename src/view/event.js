import createEventTemplate from './event.template';
import AbstractView from '../framework/view/abstract-view';

export default class EventView extends AbstractView {

  constructor({ event, offers, destination }) {
    super();
    this.event = event;
    this.offers = offers;
    this.destination = destination;
  }

  get template() {
    return createEventTemplate({
      event: this.event,
      offers: this.offers,
      destination: this.destination
    });
  }
}
