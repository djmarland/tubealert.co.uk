import Settings from "./Icons/Settings";
import { A } from "@solidjs/router";

export const Header = () => (
  <div class="bg-stone-800 text-stone-50 flex gap-1 justify-center items-center text-xl font-thin px-1 relative">
    <h1>
      <A href="/">TubeAlert</A>
    </h1>
    <A href="/settings" class="w-2 h-2 absolute right-0.5" noScroll>
      <Settings />
    </A>
  </div>
);
