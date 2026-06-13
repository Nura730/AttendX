import { create } from "zustand";
import { Semester } from "../types/semester";
import {
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

interface SemesterState {
createSemester: (
  semester: Semester,
  uid: string
) => Promise<void>;
  semester: Semester | null;
  loading: boolean;

  setSemester: (
    semester: Semester | null
  ) => void;

  clearSemester: () => void;
}

export const useSemesterStore =
  create<SemesterState>((set) => ({
    createSemester: async (
  semester,
  uid
) => {
  await setDoc(
    doc(
      db,
      "users",
      uid,
      "semesters",
      "current"
    ),
    semester
  );

  set({
    semester,
  });
},
    semester: null,

    loading: false,

    setSemester: (semester) =>
      set({ semester }),

    clearSemester: () =>
      set({ semester: null }),
  }));