"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInput,
  SidebarSeparator,
} from "./ui/sidebar";
import SongButton from "./song-button";
import { Label } from "@radix-ui/react-label";
import { Search } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useSongs } from "@/app/context/song-context";
import { useEffect, useState } from "react";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { songs } = useSongs();

  const [filteredSongs, setFilteredSongs] = useState(songs);

  useEffect(() => {
    setFilteredSongs(songs);
  }, [songs]);

  const cleanse = (search: string) => {
    return (search ?? "").toLowerCase().replaceAll(/[^\w\d\s]/g, "");
  };

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <div className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Type to search..."
            className="h-8 pl-7"
            onChange={(e) => {
              if (!e.target) {
                setFilteredSongs(songs);
                return;
              }

              const searchTerm = cleanse(e.target.value);

              setFilteredSongs(
                songs.filter(
                  (song) =>
                    cleanse(song.title).includes(searchTerm) ||
                    song.number == Number.parseInt(searchTerm)
                )
              );
            }}
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </div>
        <Separator />
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent>
        {filteredSongs.map((song) => (
          <SongButton
            key={song.uuid}
            song={song}
            onClick={() => setFilteredSongs(songs)}
          />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
