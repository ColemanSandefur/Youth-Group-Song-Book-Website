"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  setFavorites: (songIds: string[]) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (songId: string) => {
    if (isFavorite(songId)) {
      setFavorites(favorites.filter((id) => id != songId));
    } else {
      setFavorites([...favorites, songId]);
    }
  };

  const isFavorite = (songId: string) => favorites.includes(songId);

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        setFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
