import { useContext } from "solid-js";
import { Line } from "../services/Line";
import { ALL_LINES } from "../services/Line";
import Alert from "./Icons/Alert";
import ChevronRight from "./Icons/ChevronRight";
import { activeView, setActiveView } from "../view.context";

export const Lines = () => {
  return (
    <menu class="overflow-y-auto lg:columns-2 gap-0 ">
      {ALL_LINES.map((line: Line) => (
        <li
          key={line.tflKey}
          class="bg-line-background text-line-foreground"
          data-line={line.tflKey}
        >
          <a
            href={`/${line.urlKey}`}
            class="p-1 flex justify-between gap-1 items-center"
            onClick={(e) => {
              e.preventDefault();
              setActiveView(line.urlKey);
            }}
          >
            <div class="flex-1">
              <h2>{line.name}</h2>
              <p>Good Service</p>
            </div>
            <div class="w-[42px] h-[42px]">
              <Alert />
            </div>
            <div class="w-[12px] h-[12px] opacity-50">
              <ChevronRight />
            </div>
          </a>
        </li>
      ))}
    </menu>
  );
};
