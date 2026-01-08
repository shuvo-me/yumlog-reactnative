import { create } from 'zustand'

export const useAuth = create((set) => ({
  session: null,
  setSession: (session: any) => set({ session }),
}))
