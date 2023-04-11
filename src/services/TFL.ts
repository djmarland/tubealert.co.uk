import KV from "./KV";
import { Line, ALL_LINES, SEVERITIES } from "./Line";

export default class {
  #appId: string;
  #appKey: string;
  #kv: KV;

  #KV_KEY = "CURRENT_STATUS";
  #KV_TTL = 60 * 1000;

  constructor(appId: string, appKey: string, kv: KV) {
    this.#appId = appId;
    this.#appKey = appKey;
    this.#kv = kv;
  }

  async getCurrentStatus() {
    const saved = await this.#kv.getValue(this.#KV_KEY);
    if (
      saved?.[0]?.["updatedAt"] &&
      Date.parse(saved[0].updatedAt) > Date.now() - this.#KV_TTL
    ) {
      return saved;
    }
    const newData = await this.fetchCurrentStatus();
    await this.#kv.setValue(this.#KV_KEY, newData);
    return newData;
  }

  async fetchCurrentStatus() {
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
    const lineData = Object.assign({}, originalLineData);

    // set some defaults
    delete lineData.tflKey;
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
            value !== null && self.indexOf(value) === index
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
        false
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
