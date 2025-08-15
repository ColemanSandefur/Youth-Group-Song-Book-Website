"use client";

import { Song } from "@/types/songs";
import { Expand, Heart, Shrink } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardAction,
} from "./ui/card";
import Link from "next/link";
import { useFavorites } from "@/app/context/favorites-context";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function SongCard({
  song,
  isFullscreen = false,
}: {
  song: Song;
  isFullscreen?: boolean;
}) {
  return (
    <Card id={song.uuid} className="w-full max-w-lg ml-auto mx-auto">
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
          <ExpandButton song={song} isFullscreen={isFullscreen} />
          <FavoriteButton song={song} />
        </CardAction>
      </CardFooter>
    </Card>
  );
}

function ExpandButton({
  song,
  isFullscreen,
}: {
  song: Song;
  isFullscreen: boolean;
}) {
  const href = isFullscreen ? `/?song=${song.uuid}` : `/song?id=${song.uuid}`;

  return (
    <Link href={href} prefetch>
      <Button variant="ghost" size="icon" className="size-8">
        {isFullscreen ? <Shrink /> : <Expand />}
      </Button>
    </Link>
  );
}

function FavoriteButton({ song }: { song: Song }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(song.uuid);

  const [justFavorited, setJustFavorited] = useState(false);

  useEffect(() => {
    if (justFavorited) {
      const timer = setTimeout(() => setJustFavorited(false), 500);
      return () => clearTimeout(timer);
    }
  }, [justFavorited]);

  const onClick = () => {
    if (!favorited) {
      setJustFavorited(true);
    }
    toggleFavorite(song.uuid);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`size-8 ${favorited ? "text-red-600 hover:text-red-600" : ""}`}
      onClick={onClick}
    >
      <motion.div
        animate={justFavorited ? "favorited" : "normal"}
        variants={{
          favorited: {
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0, -5, 0, 5, 0],
          },
          normal: {},
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Heart className={favorited ? "fill-current" : ""} />
      </motion.div>
    </Button>
  );
}
