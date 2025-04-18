import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: number[];
  watchlist: number[];
  toggleFavorite: (id: number) => void;
  toggleWatchlist: (id: number) => void;
  isFavorite: (id: number) => boolean;
  isInWatchlist: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fid) => fid !== id)
            : [...state.favorites, id],
        })),
      toggleWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.includes(id)
            ? state.watchlist.filter((wid) => wid !== id)
            : [...state.watchlist, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),
      isInWatchlist: (id) => get().watchlist.includes(id),
    }),
    {
      name: 'favorites-watchlist-storage',
    }
  )
);
