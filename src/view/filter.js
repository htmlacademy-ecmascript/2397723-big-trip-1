import createFilterTemplate from './filter.template';
import AbstractView from '../framework/view/abstract-view';


const FILTERS = [
  {
    name: 'everything',
    isChecked: false
  },
  {
    name: 'future',
    isChecked: false
  },
  {
    name: 'present',
    isChecked: false
  },
  {
    name: 'past',
    isChecked: true
  },
];

export default class FilterView extends AbstractView {

  get template() {
    return createFilterTemplate(FILTERS);
  }
}
