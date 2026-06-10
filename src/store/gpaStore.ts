import { create } from "zustand";

interface GPAStore {
  subjects: {
    id: string;
    courseName: string;
    credits: number;
    grade: string;
  }[];

  addSubject: (
    subject: {
      id: string;
      courseName: string;
      credits: number;
      grade: string;
    }
  ) => void;
}

export const useGPAStore =
  create<GPAStore>((set) => ({
    subjects: [],

    addSubject: (subject) =>
      set((state) => ({
        subjects: [
          ...state.subjects,
          subject,
        ],
      })),
  }));