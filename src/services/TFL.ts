import KV from "./KV";
import { Line, ALL_LINES, SEVERITIES } from "./Line";
import { Status } from "./Status";

export default class {
  #appId: string;
  #appKey: string;
  #kv: KV;
  #db: D1Database;

  #KV_KEY = "CURRENT_STATUS";
  #UPDATE_TTL = 60 * 1000;

  constructor(appId: string, appKey: string, kv: KV, db: D1Database) {
    this.#appId = appId;
    this.#appKey = appKey;
    this.#kv = kv;
    this.#db = db;
  }

  async getCurrentStatus(): Promise<Status[]> {
    const { results } = await this.#db.prepare("SELECT * FROM `line`").all();
    return results.map(this.#mapLineStatusFromDb);
  }

  async updateAndCheckStatus() {
    const updatedAt = await this.#db
      .prepare("SELECT updated_at FROM `line` LIMIT 1")
      .first<string>("updated_at");
    console.log(updatedAt);
    if (updatedAt && Date.parse(updatedAt) > Date.now() - this.#UPDATE_TTL) {
      console.log("Still in cache. Not doing anything");
      return [];
    }
    const newData = await this.#fetchCurrentStatus();
    if (!newData) {
      return [];
    }
    // todo - fetch current status first in order to compare
    await this.#saveStatuses(newData);
    await this.#kv.setValue(this.#KV_KEY, newData);
    return [];
    // return this.#findChangedLines(saved, newData);
  }

  async #saveStatuses(newStatuses: Status[]) {
    const stmt = this.#db.prepare(
      "UPDATE `line` SET is_disrupted = ?, updated_at = ?, status_summary = ?, status_full = ?, details = ? WHERE id = ?",
    );

    const rows = await this.#db.batch(
      newStatuses.map((status) =>
        stmt.bind(
          status.isDisrupted ? 1 : 0,
          status.updatedAt,
          status.statusSummary,
          status.latestStatus.title,
          JSON.stringify(status.latestStatus.descriptions),
          status.tflKey,
        ),
      ),
    );

    console.log(rows);
  }

  #mapLineStatusFromDb(result: any): Status {
    return {
      name: result.name,
      shortName: result.short_name,
      urlKey: result.url_key,
      tflKey: result.id,
      displayOrder: result.display_order,
      isDisrupted: Boolean(result.is_disrupted),
      updatedAt: result.updated_at,
      statusSummary: result.status_summary,
      latestStatus: {
        updatedAt: result.updated_at,
        isDisrupted: Boolean(result.is_disrupted),
        title: result.status_full,
        shortTitle: result.status_summary,
        descriptions: JSON.parse(result.details ?? "[]"),
      },
    };
  }

  #findChangedLines(oldStatuses, newStatuses) {
    return ALL_LINES.map((lineData) => {
      const oldStatus = oldStatuses?.find(
        (status) => status.urlKey === lineData.urlKey,
      );
      const newStatus = newStatuses?.find(
        (status) => status.urlKey === lineData.urlKey,
      );
      if (
        true
        // oldStatus &&
        // newStatus &&
        // oldStatus.statusSummary !== newStatus.statusSummary
      ) {
        return newStatus;
      }
      return null;
    }).filter(Boolean);
  }

  async #fetchCurrentStatus() {
    const url =
      "https://api.tfl.gov.uk/Line/Mode/tube,dlr,elizabeth-line,overground/Status" +
      `?app_id=${this.#appId}` +
      `&app_key=${this.#appKey}`;

    try {
      console.log("Fetching current status from TFL");
      const data = await fetch(url).then((d) => d.json());
      return this.#mutateData(data);
    } catch (e) {
      console.log("Error trying to fetch and parse status: " + e);
    }
  }

  #mutateData(data: any) {
    return ALL_LINES.map((lineData) => {
      const lineStatus = data.find((status) => status.id === lineData.tflKey);
      return this.#makeStatusItem(lineData, lineStatus);
    });
  }

  #makeStatusItem(originalLineData: Line, lineStatus) {
    const now = new Date();
    // create a copy of the lineData object
    const lineData: Status = Object.assign({}, originalLineData);

    // set some defaults
    lineData.isDisrupted = null;
    lineData.updatedAt = now.toISOString();
    lineData.statusSummary = "No Information";
    lineData.latestStatus = {
      updatedAt: now.toISOString(),
      isDisrupted: null,
      title: "No Information",
      shortTitle: "No Information",
      descriptions: null,
    };

    if (lineStatus) {
      const sortedStatuses = lineStatus.lineStatuses.sort((a, b) => {
        if (!SEVERITIES[a.statusSeverity] || !SEVERITIES[b.statusSeverity]) {
          return 0;
        }

        return (
          SEVERITIES[a.statusSeverity].displayOrder -
          SEVERITIES[b.statusSeverity].displayOrder
        );
      });

      // get sorted titles and reasons, ensuring unique values
      const titles = sortedStatuses
        .map((s) => s.statusSeverityDescription)
        .filter((value, index, self) => self.indexOf(value) === index);
      const reasons = sortedStatuses
        .map((s) => s.reason || null)
        .filter(
          (value, index, self) =>
            value !== null && self.indexOf(value) === index,
        );

      lineData.latestStatus.isDisrupted = sortedStatuses.reduce(
        (value, status) => {
          if (
            SEVERITIES[status.statusSeverity] &&
            SEVERITIES[status.statusSeverity].disrupted
          ) {
            return true;
          }
          return value;
        },
        false,
      );
      lineData.latestStatus.title = titles.join(", ");
      lineData.latestStatus.shortTitle = titles.slice(0, 2).join(", ");
      lineData.latestStatus.descriptions = reasons;

      lineData.isDisrupted = lineData.latestStatus.isDisrupted;
      lineData.statusSummary = lineData.latestStatus.shortTitle;
    }

    return lineData;
  }
}
