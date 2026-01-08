import { User } from '@firebase/auth';
import { create } from 'zustand';

type AuthState = {
  session: User | any;
  setSession: (session: User) => void;
}

export const useAuth = create<AuthState>((set) => ({
  session: null,
  setSession: (session: any) => set({ session }),
}))
