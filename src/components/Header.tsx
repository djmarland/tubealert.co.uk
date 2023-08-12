import { latestStatus, updateStatus } from "../services/Status";
import Refresh from "./Icons/Refresh";
import Settings from "./Icons/Settings";
import { A } from "@solidjs/router";

export const Header = () => {
  const doUpdate = () => {
    const latest = latestStatus();
    if (
      latest?.[0].updatedAt &&
      Date.parse(latest?.[0].updatedAt) < Date.now() - 120 * 1000
    ) {
      updateStatus();
    }
  };

  return (
    <div class="bg-stone-800 text-stone-50 flex gap-1 justify-between items-center text-xl font-thin px-0.5 relative">
      <button onClick={doUpdate} class="w-2 h-2">
        <Refresh />
      </button>
      <h1>
        <A href="/">TubeAlert</A>
      </h1>
      <A href="/settings" class="w-2 h-2" noScroll>
        <Settings />
      </A>
    </div>
  );
};
