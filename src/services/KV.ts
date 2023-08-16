export default class {
  #kv: KVNamespace;

  constructor(kv: KVNamespace) {
    this.#kv = kv;
  }

  async getValue(key) {
    try {
      return JSON.parse(await this.#kv.get(key));
    } catch (e) {
      console.error(e);
      // unparsable data is null
      return null;
    }
  }

  setValue(key, value) {
    if (value === undefined) {
      return this.#kv.delete(key);
    }
    return this.#kv.put(key, JSON.stringify(value));
  }
}
