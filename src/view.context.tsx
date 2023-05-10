import { createSignal } from "solid-js";
import { Line } from "./services/Line";

type ActiveViewValue = Line["urlKey"] | null;

export const [activeView, setActiveView] = createSignal<ActiveViewValue>(null);
