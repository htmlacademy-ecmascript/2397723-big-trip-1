import ErrorMessageView from '../view/error-message';
import { render, remove, replace, RenderPosition } from '../framework/render';
import { UpdateType } from '../const';

export default class EventMessagePresenter {
  #component = null;
  #container = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #message = '';

  constructor({container, eventsModel, offersModel, destinationsModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevErrorMessageComponent = this.#component;

    this.#component = new ErrorMessageView(this.#message);

    if (prevErrorMessageComponent === null) {
      render(this.#component, this.#container, RenderPosition.BEFOREBEGIN);
      this.#deferredRemoveComponent(2000);
      return;
    }

    replace(this.#component, prevErrorMessageComponent);
    remove(prevErrorMessageComponent);
    this.#deferredRemoveComponent(2000);
  }

  #deferredRemoveComponent(time) {
    setTimeout(() => {
      remove(this.#component);
      this.#component = null;
    }, time);
  }

  #handleModelEvent = (updateType, data) => {
    if (updateType === UpdateType.ERR) {
      this.#message = data.error;
      this.init();
    }
    if (updateType === UpdateType.INIT) {
      this.#message = '';
      this.#component = null;
    }
  };
}
