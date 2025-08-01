"use client";

import { Song } from "@/types/songs";
import { Button } from "./ui/button";
import { MouseEventHandler } from "react";
import { scrollToSong } from "@/lib/scrollToSong";
import { usePathname, useRouter } from "next/navigation";

export default function SongButton({
  song,
  onClick,
}: {
  song: Song;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const shouldRoute = pathname != "/";

  const scroll: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (shouldRoute) {
      router.push(`/?song=${song.uuid}`);
    } else {
      scrollToSong(song);
    }
    onClick?.(e);
  };

  return (
    <Button
      variant="link"
      className="text-left justify-start whitespace-normal"
      onClick={scroll}
    >
      {song.number}: {song.title}
    </Button>
  );
}
