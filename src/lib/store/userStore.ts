import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
    email: string | null;
  } | null;
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'user-auth-store' }
  )
);
