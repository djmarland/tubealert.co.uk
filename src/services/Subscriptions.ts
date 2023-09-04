import { Moment } from "moment-timezone";
import {
  type PushMessage,
  type VapidKeys,
  buildPushPayload,
} from "@block65/webcrypto-web-push";
import KV from "./KV";
export const SUBSCRIPTION_DATA_LOCALSTORAGE_KEY = "subscriptions";

type DaySubscriptions = (true | null)[];

export type WeekSubscriptions = DaySubscriptions[];

type Subscription = {
  endpoint: string;
  expirationTime: string | null;
  keys: {
    p256dh: string;
    auth: string;
  };
};

type SlotData = {
  [key: string]: {
    isBlockStart: boolean;
  };
};

export default class {
  #kv: KV;
  #now: Moment;
  #keys: VapidKeys;

  #KV_KEY_USER_PREFIX = "SUBSCRIPTIONS_";
  #KV_KEY_SLOT_PREFIX = "LINE_SLOT_";

  constructor(kv: KV, now: Moment, keys: VapidKeys) {
    this.#kv = kv;
    this.#now = now;
    this.#keys = keys;
  }

  async setSubscriptions(
    userID: string,
    lineID: string,
    timeSlots: WeekSubscriptions,
    subscription: Subscription,
  ) {
    await this.#saveLineSlots(userID, lineID, timeSlots);
    await this.#saveUser(userID, subscription);
  }

  async notifyUsers(status: any) {
    const slotData = await this.#getSlot(
      status.urlKey,
      this.#now.day(),
      parseInt(this.#now.format("HH")),
    );
    const userIds = Object.keys(slotData);
    console.log(
      userIds.length +
        " users to notify for " +
        status.name +
        ": " +
        status.statusSummary,
    );

    const payload: PushMessage = {
      data: {
        title: status.name,
        body: status.statusSummary,
        // todo - get an icon per line?
        // icon:
        //   this.config.STATIC_HOST +
        //   this.assetManifest[`icon-${lineData.urlKey}.png`],
        tag: `/`,
      },
      options: {
        ttl: 60,
      },
    };

    for (const userHash in slotData) {
      await this.#notify(userHash, payload);
      console.log("notified " + userHash);
    }
  }

  async #notify(userHash: string, payload: string) {
    const subscription = await this.#getSubscription(userHash);
    console.log("it is the sub", JSON.stringify(subscription));
    if (!subscription) {
      console.log("why are we in here?!");
      return; // nothing to do
    }

    console.log("building payload", decodeURI(subscription.endpoint));
    const init = await buildPushPayload(payload, subscription, this.#keys);
    console.log(JSON.stringify(init));
    const res = await fetch(decodeURI(subscription.endpoint), init);
    console.log("status", res.status, res.ok, await res?.text());
    // console.log(init, res.status, JSON.stringify(await res.json()));

    /* todo - remove if 404 or 410 received 

      if (e.statusCode === 410 || e.statusCode === 404) {
                // delete invalid registration
                return Subscription.remove({endpoint: sub.endpoint}).exec()
                    .then(function(sub) {
                        console.log('Deleted: ' + sub.endpoint);
                    })
                    .catch(function(sub) {
                        console.error('Failed to delete: ' + sub.endpoint);
                    });
            }
            */
  }

  async #saveLineSlots(
    userId: string,
    lineId: string,
    timeSlots: WeekSubscriptions,
  ) {
    // loop through all of them, adding or removing if not present
    const userHash = await this.#hashFromUserId(userId);
    let blockStart = null;
    for (let day = 1; day <= 7; day++) {
      for (let hour = 0; hour <= 23; hour++) {
        const slotData = await this.#getSlot(lineId, day, hour);
        if (timeSlots?.[day]?.[hour] ?? null) {
          // set the new one, update the block number
          if (blockStart === null) {
            blockStart = [day, hour];
          }

          slotData[userHash] = {
            isBlockStart: blockStart[0] === day && blockStart[1] === hour,
          };
          this.#saveSlot(lineId, day, hour, slotData);
        } else {
          // this is a gap. clear the block
          blockStart = null;
          if (slotData[userHash]) {
            delete slotData[userHash];
            this.#saveSlot(lineId, day, hour, slotData);
          }
          // else no update needed
        }
      }
    }
  }

  async #getSlot(lineId: string, day: number, hour: number) {
    const slotData = await this.#kv.getValue(
      `${this.#KV_KEY_SLOT_PREFIX}_${lineId}_${day}_${hour}`,
    );
    return slotData || {};
  }

  async #saveSlot(
    lineId: string,
    day: number,
    hour: number,
    slotData: SlotData,
  ) {
    const key = `${this.#KV_KEY_SLOT_PREFIX}_${lineId}_${day}_${hour}`;
    if (Object.keys(slotData).length === 0) {
      return this.#kv.setValue(key, undefined);
    }
    this.#kv.setValue(key, slotData);
  }

  async #hashFromUserId(userId: string): Promise<string> {
    const sourceBytes = new TextEncoder().encode(userId);
    const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
    const resultBytes = [...new Uint8Array(digest)];
    return resultBytes.map((x) => x.toString(16).padStart(2, "0")).join("");
  }

  async #saveUser(userId: string, subscription: Subscription) {
    const userHash = await this.#hashFromUserId(userId);
    await this.#kv.setValue(
      `${this.#KV_KEY_USER_PREFIX}-${userHash}`,
      subscription,
    );
  }

  async #getUser(userId: string) {
    const userHash = await this.#hashFromUserId(userId);
    return this.#getSubscription(userHash);
  }

  async #getSubscription(userHash: string) {
    const result = await this.#kv.getValue(
      `${this.#KV_KEY_USER_PREFIX}-${userHash}`,
    );
    console.log("subscription retrieved: ", result);
    return result || null;
  }
}
