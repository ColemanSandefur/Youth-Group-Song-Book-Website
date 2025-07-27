import rawSongs from "@/data/songs.json";
import { Song } from "@/types/songs";

const defaultSongs = rawSongs.map(
  (song, idx) =>
    ({
      number: idx + 1,
      ...song,
    } as Song)
);

export function getDefaultSongs() {
  return defaultSongs;
}
