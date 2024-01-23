import createFormTemplate from './form.template';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getByKey, trimPrefixFromIdString } from '../utils';
import 'flatpickr/dist/flatpickr.min.css';
import { humanizeDate, DateFormat } from '../utils';

import flatpickr from 'flatpickr';

const datePickerDefaultOptions = {
  dateFormat: 'd/m/y H:i',
  enableTime: true,
  locale: {
    firstDayOfWeek: 1,
  },
  'time_24hr': true,
};

const initialState = {
  id: '0',
  type: 'taxi',
  dateFrom: '',
  dateTo: '',
  destination: '',
  basePrice: '',
  isFavorite: false,
  offers: []
};

export default class FormView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #handlerResetClick = null;
  #datePickerFrom = null;
  #datePickerTo = null;

  #initialState = initialState;
  #isEditForm;

  constructor({ event, offers, destinations, isEditForm = true, onFormSubmit, onFormClose, onResetClick }) {
    super();
    if (isEditForm) {
      this._setState(event);
    } else {
      this._setState(this.#initialState);
    }
    this.#offers = offers;
    this.#destinations = destinations;
    this.#isEditForm = isEditForm;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#handlerResetClick = onResetClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    if (this.#isEditForm) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#formCloseHandler);
    }
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#changePriceHandler);
    this.element.querySelectorAll('.event__type-input')
      .forEach((type) => type.addEventListener('change', this.#changeTypeHandler));
    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((type) => type.addEventListener('click', this.#changeOfferHandler));
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#resetClickHandler);
    this.#setDatepickers();
  }

  get template() {
    return createFormTemplate({
      event: this._state,
      offers: this.#offers,
      destinations: this.#destinations,
      isEditForm: this.#isEditForm
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handlerResetClick(this._state);
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({ type: evt.target.value, offers: [] });
  };

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    const examDestinationName = !!this.#destinations.find((item) => item.name === evt.target.value);
    if (examDestinationName) {
      const newDestination = getByKey('name', evt.target.value, this.#destinations);
      this.updateElement({ destination: newDestination.id, offers: [] });
    }
  };

  #changePriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({ basePrice: evt.target.value });
  };

  #changeOfferHandler = () => {
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({ offers: checkedOffers.map((element) => trimPrefixFromIdString(element.id)) });
  };

  #changeDateFromHandler = ([userDate]) => {
    this._setState({ dateFrom: humanizeDate(userDate, DateFormat.FLATPICKR) });
    this.#datePickerTo.set('minDate', this._state.dateFrom);
  };

  #changeDateToHandler = ([userDate]) => {
    this._setState({ dateTo: humanizeDate(userDate, DateFormat.FLATPICKR) });
    this.#datePickerFrom.set('maxDate', this._state.dateTo);
  };

  #setDatepickers() {
    const [datePickerFrom, datePickerTo] = this.element.querySelectorAll('.event__input--time');

    this.#datePickerFrom = flatpickr(datePickerFrom, {
      ...datePickerDefaultOptions,
      defaultDate: this._state.dateFrom,
      maxDate: this._state.dateTo,
      onClose: this.#changeDateFromHandler
    });

    this.#datePickerTo = flatpickr(datePickerTo, {
      ...datePickerDefaultOptions,
      defaultDate: this._state.dateTo,
      minDate: this._state.dateFrom,
      onClose: this.#changeDateToHandler
    });
  }
}
