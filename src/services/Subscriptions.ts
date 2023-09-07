import { Moment } from "moment-timezone";
import {
  type PushMessage,
  type VapidKeys,
  buildPushPayload,
} from "@block65/webcrypto-web-push";
import { Status } from "./Status";
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
  #now: Moment;
  #keys: VapidKeys;
  #db: D1Database;

  constructor(db: D1Database, now: Moment, keys: VapidKeys) {
    this.#db = db;
    this.#now = now;
    this.#keys = keys;
  }

  async setSubscriptions(
    userID: string,
    lineID: string,
    timeSlots: WeekSubscriptions,
    subscription: Subscription,
  ) {
    await this.#saveUser(userID, subscription);
    await this.#saveLineSlots(userID, lineID, timeSlots);
  }

  async removeSubscriptions(userID: string) {
    // delete the user and it should cascade to all the subscriptions
    const stmt = this.#db.prepare("DELETE FROM `subscriber` WHERE `id` = ?");
    return stmt.bind(userID).run();
  }

  async notifyUsers(status: Status) {
    const subscriptions = await this.#db
      .prepare(
        "SELECT `subscription` FROM `subscription` s INNER JOIN `subscriber` u ON s.`subscriber_id` = u.`id` WHERE s.`line_id` = ? AND s.`day` = ? AND s.`hour` = ?",
      )
      .bind(status.tflKey, this.#now.day(), parseInt(this.#now.format("HH")))
      .all();

    const payload = this.#getPayload(status);

    await Promise.allSettled(
      (subscriptions.results ?? []).map((result: any) => {
        const subscription = JSON.parse(result.subscription);
        return this.#notify(subscription, payload);
      }),
    );
  }

  async notifyHourlyUsers(status: Status, now: Moment) {
    const subscriptions = await this.#db
      .prepare(
        "SELECT `subscription` FROM `subscription` s INNER JOIN `subscriber` u ON s.`subscriber_id` = u.`id` WHERE s.`line_id` = ? AND s.`day` = ? AND s.`hour` = ? AND s.`is_block_start` = 1",
      )
      .bind(status.tflKey, now.day(), parseInt(now.format("HH")))
      .all();

    const payload = this.#getPayload(status);

    return Promise.allSettled(
      (subscriptions.results ?? []).map((result: any) => {
        const subscription = JSON.parse(result.subscription);
        return this.#notify(subscription, payload);
      }),
    );
  }

  #getPayload(status: Status): PushMessage {
    return {
      data: {
        title: status.name,
        body: status.statusSummary,
        icon: `https://tubealert.co.uk/imgs/icon-${status.urlKey}.png`,
        tag: `/${status.urlKey}`,
      },
      options: {
        ttl: 60,
      },
    };
  }

  async #notify(subscription: any, payload: string) {
    if (!subscription) {
      console.log("why are we in here?!");
      return; // nothing to do
    }

    const init = await buildPushPayload(payload, subscription, this.#keys);
    try {
      const res = await fetch(subscription.endpoint, init);
    } catch (e: any) {
      const statusCode = e.statusCode;
      if (statusCode !== 404 && statusCode !== 410) {
        throw e;
      }
      // 404 or 410 means the subscription is no longer valid and we should remove it from our database
      await this.removeSubscriptions(subscription.endpoint);
    }
  }

  async #saveLineSlots(
    userId: string,
    lineId: string,
    timeSlots: WeekSubscriptions,
  ) {
    // delete all the current subscriptions for this line
    await this.#db
      .prepare(
        "DELETE FROM `subscription` WHERE `subscriber_id` = ? AND `line_id` = ?",
      )
      .bind(userId, lineId)
      .run();

    const stmt = this.#db.prepare(
      "INSERT INTO `subscription` (`line_id`, `subscriber_id`, `day`, `hour`, `is_block_start`) VALUES (?,?,?,?,?)",
    );

    let binds: D1PreparedStatement[] = [];

    let blockStart = null;
    for (let day = 1; day <= 7; day++) {
      for (let hour = 0; hour <= 23; hour++) {
        if (timeSlots?.[day]?.[hour] ?? null) {
          // set the new one, update the block number
          if (blockStart === null) {
            blockStart = [day, hour];
          }

          binds.push(
            stmt.bind(
              lineId,
              userId,
              day,
              hour,
              blockStart[0] === day && blockStart[1] === hour ? 1 : 0,
            ),
          );
        } else {
          // this is a gap. clear the block
          blockStart = null;
        }
      }
    }

    if (binds.length) {
      return this.#db.batch(binds);
    }
  }

  async #saveUser(userId: string, subscription: Subscription) {
    const currentUser = await this.#getUserByEndpoint(userId);

    let stmt: D1PreparedStatement;
    let params = [];

    if (currentUser) {
      params = [
        JSON.stringify(subscription),
        new Date().toISOString(),
        (currentUser as any).id,
      ];
      stmt = this.#db.prepare(
        "UPDATE `subscriber` SET `subscription` = ?, `updated_at` = ? WHERE `id` = ?",
      );
    } else {
      params = [userId, JSON.stringify(subscription)];
      stmt = this.#db.prepare(
        "INSERT INTO `subscriber` (`id`, `subscription`) VALUES (?, ?)",
      );
    }

    return stmt.bind(...params).run();
  }

  #getUserByEndpoint(endpoint: string) {
    return this.#db
      .prepare("SELECT * FROM `subscriber` WHERE `id` = ?")
      .bind(endpoint)
      .first();
  }
}
