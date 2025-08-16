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
import {
  AlertCircleIcon,
  ArrowDownAZ,
  ListOrdered,
  Search,
  X,
} from "lucide-react";
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
import Fuse from "fuse.js";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AnimatePresence, motion, ValueTransition } from "motion/react";
import { Button } from "./ui/button";

type FilterMode = "none" | "numerical" | "alphabetical";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { songs } = useSongs();

  const [search, setSearch] = useState("");
  const hasSearch = search !== "";

  const [sortingMode, setSortingMode] = useState<FilterMode>("numerical");

  const fuse = useMemo(
    () =>
      new Fuse(songs, {
        keys: [
          { name: "title", weight: 0.7 },
          { name: "lyrics", weight: 0.3 },
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    [songs]
  );

  const filteredSongs = useMemo(() => {
    if (hasSearch) {
      return fuse.search(search).map((item) => item.item);
    } else {
      return songs;
    }
  }, [hasSearch, fuse, search, songs]);

  const searchTransition: ValueTransition = {
    duration: 0.15,
    ease: "easeInOut",
  };

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <motion.div
          layout
          className="flex flex-row items-center gap-2"
          transition={{ layout: searchTransition }}
        >
          <motion.div
            layout
            className="relative grow"
            transition={searchTransition}
          >
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <SidebarInput
              id="search"
              placeholder="Type to search..."
              className="h-8 pl-7"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          </motion.div>
          <AnimatePresence initial={false} mode="popLayout">
            {hasSearch && (
              <motion.div
                layout
                variants={{
                  hidden: { scaleX: 0, originX: 1, opacity: 0 },
                  visible: { scaleX: 1, originX: 1, opacity: 1 },
                }}
                initial={"hidden"}
                animate={"visible"}
                exit={"hidden"}
                transition={searchTransition}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => setSearch("")}
                >
                  <X />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <Select
          value={sortingMode}
          onValueChange={(value) => setSortingMode(value as FilterMode)}
        >
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
        <SidebarList
          sortingMode={hasSearch ? "none" : sortingMode}
          songs={filteredSongs}
        />
      </SidebarContent>
    </Sidebar>
  );
}

function SidebarList({
  sortingMode,
  songs,
}: {
  sortingMode: "none" | "numerical" | "alphabetical";
  songs: Song[];
}) {
  const { setOpenMobile } = useSidebar();

  const songOrder = useMemo(() => {
    switch (sortingMode) {
      case "numerical":
        return songs.toSorted((a, b) => a.number - b.number);
      case "alphabetical":
        return songs.toSorted((a, b) => a.title.localeCompare(b.title));
      case "none":
        return songs;
      default:
        console.warn("Invalid sorting mode: ", sortingMode);
        return songs;
    }
  }, [sortingMode, songs]);

  if (songs.length === 0) {
    return (
      <motion.div className="m-2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Alert>
          <AlertCircleIcon />
          <AlertTitle>No songs found</AlertTitle>
          <AlertDescription>Try another search</AlertDescription>
        </Alert>
      </motion.div>
    );
  }

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
