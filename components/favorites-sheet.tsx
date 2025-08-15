"use client";

import { Heart, X } from "lucide-react";
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
import { AnimatePresence, motion } from "motion/react";

export default function FavoritesSheet() {
  const { favorites, toggleFavorite } = useFavorites();
  const { songs } = useSongs();

  const [open, setOpen] = useState(false);

  const favoriteSongs = songs.filter((song) => favorites.includes(song.uuid));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Heart />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full gap-0">
        <SheetHeader>
          <SheetTitle>Favorites</SheetTitle>
        </SheetHeader>
        <Separator />
        <motion.div
          layout
          className="flex-1 overflow-y-auto overflow-x-hidden p-2 flex flex-col gap-2"
        >
          {favoriteSongs.length > 0 ? (
            <AnimatePresence>
              {favoriteSongs.map((song) => (
                <motion.div
                  layout
                  key={song.uuid}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.1 }}
                  className="flex flex-row items-center"
                >
                  <span className="grow">
                    <SongButton song={song} onClick={() => setOpen(false)} />
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => toggleFavorite(song.uuid)}
                  >
                    <X className="text-muted-foreground" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div
              layout
              initial={{ scale: 0.9, x: -20 }}
              animate={{ scale: 1.0, x: 0 }}
              className="px-4 pt-4"
            >
              <p>Your favorite songs will appear here.</p>
              <p>
                Click the <Heart className="inline-block size-4" /> to favorite
                a song!
              </p>
            </motion.div>
          )}
        </motion.div>
        <Separator />
        <SheetFooter className="mt-auto">
          <ClearFavoritesButton onConfirm={() => setOpen(false)} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ClearFavoritesButton({ onConfirm }: { onConfirm?: () => void }) {
  const { favorites, clearFavorites } = useFavorites();
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={favorites.length === 0}>Clear</Button>
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
