import { UpdateType } from './const';
import Observable from './framework/observable';
export default class ModelsApi extends Observable {

  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor({eventsModel, offersModel, destinationsModel}) {
    super();
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  async init() {
    try {
      await Promise.all([
        this.#offersModel.init(),
        this.#destinationsModel.init()
      ]);
      await this.#eventsModel.init();
      this._notify(UpdateType.INIT, {isError: false});
    } catch (err) {
      this._notify(UpdateType.INIT, {isError: true});
    }
  }
}
