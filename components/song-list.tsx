"use client";

import { useSongs } from "@/app/context/song-context";
import SongCard from "./song-card";

export default function SongList() {
  const { songs } = useSongs();

  return (
    <>
      <div className="flex flex-col p-4 gap-4">
        {songs.map((song) => (
          <SongCard key={song.number + song.title} song={song} />
        ))}
      </div>
    </>
  );
}
