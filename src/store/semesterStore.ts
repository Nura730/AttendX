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

  semesters: Semester[];

  loading: boolean;

  createSemester: (
    semester: Semester,
    uid: string
  ) => Promise<void>;

  createNewSemester: (
    semester: Semester,
    uid: string
  ) => Promise<void>;

  loadSemester: (
    uid: string
  ) => Promise<void>;

  loadAllSemesters: (
    uid: string
  ) => Promise<void>;

  completeSetup: (
    uid: string
  ) => Promise<void>;

  setSemester: (
    semester: Semester | null
  ) => void;

  clearSemester: () => void;
}

export const useSemesterStore =
  create<SemesterState>((set, get) => ({
    semester: null,

    semesters: [],

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

    createNewSemester: async (
      semester,
      uid
    ) => {
      const currentSemester =
        get().semester;

      if (currentSemester) {
        const inactiveSemester = {
          ...currentSemester,
          isActive: false,
        };

        await setDoc(
          doc(
            db,
            "users",
            uid,
            "semesters",
            currentSemester.id
          ),
          inactiveSemester
        );
      }

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

          semesters,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    loadAllSemesters: async (
      uid
    ) => {
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

      set({
        semesters,
      });
    },

    completeSetup: async (
      uid
    ) => {
      const semester =
        get().semester;

      if (!semester) {
        return;
      }

      const updatedSemester = {
        ...semester,

        setupCompleted: true,
      };

      await setDoc(
        doc(
          db,
          "users",
          uid,
          "semesters",
          semester.id
        ),
        updatedSemester
      );

      set({
        semester:
          updatedSemester,
      });
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