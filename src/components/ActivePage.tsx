import { Component, JSX, ParentProps, createSignal } from "solid-js";
import Close from "./Icons/Close";
import { A, useLocation, useNavigate } from "@solidjs/router";
import { Settings } from "./Settings";
import { ActiveLine } from "./ActiveLine";
import { DOMElement } from "solid-js/jsx-runtime";

const ACTIVE_PANEL_ID = "active-panel";

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
        id={ACTIVE_PANEL_ID}
        class={`bg-stone-50/90 text-stone-950 dark:bg-stone-900/90 dark:text-stone-50 
      backdrop-blur-lg
      shadow-[0_0_16px_0_rgba(0,0,0,0.5)]
      fixed bottom-0 left-0 w-screen
      rounded-t-xl  lg:rounded-tr-none lg:rounded-l-xl
      lg:top-0 lg:left-auto lg:right-0
      lg:max-w-[560px]
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

let touchStartY: number | undefined;
let touchStartX: number | undefined;
let touchStartMs: number | undefined;
let activePanel: HTMLDivElement | undefined;
let isX = false;

export const ActivePagePanel = (
  props: ParentProps<{ title: string; lineKey?: string }>,
) => {
  const navigate = useNavigate();

  const onTouchStart = (e: TouchEvent) => {
    activePanel =
      (document.getElementById(ACTIVE_PANEL_ID) as HTMLDivElement) || undefined;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    touchStartMs = Date.now();
    isX = window.innerWidth > activePanel.clientWidth;
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!touchStartY || !touchStartX || !activePanel) {
      return;
    }
    const newX = e.changedTouches[0].screenX;
    const newY = e.changedTouches[0].screenY;
    if (isX && newX > touchStartX) {
      activePanel.style.cssText = `transition: none; transform: translateX(${
        newX - touchStartX
      }px)`;
    } else if (!isX && newY > touchStartY) {
      activePanel.style.cssText = `transition: none; transform: translateY(${
        newY - touchStartY
      }px)`;
    } else {
      activePanel.style.cssText = ``;
    }
  };
  const onTouchEnd = (e: TouchEvent) => {
    const newX = e.changedTouches[0].screenX;
    const newY = e.changedTouches[0].screenY;
    if (!touchStartY || !touchStartX || !activePanel) {
      return;
    }
    if (
      isX &&
      (newX - touchStartX > 100 ||
        (touchStartMs &&
          newX - touchStartX > 5 &&
          Date.now() - touchStartMs < 300))
    ) {
      activePanel.style.cssText = `transition: .3s all; transform: translateX(100%)`;
      navigate("/");
      window.setTimeout(() => {
        if (activePanel) {
          activePanel.style.cssText = ``;
        }
      }, 400);
    } else if (
      !isX &&
      (newY - touchStartY > 100 ||
        (touchStartMs &&
          newY - touchStartY > 5 &&
          Date.now() - touchStartMs < 300))
    ) {
      activePanel.style.cssText = `transition: .3s all; transform: translateY(100%)`;
      navigate("/");
      window.setTimeout(() => {
        if (activePanel) {
          activePanel.style.cssText = ``;
        }
      }, 400);
    } else {
      activePanel.style.cssText = ``;
    }
    touchStartY = undefined;
    touchStartMs = undefined;
  };

  return (
    <div class="flex flex-col max-h-full" data-line={props.lineKey}>
      <div
        class="bg-line-background text-line-foreground
    rounded-t-xl  lg:rounded-tr-none lg:rounded-tl-xl
    flex justify-between gap-1 items-center
    py-0.5 pl-1 pr-0.5"
        ontouchstart={onTouchStart}
        ontouchmove={onTouchMove}
        ontouchend={onTouchEnd}
      >
        <h1 class="text-2xl font-thin">{props.title}</h1>
        <A class="w-3 h-3 p-0.5 inline-block" href="/" title="Close">
          <Close />
        </A>
      </div>
      <div class="flex-1 p-1 space-y-1 max-h-[70vh] lg:max-h-none overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
};
