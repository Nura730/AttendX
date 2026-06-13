import { create } from "zustand";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";

import { auth } from "../services/firebase";

interface AuthState {
  user: FirebaseUser | null;

  loading: boolean;

  register: (
    email: string,
    password: string
  ) => Promise<void>;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => Promise<void>;

  setUser: (
    user: FirebaseUser | null
  ) => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    loading: false,

    setUser: (user) =>
      set({ user }),

    register: async (
      email,
      password
    ) => {
      set({ loading: true });

      try {
        const result =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        set({
          user: result.user,
        });
      } finally {
        set({ loading: false });
      }
    },

    login: async (
      email,
      password
    ) => {
      set({ loading: true });

      try {
        const result =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        set({
          user: result.user,
        });
      } finally {
        set({ loading: false });
      }
    },

    logout: async () => {
      await signOut(auth);

      set({
        user: null,
      });
    },
  }));