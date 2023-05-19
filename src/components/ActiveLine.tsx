import { Component, Show, createEffect, createSignal } from "solid-js";
import { Line, getLineByUrlKey } from "../services/Line";
import { ActivePagePanel } from "./ActivePage";
import { Subscription } from "./Subscription";

export const ActiveLine: Component<{ lineKey: string }> = (props) => {
  const [currentData, setCurrentData] = createSignal<Line | null | undefined>(
    null
  );
  // only overwrite the contents of this panel when the activeView is not null, so it doesn't flash an empty panel
  createEffect(() => {
    if (props.lineKey) {
      setCurrentData(getLineByUrlKey(props.lineKey));
    }
  });
  return (
    <Show when={currentData()}>
      <ActivePagePanel title={(currentData() as Line).name}>
        <h2 class="text-xl">Good Service</h2>
        <p>Delays in places</p>
        <hr />
        <Subscription lineKey={props.lineKey} />
      </ActivePagePanel>
    </Show>
  );
};
