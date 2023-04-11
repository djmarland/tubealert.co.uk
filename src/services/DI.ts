import KV from "./KV";
import TFL from "./TFL";

export interface AppEnv {
  TFL_APP_ID: string;
  TFL_APP_KEY: string;
  KV: KVNamespace;
}

export default class {
  #env: AppEnv;
  #kvInstance;
  #tflInstance;

  constructor(env: AppEnv) {
    this.#env = env;
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
        this.getKv()
      );
    }
    return this.#tflInstance;
  }
}
