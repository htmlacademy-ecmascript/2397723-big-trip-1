import { getOffers, getByKey } from '../utils';


export default function createOffersListTemplate(offersIds, type, offers) {
  const offersList = getByKey('type', type, offers).offers;
  return (
    `<ul class="event__selected-offers">
      ${getOffers(offersIds, offersList).map((item) => (
      `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>`
    )).join('')}
    </ul>`
  );
}
