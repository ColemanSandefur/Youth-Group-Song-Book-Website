"use client";

import { Song } from "@/types/songs";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export default function SongButton({ song }: { song: Song }) {
  const { setOpenMobile } = useSidebar();

  return (
    <Button
      variant="link"
      className="text-left justify-start whitespace-normal"
      onClick={() => {
        const element = document.getElementById(`song${song.number}`);
        if (!element) return;

        const header = document.querySelector("header");

        const offset = header?.clientHeight ?? 80;

        const y = element.getBoundingClientRect().top + window.scrollY - offset;

        setOpenMobile(false);

        window.scrollTo({ top: y, behavior: "smooth" });
      }}
    >
      {song.number}: {song.title}
    </Button>
  );
}
