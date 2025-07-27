"use client";

import { Song } from "@/types/songs";
import { Fullscreen, Heart, Shrink } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardAction,
} from "./ui/card";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SongCard({
  song,
  isFullscreen = false,
}: {
  song: Song;
  isFullscreen?: boolean;
}) {
  const [isHearted, setIsHearted] = useState(false);
  const router = useRouter();

  const toggleHearted = () => setIsHearted(!isHearted);

  return (
    <Card id={`song${song.number}`} className="w-full max-w-lg ml-auto mx-auto">
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
      <CardFooter className="flex justify-end">
        <CardAction>
          {isFullscreen ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => router.back()}
            >
              <Shrink />
            </Button>
          ) : (
            <Link href={`/song/${song.number}`}>
              <Button variant="ghost" size="icon" className="size-8">
                <Fullscreen />
              </Button>
            </Link>
          )}
          {isHearted ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-red-600 hover:text-red-600"
              onClick={toggleHearted}
            >
              <Heart className="fill-current" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={toggleHearted}
            >
              <Heart />
            </Button>
          )}
        </CardAction>
      </CardFooter>
    </Card>
  );
}
