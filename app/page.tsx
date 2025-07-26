import { getSongs } from "./api/songs/route";
import SongCard from "@/components/song-card";

export default async function Home() {
  return <SongList />;
}

async function SongList() {
  const songs = getSongs();

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
