import createFormTemplate from './form.template';
import AbstractView from '../framework/view/abstract-view';


export default class FormView extends AbstractView {

  constructor({ event, offers, destinations }) {
    super();
    this.event = event;
    this.offers = offers;
    this.destinations = destinations;
  }

  get template() {
    return createFormTemplate({ event: this.event, offers: this.offers, destinations: this.destinations });
  }
}
