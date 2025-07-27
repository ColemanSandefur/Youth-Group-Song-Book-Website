import { defaultSongs } from "@/app/context/song-context";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(defaultSongs);
}
