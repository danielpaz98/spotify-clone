import { create } from "zustand";
// UTILS
import { createSetter, type Dispatch, type Setter } from "@/utils/zustand";

type State = {
  canGoBackLength: number;
  canGoForwardLength: number;
};

type CanGoBackLength = Pick<State, "canGoBackLength">;
type CanGoBackForward = Pick<State, "canGoForwardLength">;

type Actions = {
  setCanGoBackLength: Dispatch<Setter<State["canGoBackLength"]>>;
  setCanGoBackForward: Dispatch<Setter<State["canGoForwardLength"]>>;
};

const useSidebarNavigation = create<State & Actions>((set, get) => ({
  canGoBackLength: 1,
  canGoForwardLength: 1,
  setCanGoBackLength: createSetter<CanGoBackLength>(set, get, "canGoBackLength"),
  setCanGoBackForward: createSetter<CanGoBackForward>(set, get, "canGoForwardLength"),
}));

export default useSidebarNavigation;
