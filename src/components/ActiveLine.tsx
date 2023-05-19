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
    <Show when={currentData()}>
      <ActivePagePanel
        title={(currentData() as Line).name}
        lineKey={currentData()?.urlKey}
      >
        <div>
          <h2 class="text-xl mb-1">
            {currentStatus()?.statusSummary || "Fetching…"}
          </h2>
          {currentStatus()?.latestStatus.descriptions.map((description) => (
            <p>{description}</p>
          ))}
        </div>
        <Subscription line={currentData() as Line} />
      </ActivePagePanel>
    </Show>
  );
};
