import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserSession = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: string | undefined;
};

type AuthState = {
  session: UserSession | null;
  setSession: (session: UserSession) => void;
  _isHydrated: boolean;
  setIsHydrated: (_isHydrated: boolean) => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      setSession: (session: UserSession) => set({ session }),
      _isHydrated: false,
      setIsHydrated: (_isHydrated: boolean) => set({ _isHydrated }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ session: state.session }),
      storage: createJSONStorage(() =>
        Platform.OS === "web" ? localStorage : AsyncStorage
      ),
      onRehydrateStorage: (state) => {
        return () => state.setIsHydrated(true);
      },
    }
  )
);
