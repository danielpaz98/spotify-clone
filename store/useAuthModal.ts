import { create } from "zustand";
// TYPES
import { Props as AuthModalProps } from "@/components/Modals/AuthModal";

type AuthModalState = Pick<AuthModalProps, "open" | "title" | "description" | "view">;
type OnOpenParams = Pick<AuthModalProps, "view">;

type State = {
  state: AuthModalState;
};

type Actions = {
  onOpen: (params: OnOpenParams) => void;
  onClose: () => void;
};

const useAuthModal = create<State & Actions>((set) => ({
  state: { open: false },
  onOpen: ({ view }: OnOpenParams) => set({ state: { view, open: true } }),
  onClose: () => set(({ state: authModalState }) => ({ state: { ...authModalState, open: false } })),
}));

export default useAuthModal;
