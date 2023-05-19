import { Component } from "solid-js";
import { Line } from "../services/Line";

const getRow = (hour: number) => {
  const cols = [];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let i = 1; i <= 7; i += 1) {
    const day = i === 7 ? 0 : i; // sunday is zero
    const inputID = `time-${day}-${hour}`;
    cols.push(
      <td class="relative py-[24px]">
        <label class="absolute inset-0 flex items-center justify-center">
          <input
            type="checkbox"
            class=" w-[24px] h-[24px] accent-line-background"
          />
          <span class="sr-only">
            {days[day]} {hour}:00
          </span>
        </label>
      </td>
    );
  }

  const hourLabel = `${hour % 12 || 12}${hour >= 12 ? "pm" : "am"}`;

  return (
    <tr class="even:bg-body-background">
      <th class="text-lg">{hourLabel}</th>
      {cols}
    </tr>
  );
};

const getTable = () => {
  const rows = [];
  for (let i = 0; i <= 23; i += 1) {
    rows.push(getRow(i));
  }

  return (
    <table class="w-full">
      <thead class="bg-body-background sticky top-0 z-10">
        <tr>
          <th class="w-[calc(100%/8)] py-0.5" />
          <th class="w-[calc(100%/8)] py-0.5">
            <abbr class="text-lg no-underline" title="Monday">
              M
            </abbr>
          </th>
          <th class="w-[calc(100%/8)] py-0.5">
            <abbr class="text-lg no-underline" title="Tuesday">
              T
            </abbr>
          </th>
          <th class="w-[calc(100%/8)] py-0.5">
            <abbr class="text-lg no-underline" title="Wednesday">
              W
            </abbr>
          </th>
          <th class="w-[calc(100%/8)] py-0.5">
            <abbr class="text-lg no-underline" title="Thursday">
              T
            </abbr>
          </th>
          <th class="w-[calc(100%/8)] py-0.5">
            <abbr class="text-lg no-underline" title="Friday">
              F
            </abbr>
          </th>
          <th class="w-[calc(100%/8)] py-0.5">
            <abbr class="text-lg no-underline" title="Saturday">
              S
            </abbr>
          </th>
          <th class="w-[calc(100%/8)] py-0.5">
            <abbr class="text-lg no-underline" title="Sunday">
              S
            </abbr>
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export const Subscription: Component<{ line: Line }> = (props) => {
  const isSupported =
    true || // temporarilly re-enable so I can test it
    (typeof window !== "undefined" &&
      "navigator" in window &&
      "serviceWorker" in window.navigator &&
      "PushManager" in window);

  if (!isSupported) {
    // todo - test if this needs a detailed message for iOS - once there is a manifest and service worker
    return (
      <p>
        <strong>
          Your browser does not support push notifications for disruption
          alerts.
        </strong>
      </p>
    );
  }

  return (
    <details>
      <summary class="border-y cursor-pointer text-lg py-1 mb-1">
        Alert me of {props.line.name} disruptions (0)
      </summary>
      <form class="pb-[80px]">
        <fieldset>
          <legend class="z-20 flex gap-2 justify-between items-center mb-1 fixed bottom-0 left-1 right-1 bg-body-background rounded-lg p-0.5 pl-1">
            Choose which hours you wish to be notified of disruptions for this
            line and hit save.
            <button
              type="submit"
              class="bg-line-background text-line-foreground border border-line-foreground rounded-md px-1 py-0.5"
            >
              Save
            </button>
          </legend>
          {getTable()}
        </fieldset>
      </form>
    </details>
  );
};
