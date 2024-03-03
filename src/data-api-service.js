import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const Endpoints = {
  EVENTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations'
};

export default class DataApiService extends ApiService {

  async getDestinations() {
    return this._load({ url: Endpoints.DESTINATIONS })
      .then(ApiService.parseResponse);
  }

  async getOffers() {
    return this._load({ url: Endpoints.OFFERS })
      .then(ApiService.parseResponse);
  }

  async getEvents() {
    return this._load({ url: Endpoints.EVENTS })
      .then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `${Endpoints.EVENTS}/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptEventToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  }

  async addEvent(event) {
    const response = await this._load({
      url: Endpoints.EVENTS,
      method: Method.POST,
      body: JSON.stringify(this.#adaptEventToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  }

  async deleteEvent(event) {
    const response = await this._load({
      url: `${Endpoints.EVENTS}/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptEventToServer(event) {
    const adaptedEvent = {
      ...event,
      'base_price': Number(event['basePrice']),
      'date_from': event['dateFrom'],
      'date_to': event['dateTo'],
      'is_favorite': event['isFavorite'],
    };

    delete adaptedEvent['basePrice'];
    delete adaptedEvent['dateFrom'];
    delete adaptedEvent['dateTo'];
    delete adaptedEvent['isFavorite'];

    return adaptedEvent;
  }
}
