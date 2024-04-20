import type { StoreApi } from "zustand";

type SetState<T> = StoreApi<T>["setState"];
type GetState<T> = StoreApi<T>["getState"];

export type Dispatch<S> = (prevState: S) => void;
export type Setter<S> = S | Dispatch<S>;

function isFunctionSetterArg(arg: unknown): arg is Dispatch<unknown> {
  return typeof arg === "function";
}

export function createSetter<T>(set: SetState<T>, get: GetState<T>, key: keyof T) {
  return <S>(arg: Setter<S>): void => {
    if (isFunctionSetterArg(arg)) {
      const prevState = get()[key];
      const data = arg(prevState);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set({ [key]: data } as Record<typeof key, any>);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set({ [key]: arg } as Record<typeof key, any>);
    }
  };
}
