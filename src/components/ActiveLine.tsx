import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { activeView, setActiveView } from "../view.context";
import { Line, getLineByUrlKey } from "../services/Line";
import Close from "./Icons/Close";
export const ActiveLine: Component = () => {
  const [currentData, setCurrentData] = createSignal<Line | null | undefined>(
    null
  );

  // only overwrite the contents of this panel when the activeView is not null, so it doesn't flash an empty panel
  createEffect(() => {
    if (activeView()) {
      setCurrentData(getLineByUrlKey(activeView()));
    }
  });

  return (
    <>
      {activeView() && (
        <a
          href="/"
          class="fixed top-0 left-0 right-0 bottom-0"
          onClick={(e) => {
            e.preventDefault();
            return setActiveView(null);
          }}
        />
      )}
      <div
        data-line={currentData()?.urlKey}
        class={`bg-stone-50/90 text-stone-950 dark:bg-stone-900/90 dark:text-stone-50 
      backdrop-blur-lg
      shadow-[0_0_16px_0_rgba(0,0,0,0.5)]
      fixed bottom-0 left-0 w-screen
      rounded-t-xl  lg:rounded-tr-none lg:rounded-l-xl
      lg:top-0 lg:left-auto lg:right-0
      lg:max-w-[600px]
      will-change-transform
      transition-transform
      duration-300
      ${
        activeView()
          ? "translate-y-0 translate-x-0"
          : "translate-y-full lg:translate-y-0 lg:translate-x-full"
      }`}
      >
        <div
          class="bg-line-background text-line-foreground
          rounded-t-xl  lg:rounded-tr-none lg:rounded-tl-xl
          flex justify-between gap-1 items-center
          py-0.5 pl-1 pr-0.5"
        >
          <h1 class="text-2xl font-thin">{currentData()?.name}</h1>
          <a
            class="w-3 h-3 p-0.5 inline-block"
            href="/"
            title="Close"
            onClick={(e) => {
              e.preventDefault();
              setActiveView(null);
            }}
          >
            <Close />
          </a>
        </div>
        <div class="p-1 space-y-1 max-h-[70vh] overflow-y-auto">
          <h2 class="text-xl">Good Service</h2>
          <p>Delays in places</p>
          <hr />
          <details>
            <summary>Subscribe for alerts</summary>
            <div>
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
              Yo it goes in here. <br />
            </div>
          </details>
        </div>
      </div>
    </>
  );
};
