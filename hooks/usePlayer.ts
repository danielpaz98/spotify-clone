"use client";

import { useCallback, useMemo } from "react";
// PLUGINS
import _shuffle from "just-shuffle";
import { create } from "zustand";
import { useGlobalAudioPlayer } from "react-use-audio-player";
// MODELS
import { Song } from "@/models";

interface State {
  currentMusic: { song: Song | null; songs: Song[] | null };
  shuffled: boolean;
}

interface Actions {
  setCurrentMusic: (currentMusic: { song: Song | null; songs?: Song[] | null }) => void;
  shuffle: (shuffleOnOff: boolean) => void;
  reset: () => void;
}

const initialState: State = {
  currentMusic: { song: null, songs: null },
  shuffled: false,
};

const usePlayerStore = create<State & Actions>((set) => ({
  ...initialState,
  shuffle: (shuffleOnOff) => {
    set(({ currentMusic }) => ({ shuffled: !currentMusic.song ? false : shuffleOnOff }));
  },
  setCurrentMusic: (currentMusic) => {
    set((state) => ({ currentMusic: { ...state.currentMusic, ...currentMusic } }));
  },
  reset: () => set(initialState),
}));

export default function usePlayer() {
  const audioPlayer = useGlobalAudioPlayer();
  const player = usePlayerStore();

  const { mute, muted, setVolume } = audioPlayer;
  const { shuffled, currentMusic, setCurrentMusic } = player;
  const { song } = currentMusic;

  const songs = useMemo(() => {
    if (!currentMusic.songs) return [];
    return shuffled ? _shuffle(currentMusic?.songs) : currentMusic?.songs;
  }, [shuffled, currentMusic.songs]);

  const toggleMute = () => {
    const volume = muted ? 1 : 0;

    mute(!muted);
    setVolume(volume);
  };

  const playNext = useCallback(() => {
    if (!songs || songs?.length === 0) return;

    const currentIndex = songs?.findIndex(({ id }) => id === song?.id);
    const nextSong = songs[currentIndex + 1];
    const currentSong = nextSong ?? songs[0];

    setCurrentMusic({ song: currentSong });
  }, [song, songs, setCurrentMusic]);

  const playPrevious = useCallback(() => {
    if (!songs || songs?.length === 0) return;

    const currentIndex = songs?.findIndex(({ id }) => id === song?.id);
    const previousSong = songs[currentIndex - 1];
    const currentSong = previousSong ?? songs[songs.length - 1];

    setCurrentMusic({ song: currentSong });
  }, [song, songs, setCurrentMusic]);

  return { ...player, ...audioPlayer, toggleMute, playNext, playPrevious };
}
