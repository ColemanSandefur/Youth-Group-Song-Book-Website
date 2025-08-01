"use client";

import { useSongs } from "@/app/context/song-context";
import SongCard from "./song-card";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { scrollToSong } from "@/lib/scrollToSong";

export default function SongList() {
  const { songs } = useSongs();

  return (
    <>
      <div className="flex flex-col p-4 gap-4">
        {songs.map((song) => (
          <SongCard key={song.uuid} song={song} />
        ))}
      </div>
      <Suspense>
        <ScrollToSong />
      </Suspense>
    </>
  );
}

function ScrollToSong() {
  const { songs } = useSongs();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const songId = params.get("song");
    const song = songs.find(({ uuid }) => uuid == songId);
    if (song) {
      scrollToSong(song);
    }
  }, [songs, params, router]);

  return null;
}
