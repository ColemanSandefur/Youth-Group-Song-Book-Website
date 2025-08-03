"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Share, SquarePlus } from "lucide-react";

export default function InstallPrompt() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (!isStandalone && isIOS) {
      toast("Install Youth Group Songs", {
        duration: Infinity,
        action: {
          label: "Install",
          onClick: () => setOpen(true),
        },
      });
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Installing on iOS</DialogTitle>
          <DialogDescription>
            How to install Youth Group Songs on iOS
          </DialogDescription>
        </DialogHeader>
        <ol className="list-decimal gap-2">
          <li className="flex flex-row gap-2 mb-2">
            Press the Share Button <Share />
          </li>
          <li className="flex flex-row gap-2 mb-2">
            Press "Add to Home Screen" <SquarePlus />
          </li>
          <li className="flex flex-row gap-2 mb-2">
            Press "Add" at the top of the screen
          </li>
        </ol>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
