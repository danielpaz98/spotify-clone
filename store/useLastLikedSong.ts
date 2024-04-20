import { create } from "zustand";
// MODELS
import type { Song } from "@/models";

interface State {
  lastLikedSong: Song | null;
}

interface Actions {
  setLastLikedSong: (song: Song | null) => void;
}

const useLastLikedSong = create<State & Actions>((set) => ({
  lastLikedSong: null,
  setLastLikedSong: (song: Song | null) => set({ lastLikedSong: song }),
}));

export default useLastLikedSong;
