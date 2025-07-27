"use client";

import { useSongs } from "@/app/context/song-context";
import SongCard from "@/components/song-card";

export default function SongView({ songId }: { songId: number }) {
  const { songs } = useSongs();

  const song = songs.find((song) => song.number == songId);

  if (!song) {
    return <>No Songs found!</>;
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      <SongCard song={song} isFullscreen />
    </div>
  );
}
