import { Component } from "solid-js";

import { Header } from "./components/Header";
import { Lines } from "./components/Lines";
import { ActivePage } from "./components/ActivePage";
import { updateStatus } from "./services/Status";

const App: Component = () => {
  updateStatus();
  setInterval(updateStatus, 1000 * 120);

  return (
    <>
      <div style="display:none">
        <svg>
          <symbol id="icon-refresh" viewBox="0 0 24 24">
            <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"></path>
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
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </symbol>
          <symbol id="icon-alert" viewBox="0 0 24 24">
            <path
              d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 
                12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"
            ></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 576 512">
            <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6
                    328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1
                    218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1
                    13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7
                    1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
          </symbol>
          <symbol id="icon-starred" viewBox="0 0 576 512">
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 
                    32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 
                    33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
          </symbol>
        </svg>
      </div >
      <div class="grid grid-rows-[48px_1fr] h-screen lg:h-auto max-h-screen">
        <Header />
        <Lines />
      </div>
      <ActivePage />
    </>
  );
};

export default App;
