import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase";

import { useAuthStore } from "../store/authStore";
import { useSemesterStore } from "../store/semesterStore";

export const useAuthListener = () => {
  const setUser =
    useAuthStore(
      (state) => state.setUser
    );

  const loadSemester =
    useSemesterStore(
      (state) => state.loadSemester
    );

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          setUser(user);

          if (user) {
            await loadSemester(
              user.uid
            );
          }
        }
      );

    return unsubscribe;
  }, []);
};