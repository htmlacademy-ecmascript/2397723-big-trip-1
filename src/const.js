// Как правильно передавать эти константы? Тоже через модель или достаточно сразу импортировать в презентер, как это сейчас?

export const FILTERS = [
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

export const SORT_OPTIONS = [
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
