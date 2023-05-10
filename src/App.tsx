import { Component, onCleanup } from "solid-js";

import { Header } from "./components/Header";
import { Lines } from "./components/Lines";
import { setActiveView } from "./view.context";
import { ActiveLine } from "./components/ActiveLine";

const App: Component = () => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setActiveView(null);
    }
  };
  document.addEventListener("keydown", onKeyDown);
  onCleanup(() => document.removeEventListener("keydown", onKeyDown));

  return (
    <>
      <div style="display:none">
        <svg>
          <symbol id="icon-chevron-left" viewBox="0 0 16 24">
            <path d="M14.88 2.878L5.756 12l9.124 9.142-2.81 2.808L.12 12 12.07.05l2.81 2.828z"></path>
          </symbol>
          <symbol id="icon-chevron-right" viewBox="0 0 16 24">
            <path d="M.12 21.122L9.244 12 .12 2.858 2.93.05 14.88 12 2.93 23.95.12 21.122z"></path>
          </symbol>
          <symbol id="icon-settings" viewBox="0 0 24 24">
            <path
              d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 
                3.5m7.43-2.53c.04-.32.07-.64.07-.97 
                0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 
                1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65c-.04-.24-.25-.42-.5-.42h-4c-.25 0-.46.18-.5.42l-.37 
                2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 
                11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 
                1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 
                2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 
                .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"
            ></path>
          </symbol>
          <symbol id="icon-close" viewBox="0 0 24 24">
            {/* <path fill="none" d="M0 0h24v24H0z" /> */}
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </symbol>
          <symbol id="icon-alert" viewBox="0 0 24 24">
            <path
              d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 
                12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"
            ></path>
          </symbol>
        </svg>
      </div>
      <div class="grid grid-rows-[48px_1fr] h-screen lg:h-auto max-h-screen">
        <Header />
        <Lines />
      </div>
      <ActiveLine />
    </>
  );
};

export default App;
