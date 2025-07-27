"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useFavorites } from "@/app/context/favorites-context";
import { useSongs } from "@/app/context/song-context";
import SongButton from "./song-button";
import { useState } from "react";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function FavoritesSheet() {
  const { favorites } = useFavorites();
  const { songs } = useSongs();

  const [open, setOpen] = useState(false);

  const favoriteSongs = songs.filter((song) => favorites.includes(song.uuid));
  // const favoriteSongs = songs;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Heart />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle>Favorites</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="overflow-y-auto flex flex-col gap-2">
          {favoriteSongs.length > 0 ? (
            favoriteSongs.map((song) => (
              <SongButton
                key={song.uuid}
                song={song}
                onClick={() => setOpen(false)}
              />
            ))
          ) : (
            <>
              <p className="px-4 pt-4">Your favorite songs will appear here.</p>
              <p className="px-4">
                Click the <Heart className="inline-block size-4" /> to favorite
                a song!
              </p>
            </>
          )}
        </div>
        <SheetFooter>
          <ClearFavoritesButton onConfirm={() => setOpen(false)} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ClearFavoritesButton({ onConfirm }: { onConfirm?: () => void }) {
  const { clearFavorites } = useFavorites();
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Clear</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently clear your
            favorite songs list.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              clearFavorites();
              closeDialog();
              onConfirm?.();
            }}
          >
            Remove All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
