import { Component } from "solid-js";
import { activeView, setActiveView } from "../view.context";

export const ActiveLine: Component = () => {
  return (
    <div
      data-line={activeView()}
      class={`bg-stone-50 text-stone-950 dark:bg-stone-900 dark:text-stone-50 
    shadow-[0_0_16px_0_rgba(0,0,0,0.5)]
      fixed bottom-0 left-0 w-screen
       rounded-t-2xl  lg:rounded-tr-none lg:rounded-l-2xl
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
      <h1>
        <div
          class="bg-line-background text-line-foreground
          
       rounded-t-2xl  lg:rounded-tr-none lg:rounded-tl-2xl
      p-1"
        >
          <h1>LINE NAME</h1>
        </div>
        <div class="p-1">
          HELLO <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
          AND MORE
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveView(null);
            }}
          >
            Close
          </a>
        </div>
      </h1>
    </div>
  );
};
