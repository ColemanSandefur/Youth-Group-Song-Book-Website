"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Song } from "@/types/songs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import rawSongs from "@/data/songs.json";

export const defaultSongs = rawSongs.map(
  (song, idx) =>
    ({
      number: idx + 1,
      ...song,
    } as Song)
);

type SongContextType = {
  songs: Song[];
  loading: boolean;
  fetched: boolean;
  error: string | null;
};

const SongContext = createContext<SongContextType | undefined>(undefined);

export function useSongs() {
  const context = useContext(SongContext);
  if (!context) throw new Error("useSongs must be used within a SongProvider");
  return context;
}

export function SongProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<Song[]>(defaultSongs);
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await fetch("/api/songs");
        if (!res.ok) throw new Error("Failed to load songs");
        const data: Song[] = await res.json();
        setSongs(data);
        setFetched(true);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, []);

  return (
    <SongContext.Provider value={{ songs, loading, error, fetched }}>
      {children}
    </SongContext.Provider>
  );
}
