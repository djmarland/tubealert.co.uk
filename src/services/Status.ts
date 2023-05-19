import { createSignal } from "solid-js";
import { Line } from "./Line";

export type Status = Line & {
  isDisrupted: boolean;
  updatedAt: string;
  statusSummary: string;
  latestStatus: {
    updatedAt: string;
    isDisrupted: boolean;
    title: string;
    shortTitle: string;
    descriptions: string[];
  };
};

export const [latestStatus, setLatestStatus] = createSignal<Status[]>();

export const updateStatus = () => {
  fetch("/api/status")
    .then((a) => a.json())
    .then((data: Status[]) => setLatestStatus(data));
};

export const getLineStatus = (urlKey: string) => {
  if (!latestStatus()) {
    return null;
  }
  return latestStatus()?.find((line) => line.urlKey === urlKey);
};
