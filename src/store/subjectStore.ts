import { create } from "zustand";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
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

  loadSubjects: (
    uid: string,
    semesterId: string
  ) => Promise<void>;

  updateSubject: (
    subject: Subject,
    uid: string,
    semesterId: string
  ) => Promise<void>;

  deleteSubject: (
    subjectId: string,
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
        set({
          loading: false,
        });
      }
    },

    loadSubjects: async (
      uid,
      semesterId
    ) => {
      set({ loading: true });

      try {
        const snapshot =
          await getDocs(
            collection(
              db,
              "users",
              uid,
              "semesters",
              semesterId,
              "subjects"
            )
          );

        const subjects =
          snapshot.docs.map(
            (doc) =>
              doc.data() as Subject
          );

        set({
          subjects,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    updateSubject: async (
      subject,
      uid,
      semesterId
    ) => {
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
        subjects:
          state.subjects.map((s) =>
            s.id === subject.id
              ? subject
              : s
          ),
      }));
    },

    deleteSubject: async (
      subjectId,
      uid,
      semesterId
    ) => {
      await deleteDoc(
        doc(
          db,
          "users",
          uid,
          "semesters",
          semesterId,
          "subjects",
          subjectId
        )
      );

      set((state) => ({
        subjects:
          state.subjects.filter(
            (subject) =>
              subject.id !==
              subjectId
          ),
      }));
    },

    setSubjects: (
      subjects
    ) =>
      set({
        subjects,
      }),

    clearSubjects: () =>
      set({
        subjects: [],
      }),
  }));