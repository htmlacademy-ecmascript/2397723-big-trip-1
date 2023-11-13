import events from '../mock/points.json';
import offers from '../mock/offers.json';
import destinations from '../mock/destinations.json';

// Три массива, связанные айдишниками. Где и как их лучше связывать? Вот так, как сейчас отдавать каждый массив по отдельности?
// Или объединить их прямо здесь и написать один метод, который будет отдавать объединенный массив?
// Или написать здесь же дополнительные методы, которые будут связывать массивы? Наподобие тех функций, которые у меня в utils.js
export default class EventModel {

  events = events;
  offers = offers;
  destinations = destinations;

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
