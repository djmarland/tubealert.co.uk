import { Signal, createSignal } from "solid-js";

export function createStoredSignal<T>(
  key: string,
  defaultValue?: T,
  storage = localStorage,
): [...Signal<T | undefined>, () => void] {
  const initialValue = storage.getItem(key)
    ? (JSON.parse(storage.getItem(key)!) as T)
    : defaultValue;

  const [value, setValue] = createSignal<T | undefined>(initialValue);

  const setValueAndStore = ((
    arg: Exclude<T, Function> | ((prev: T | undefined) => T),
  ) => {
    const v = setValue(arg);
    storage.setItem(key, JSON.stringify(v));
    return v;
  }) as typeof setValue;

  const remove = () => {
    setValue(undefined);
    storage.removeItem(key);
  };

  return [value, setValueAndStore, remove];
}
