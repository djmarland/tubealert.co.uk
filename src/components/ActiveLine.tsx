import { Component, Show, createEffect, createSignal } from "solid-js";
import { Line, getLineByUrlKey } from "../services/Line";
import { ActivePagePanel } from "./ActivePage";
import { Subscription } from "./Subscription";
import { Status, getLineStatus } from "../services/Status";

export const ActiveLine: Component<{ lineKey: string }> = (props) => {
  const [currentData, setCurrentData] = createSignal<Line | null | undefined>(
    null
  );
  const [currentStatus, setCurrentStatus] = createSignal<
    Status | null | undefined
  >(null);
  // only overwrite the contents of this panel when the activeView is not null, so it doesn't flash an empty panel
  createEffect(() => {
    if (props.lineKey) {
      setCurrentData(getLineByUrlKey(props.lineKey));
      setCurrentStatus(getLineStatus(props.lineKey));
    }
  });
  return (
    <Show when={currentData()} fallback={<NotFound />}>
      <ActivePagePanel
        title={(currentData() as Line).name}
        lineKey={currentData()?.urlKey}
      >
        <div>
          <h2 class="text-xl mb-1">
            {currentStatus()?.statusSummary || "Fetching…"}
          </h2>
          {currentStatus()?.latestStatus.descriptions.map((description) => (
            <p class="mb-1">{description}</p>
          ))}
          {currentStatus()?.updatedAt && (
            <p>
              Updated:{" "}
              {new Date(
                currentStatus()?.updatedAt as string
              ).toLocaleDateString()}{" "}
              {new Date(
                currentStatus()?.updatedAt as string
              ).toLocaleTimeString()}
            </p>
          )}
        </div>
        <Subscription line={currentData() as Line} />
      </ActivePagePanel>
    </Show>
  );
};

const NotFound = () => (
  <ActivePagePanel title="404">
    <p>That URL does not exist</p>
  </ActivePagePanel>
);
