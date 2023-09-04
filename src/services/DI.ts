import moment, { Moment } from "moment-timezone";
import KV from "./KV";
import Subscriptions from "./Subscriptions";
import TFL from "./TFL";

export interface AppEnv {
  TFL_APP_ID: string;
  TFL_APP_KEY: string;
  CONTACT_EMAIL: string;
  PUBLIC_KEY: string;
  PRIVATE_KEY: string;
  KV: KVNamespace;
}

export default class {
  #env: AppEnv;
  #kvInstance: KV | undefined;
  #tflInstance: TFL | undefined;
  #subscriptionsInstance: Subscriptions | undefined;
  #now: Moment | undefined;

  constructor(env: AppEnv) {
    this.#env = env;
  }

  getDateTime() {
    if (!this.#now) {
      this.#now = moment(new Date()).tz("Europe/London");
    }
    return this.#now;
  }

  getKv() {
    if (!this.#kvInstance) {
      this.#kvInstance = new KV(this.#env.KV);
    }
    return this.#kvInstance;
  }

  getTFL() {
    if (!this.#tflInstance) {
      this.#tflInstance = new TFL(
        this.#env.TFL_APP_ID,
        this.#env.TFL_APP_KEY,
        this.getKv(),
      );
    }
    return this.#tflInstance;
  }

  getSubscriptions() {
    if (!this.#subscriptionsInstance) {
      this.#subscriptionsInstance = new Subscriptions(
        this.getKv(),
        this.getDateTime(),
        {
          subject: `mailto:${this.#env.CONTACT_EMAIL}`,
          publicKey: this.#env.PUBLIC_KEY,
          privateKey: this.#env.PRIVATE_KEY,
        },
      );
    }
    return this.#subscriptionsInstance;
  }
}
