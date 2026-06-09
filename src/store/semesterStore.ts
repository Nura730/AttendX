import { create } from "zustand";

import { persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Semester,
  Subject,
} from "../types/semester";

interface SemesterStore {
  semester: Semester | null;

  createSemester: (
    name: string,
    targetAttendance: number
  ) => void;

  addSubject: (
    name: string,
    facultyName: string
  ) => void;

  resetSemester: () => void;
}

export const useSemesterStore =
  create<SemesterStore>()(
    persist(
      (set) => ({
        semester: null,

        createSemester: (
          name,
          targetAttendance
        ) =>
          set({
            semester: {
              id: Date.now().toString(),
              name,
              targetAttendance,
              subjects: [],
            },
          }),

        addSubject: (
          name,
          facultyName
        ) =>
          set((state) => {
            if (!state.semester)
              return state;

            const newSubject: Subject = {
              id: Date.now().toString(),

              name,

              facultyName,

              attendedPeriods: 0,

              totalPeriods: 0,
            };

            return {
              semester: {
                ...state.semester,

                subjects: [
                  ...state.semester
                    .subjects,
                  newSubject,
                ],
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

        storage: {
          getItem: async (name) => {
            const value =
              await AsyncStorage.getItem(
                name
              );

            return value
              ? JSON.parse(value)
              : null;
          },

          setItem: async (
            name,
            value
          ) => {
            await AsyncStorage.setItem(
              name,
              JSON.stringify(value)
            );
          },

          removeItem: async (
            name
          ) => {
            await AsyncStorage.removeItem(
              name
            );
          },
        },
      }
    )
  );