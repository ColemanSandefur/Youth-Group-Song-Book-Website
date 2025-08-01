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
import { ArrowDownAZ, ListOrdered, Search } from "lucide-react";
import { useSongs } from "@/app/context/song-context";
import { useMemo, useState } from "react";
import { Song } from "@/types/songs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { songs } = useSongs();

  const [search, setSearch] = useState("");
  const [sortingMode, setSortingMode] = useState("numerical");

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
        <Select value={sortingMode} onValueChange={setSortingMode}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a sorting mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alphabetical">
              <ArrowDownAZ />
              Alpabetical
            </SelectItem>
            <SelectItem value="numerical">
              <ListOrdered />
              Numerical
            </SelectItem>
          </SelectContent>
        </Select>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent>
        <SidebarList sortingMode={sortingMode} songs={filteredSongs} />
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

function SidebarList({
  sortingMode,
  songs,
}: {
  sortingMode: string;
  songs: Song[];
}) {
  const { setOpenMobile } = useSidebar();

  const songOrder = useMemo(() => {
    switch (sortingMode) {
      case "numerical":
        return songs.toSorted((a, b) => a.number - b.number);
      case "alphabetical":
        return songs.toSorted((a, b) => a.title.localeCompare(b.title));
      default:
        console.warn("Invalid sorting mode: ", sortingMode);
        return songs;
    }
  }, [sortingMode, songs]);

  return (
    <>
      {songOrder.map((song) => (
        <SongButton
          key={song.uuid}
          song={song}
          onClick={() => {
            setOpenMobile(false);
          }}
        />
      ))}
    </>
  );
}
