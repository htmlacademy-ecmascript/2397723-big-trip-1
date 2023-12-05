import createSortTemplate from './sort.template';
import AbstractView from '../framework/view/abstract-view';


const SORT_OPTIONS = [
  {
    name: 'day',
    isDisable: false,
    isChecked: true
  },
  {
    name: 'event',
    isDisable: true,
    isChecked: false
  },
  {
    name: 'time',
    isDisable: false,
    isChecked: false
  },
  {
    name: 'price',
    isDisable: false,
    isChecked: false
  },
  {
    name: 'offer',
    isDisable: true,
    isChecked: false
  },
];
export default class SortView extends AbstractView {

  get template() {
    return createSortTemplate(SORT_OPTIONS);
  }
}
