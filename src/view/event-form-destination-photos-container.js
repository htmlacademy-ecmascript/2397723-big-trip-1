import createEventFormDestinationPhotosContainerTemplate from './event-form-destination-photos-container.template';
import { createElement } from '../render';

export default class EventFormDestinationPhotosContainerView {

  getTemplate() {
    return createEventFormDestinationPhotosContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
