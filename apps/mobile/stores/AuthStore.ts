import { create } from 'zustand';

export interface AuthStoreState {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  email: '',
  setEmail: (email: string) => set({ email }),
  password: '',
  setPassword: (password: string) => set({ password }),
}));
