import createEventsBoardTemplate from './events-board-template';
import AbstractView from '../framework/view/abstract-view';


export default class EventsBoardView extends AbstractView {
  get template() {
    return createEventsBoardTemplate();
  }
}
