import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase";

import { useAuthStore } from "../store/authStore";

export const useAuthListener = () => {
  const setUser =
    useAuthStore(
      (state) => state.setUser
    );

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {
          setUser(user);
        }
      );

    return unsubscribe;
  }, []);
};