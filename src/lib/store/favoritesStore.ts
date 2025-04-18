import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUserStore } from './userStore';

interface FavoritesState {
  userFavorites: Record<string, number[]>;
  userWatchlist: Record<string, number[]>;
  toggleFavorite: (id: number) => void;
  toggleWatchlist: (id: number) => void;
  isFavorite: (id: number) => boolean;
  isInWatchlist: (id: number) => boolean;
  clearAll: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      userFavorites: {},
      userWatchlist: {},
      toggleFavorite: (id) => {
        const user = useUserStore.getState().user;
        if (!user) return;
        set((state) => {
          const uid = user.uid;
          const favs = state.userFavorites[uid] || [];
          const newFavs = favs.includes(id)
            ? favs.filter((fid) => fid !== id)
            : [...favs, id];
          return {
            userFavorites: { ...state.userFavorites, [uid]: newFavs },
          };
        });
      },
      toggleWatchlist: (id) => {
        const user = useUserStore.getState().user;
        if (!user) return;
        set((state) => {
          const uid = user.uid;
          const list = state.userWatchlist[uid] || [];
          const newList = list.includes(id)
            ? list.filter((wid) => wid !== id)
            : [...list, id];
          return {
            userWatchlist: { ...state.userWatchlist, [uid]: newList },
          };
        });
      },
      isFavorite: (id) => {
        const user = useUserStore.getState().user;
        if (!user) return false;
        return (get().userFavorites[user.uid] || []).includes(id);
      },
      isInWatchlist: (id) => {
        const user = useUserStore.getState().user;
        if (!user) return false;
        return (get().userWatchlist[user.uid] || []).includes(id);
      },
      clearAll: () => set({ userFavorites: {}, userWatchlist: {} }),
    }),
    {
      name: 'favorites-watchlist-storage',
    }
  )
);
