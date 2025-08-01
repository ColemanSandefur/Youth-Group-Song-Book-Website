"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInput,
  SidebarSeparator,
  useSidebar,
} from "./ui/sidebar";
import SongButton from "./song-button";
import { Label } from "@radix-ui/react-label";
import { Search } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useSongs } from "@/app/context/song-context";
import { useMemo, useState } from "react";
import { Song } from "@/types/songs";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { songs } = useSongs();
  const { setOpenMobile } = useSidebar();

  const [search, setSearch] = useState("");

  const filteredSongs = useMemo(
    () => searchSongs(songs, search),
    [search, songs]
  );

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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
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
            onClick={() => {
              setOpenMobile(false);
            }}
          />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

function searchSongs(songs: Song[], search: string) {
  const cleanse = (search: string) => {
    return (search ?? "").toLowerCase().replaceAll(/[^\w\d\s]/g, "");
  };

  const searchTerm = cleanse(search);

  return songs.filter(
    (song) =>
      cleanse(song.title).includes(searchTerm) ||
      song.number == Number.parseInt(searchTerm)
  );
}
