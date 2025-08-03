/* eslint-disable react/no-unescaped-entities */
"use client";

import SongCard from "@/components/song-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Song } from "@/types/songs";
import { Link } from "lucide-react";
import { Suspense, useMemo } from "react";
import { useSongs } from "../context/song-context";
import { useSearchParams } from "next/navigation";

export default function SongViewPage() {
  return (
    <Suspense fallback={<SongView loading />}>
      <SongViewPopulated />
    </Suspense>
  );
}

function SongViewPopulated() {
  const { songs } = useSongs();

  const params = useSearchParams();
  const songId = params.get("id");

  const song = useMemo(
    () => songs.find((song) => song.uuid == songId),
    [songId, songs]
  );

  return <SongView song={song} loading={songId == null} />;
}

function SongView({
  song,
  loading = false,
}: {
  song?: Song;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="flex flex-col p-4 gap-4 justify-center items-center">
        <Skeleton className="max-w-lg w-full min-h-80" />
      </div>
    );
  }

  if (song == undefined) {
    return (
      <div className="flex flex-col p-4 gap-4 justify-center items-center">
        <Skeleton className="max-w-lg w-full min-h-80" />
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle>No Songs Found</CardTitle>
          </CardHeader>
          <CardContent>We cannot find the song you're looking for</CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      {song ? <SongCard song={song} isFullscreen /> : <>No Songs found!</>}
    </div>
  );
}
