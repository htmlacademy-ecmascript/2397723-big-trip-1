import createEmptyEventsListTemplate from './empty-events-list.template';
import AbstractView from '../framework/view/abstract-view';

export default class EmptyEventsListView extends AbstractView {

  constructor(filter) {
    super();
    this.filter = filter;
  }

  get template() {
    return createEmptyEventsListTemplate(this.filter);
  }
}
