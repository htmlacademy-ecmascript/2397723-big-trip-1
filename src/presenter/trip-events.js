import SortView from '../view/sort';

import EventItemView from '../view/trip-event-item';
import EventFormView from '../view/event-form';
import EventFormHeaderView from '../view//event-form-header';
import EventsListView from '../view/trip-events-list';

import EventFormSaveBtnView from '../view/event-form-save-btn';
import EventFormResetBtnView from '../view/event-form-reset-btn';
import EventFormOpenBtnView from '../view/event-form-open-btn';

import EventFormDetailsView from '../view/event-form-details';
import EventFormOffersListView from '../view/event-form-offers-list';
import EventFormAvalableOffersView from '../view/event-form-avalable-offers';
import EventFormOfferItemView from '../view/event-form-offer-item';
import EventFormDestinationView from '../view/event-form-destination';
import EventFormDestinationPhotosContainerView from '../view/event-form-destination-photos-container';

import EventPointView from '../view/event-point';


import { render } from '../render';

const ADD_OFFERS_COUNT = 3;
const EDIT_OFFERS_COUNT = 4;
const TRIP_POINTS_COUNT = 3;

export default class TripEventsPresentner {
  eventsListComponent = new EventsListView();

  /* Форма создания */
  addItemView = new EventItemView();
  addFormView = new EventFormView();
  addFormHeaderView = new EventFormHeaderView();
  addFormDetailsView = new EventFormDetailsView();
  addFormOffersList = new EventFormOffersListView();
  addFormAvalableOffersView = new EventFormAvalableOffersView();
  addFormDestinationView = new EventFormDestinationView();

  /* Форма редактирования */
  editItemView = new EventItemView();
  editFormView = new EventFormView();
  editFormHeaderView = new EventFormHeaderView();
  editFormDetailsView = new EventFormDetailsView();
  editFormOffersList = new EventFormOffersListView();
  editFormAvalableOffersView = new EventFormAvalableOffersView();
  editFormDestinationView = new EventFormDestinationView();


  constructor({ tripEventsContainer }) {
    this.tripEventsContainer = tripEventsContainer;
  }

  initSort() {
    render(new SortView(), this.tripEventsContainer);
  }

  initEventsList() {
    render(this.eventsListComponent, this.tripEventsContainer);
  }

  initAddForm() {
    render(this.addItemView, this.eventsListComponent.getElement());
    render(this.addFormView, this.addItemView.getElement());
    render(this.addFormHeaderView, this.addFormView.getElement());
    render(new EventFormSaveBtnView(), this.addFormHeaderView.getElement());
    render(new EventFormResetBtnView('Cancel'), this.addFormHeaderView.getElement());
    render(this.addFormDetailsView, this.addFormView.getElement());
    render(this.addFormOffersList, this.addFormDetailsView.getElement());
    render(this.addFormAvalableOffersView, this.addFormOffersList.getElement());

    for (let i = 0; i < ADD_OFFERS_COUNT; i++) {
      render(new EventFormOfferItemView(), this.addFormAvalableOffersView.getElement());
    }

    render(this.addFormDestinationView, this.addFormDetailsView.getElement());
    render(new EventFormDestinationPhotosContainerView(), this.addFormDestinationView.getElement());
  }

  initEditForm() {
    render(this.editItemView, this.eventsListComponent.getElement());
    render(this.editFormView, this.editItemView.getElement());
    render(this.editFormHeaderView, this.editFormView.getElement());
    render(new EventFormSaveBtnView(), this.editFormHeaderView.getElement());
    render(new EventFormResetBtnView('Delete'), this.editFormHeaderView.getElement());
    render(new EventFormOpenBtnView(), this.editFormHeaderView.getElement());
    render(this.editFormDetailsView, this.editFormView.getElement());
    render(this.editFormOffersList, this.editFormDetailsView.getElement());
    render(this.editFormAvalableOffersView, this.editFormOffersList.getElement());

    for (let i = 0; i < EDIT_OFFERS_COUNT; i++) {
      render(new EventFormOfferItemView(), this.editFormAvalableOffersView.getElement());
    }

    render(this.editFormDestinationView, this.editFormDetailsView.getElement());
  }

  initTripPoints() {
    for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
      const tripPointItemContainer = new EventItemView();
      const tripPointItem = new EventPointView();
      render(tripPointItemContainer, this.eventsListComponent.getElement());
      render(tripPointItem, tripPointItemContainer.getElement());
      render(new EventFormOpenBtnView(), tripPointItem.getElement());
    }
  }
}
