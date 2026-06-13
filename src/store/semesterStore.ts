import { create } from "zustand";

import {
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../services/firebase";

import { Semester } from "../types/semester";

interface SemesterState {
  semester: Semester | null;

  loading: boolean;

  createSemester: (
    semester: Semester,
    uid: string
  ) => Promise<void>;

  loadSemester: (
    uid: string
  ) => Promise<void>;

  setSemester: (
    semester: Semester | null
  ) => void;

  clearSemester: () => void;
}

export const useSemesterStore =
  create<SemesterState>((set) => ({
    semester: null,

    loading: false,

    createSemester: async (
      semester,
      uid
    ) => {
      set({ loading: true });

      try {
        await setDoc(
          doc(
            db,
            "users",
            uid,
            "semesters",
            semester.id
          ),
          semester
        );

        set({
          semester,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    loadSemester: async (
      uid
    ) => {
      set({ loading: true });

      try {
        const snapshot =
          await getDocs(
            collection(
              db,
              "users",
              uid,
              "semesters"
            )
          );

        const semesters =
          snapshot.docs.map(
            (doc) =>
              doc.data() as Semester
          );

        const activeSemester =
          semesters.find(
            (semester) =>
              semester.isActive
          );

        set({
          semester:
            activeSemester || null,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    setSemester: (
      semester
    ) =>
      set({
        semester,
      }),

    clearSemester: () =>
      set({
        semester: null,
      }),
  }));