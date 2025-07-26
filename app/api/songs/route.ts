import { NextResponse } from "next/server";
import rawSongs from "@/data/songs.json";
import { Song } from "@/types/songs";

const songs = rawSongs.map(
  (song, idx) =>
    ({
      number: idx + 1,
      ...song,
    } as Song)
);

export async function GET() {
  return NextResponse.json(songs);
}

export async function getSongs() {
  return songs;
}
