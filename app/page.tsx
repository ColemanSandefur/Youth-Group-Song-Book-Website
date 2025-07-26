import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSongs } from "./api/songs/route";

export default async function Home() {
  return <SongList />;
}

async function SongList() {
  const songs = getSongs();

  return (
    <>
      <div className="flex flex-col p-4 gap-4">
        {songs.map((song, i) => (
          <Card
            key={song.title + i}
            id={`song${song.number}`}
            className="w-full max-w-lg ml-auto mx-auto"
          >
            <CardHeader>
              <CardTitle className="text-lg">
                {song.number}: {song.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {song.lyrics.map((line, i) =>
                line == "" ? (
                  <br key={line + i} />
                ) : (
                  <p className="my-4" key={line + i}>
                    {line}
                  </p>
                )
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
