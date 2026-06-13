import { create } from "zustand";

import {
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

import { Subject } from "../types/subject";

interface SubjectState {
  subjects: Subject[];

  loading: boolean;

  createSubject: (
    subject: Subject,
    uid: string,
    semesterId: string
  ) => Promise<void>;

  setSubjects: (
    subjects: Subject[]
  ) => void;

  clearSubjects: () => void;
}

export const useSubjectStore =
  create<SubjectState>((set) => ({
    subjects: [],

    loading: false,

    createSubject: async (
      subject,
      uid,
      semesterId
    ) => {
      set({ loading: true });

      try {
        await setDoc(
          doc(
            db,
            "users",
            uid,
            "semesters",
            semesterId,
            "subjects",
            subject.id
          ),
          subject
        );

        set((state) => ({
          subjects: [
            ...state.subjects,
            subject,
          ],
        }));
      } finally {
        set({ loading: false });
      }
    },

    setSubjects: (subjects) =>
      set({ subjects }),

    clearSubjects: () =>
      set({ subjects: [] }),
  }));