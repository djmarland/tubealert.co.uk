export default class {
  #kv: KVNamespace;

  constructor(kv: KVNamespace) {
    this.#kv = kv;
  }

  async getValue(key) {
    return JSON.parse(await this.#kv.get(key));
  }

  setValue(key, value) {
    return this.#kv.put(key, JSON.stringify(value));
  }
}
