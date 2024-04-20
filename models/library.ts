// TYPES
import type { Song } from "./song";

export interface LibraryData {
  songs: Song[] | null;
  liked_songs: number;
}
