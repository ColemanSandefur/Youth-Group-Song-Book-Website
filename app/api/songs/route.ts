import { NextResponse } from 'next/server';
import songs from '@/data/songs.json';
import { Song } from '@/types/songs';

export async function GET() {
  const typedSongs: Song[] = songs;
  return NextResponse.json(typedSongs);
}

