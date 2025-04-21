import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  search: string;
  setSearch: (val: string) => void;
  lastPagePopular: number;
  setLastPagePopular: (page: number) => void;
  lastPageTopRated: number;
  setLastPageTopRated: (page: number) => void;
  lastPageUpcoming: number;
  setLastPageUpcoming: (page: number) => void;
  lastPageNowPlaying: number;
  setLastPageNowPlaying: (page: number) => void;
  lastPageFavorites: number;
  setLastPageFavorites: (page: number) => void;
  lastPageWatchlist: number;
  setLastPageWatchlist: (page: number) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      search: '',
      setSearch: (val) => set({ search: val }),
      lastPagePopular: 1,
      setLastPagePopular: (page) => set({ lastPagePopular: page }),
      lastPageTopRated: 1,
      setLastPageTopRated: (page) => set({ lastPageTopRated: page }),
      lastPageUpcoming: 1,
      setLastPageUpcoming: (page) => set({ lastPageUpcoming: page }),
      lastPageNowPlaying: 1,
      setLastPageNowPlaying: (page) => set({ lastPageNowPlaying: page }),
      lastPageFavorites: 1,
      setLastPageFavorites: (page) => set({ lastPageFavorites: page }),
      lastPageWatchlist: 1,
      setLastPageWatchlist: (page) => set({ lastPageWatchlist: page }),
    }),
    {
      name: 'search-store',
    }
  )
);
