import { Song } from "@/types/songs";

export function scrollToSong(song: Song, behavior: ScrollBehavior = "smooth") {
  const element = document.getElementById(song.uuid);
  if (!element) return;

  const header = document.querySelector("header");

  const navbarOffset = header?.clientHeight ?? 80;
  const gapOffset = 10;

  const y =
    element.getBoundingClientRect().top +
    window.scrollY -
    navbarOffset -
    gapOffset;

  window.scrollTo({ top: y, behavior });
}
