import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  search: string;
  setSearch: (val: string) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      search: '',
      setSearch: (val) => set({ search: val }),
    }),
    {
      name: 'search-store',
    }
  )
);
