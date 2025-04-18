import { create } from 'zustand';

interface SearchState {
  search: string;
  setSearch: (val: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: '',
  setSearch: (val) => set({ search: val }),
}));
