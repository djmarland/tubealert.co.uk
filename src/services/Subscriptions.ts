import KV from "./KV";
export const SUBSCRIPTION_DATA_LOCALSTORAGE_KEY = "subscriptions";

type DaySubscriptions = (true | null)[];

export type WeekSubscriptions = DaySubscriptions[];

export default class {
  #kv: KV;

  #KV_KEY = "SUBSCRIPTIONS";

  constructor(kv: KV) {
    this.#kv = kv;
  }
}
