import {
  Accessor,
  Component,
  ParentProps,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import { Line } from "./services/Line";

type LineValue = Line["urlKey"] | null;

interface ViewContextValue {
  activeLine: Accessor<LineValue>;
  setActiveLine: (newLine: LineValue) => void;
}

export const [activeView, setActiveView] = createSignal<Line["urlKey"] | null>(
  null
);

export const ViewContext = createContext<ViewContextValue>({
  activeLine: () => null,
  setActiveLine: () => {},
});

export const ViewContextProvider: Component<ParentProps> = (props) => {
  const [activeLine, setActiveLine] = createSignal<LineValue>(null);

  const context: ViewContextValue = {
    activeLine,
    setActiveLine,
  };

  return (
    <ViewContext.Provider value={[activeLine, setActiveLine]}>
      {props.children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => {
  return useContext(ViewContext);
};
