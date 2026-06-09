import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Semester, Subject } from "../types/semester";

interface SemesterStore {
  semester: Semester | null;

  createSemester: (name: string, targetAttendance: number) => void;

  addSubject: (name: string, facultyName: string) => void;

  resetSemester: () => void;
}

export const useSemesterStore = create<SemesterStore>()(
  persist(
    (set) => ({
      semester: null,

      createSemester: (name, targetAttendance) =>
        set({
          semester: {
            id: Date.now().toString(),
            name,
            targetAttendance,
            subjects: [],
          },
        }),

      addSubject: (name, facultyName) =>
        set((state) => {
          if (!state.semester) return state;

          const newSubject: Subject = {
            id: Date.now().toString(),

            name,

            facultyName,
          };

          return {
            semester: {
              ...state.semester,

              subjects: [...state.semester.subjects, newSubject],
            },
          };
        }),

      resetSemester: () =>
        set({
          semester: null,
        }),
    }),
    {
      name: "attendx-storage",

      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
