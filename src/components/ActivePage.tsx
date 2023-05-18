import { Component, ParentProps } from "solid-js";
import Close from "./Icons/Close";
import { A, useLocation } from "@solidjs/router";
import { Settings } from "./Settings";
import { ActiveLine } from "./ActiveLine";
export const ActivePage: Component = () => {
  const location = useLocation();
  const viewKey = () => location.pathname.replace("/", "");

  return (
    <>
      {viewKey() && (
        <A
          href="/"
          class="fixed top-0 left-0 right-0 bottom-0 bg-stone-950/25"
          noScroll
        />
      )}
      <div
        data-line={viewKey()}
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
        viewKey()
          ? "translate-y-0 translate-x-0"
          : "translate-y-full lg:translate-y-0 lg:translate-x-full"
      }`}
      >
        {viewKey() === "settings" ? (
          <Settings />
        ) : (
          <ActiveLine lineKey={viewKey()} />
        )}
      </div>
    </>
  );
};

export const ActivePagePanel = ({
  title,
  children,
}: ParentProps<{ title: string }>) => {
  return (
    <div>
      <div
        class="bg-line-background text-line-foreground
    rounded-t-xl  lg:rounded-tr-none lg:rounded-tl-xl
    flex justify-between gap-1 items-center
    py-0.5 pl-1 pr-0.5"
      >
        <h1 class="text-2xl font-thin">{title}</h1>
        <A class="w-3 h-3 p-0.5 inline-block" href="/" title="Close">
          <Close />
        </A>
      </div>
      <div class="p-1 space-y-1 max-h-[70vh] overflow-y-auto">{children}</div>
    </div>
  );
};
