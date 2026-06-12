import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Semester,
  Subject,
  UserProfile,
} from "../types/semester";

interface SemesterStore {
  user: UserProfile | null;

  semester: Semester | null;

  createUser: (
    userId: string,
    name: string,
    email: string
  ) => void;

  createSemester: (
    name: string,
    targetAttendance: number,
    totalSemesterPeriods: number
  ) => void;

  addSubject: (
    name: string,
    facultyName: string,
    totalPeriods: number
  ) => void;

  markAttendance: (
    subjectId: string,
    present: boolean
  ) => void;

  getAttendancePercentage: (
    subjectId: string
  ) => number;

  resetSemester: () => void;

  restoreSemester: (
    semester: Semester
  ) => void;
}

export const useSemesterStore =
  create<SemesterStore>()(
    persist(
      (set, get) => ({
        user: null,

        semester: null,

        createUser: (
          userId,
          name,
          email
        ) =>
          set({
            user: {
              userId,
              name,
              email,
            },
          }),

        createSemester: (
          name,
          targetAttendance,
          totalSemesterPeriods
        ) =>
          set({
            semester: {
              id: Date.now().toString(),
              name,
              targetAttendance,
              totalSemesterPeriods,
              subjects: [],
            },
          }),

        restoreSemester: (
          semester
        ) =>
          set({
            semester,
          }),

        addSubject: (
          name,
          facultyName,
          totalPeriods
        ) =>
          set((state) => {
            if (!state.semester)
              return state;

            const newSubject: Subject = {
              id: Date.now().toString(),
              name,
              facultyName,
              totalPeriods,
              attendedPeriods: 0,
              absentPeriods: 0,
            };

            return {
              semester: {
                ...state.semester,
                subjects: [
                  ...state.semester.subjects,
                  newSubject,
                ],
              },
            };
          }),

        markAttendance: (
          subjectId,
          present
        ) =>
          set((state) => {
            if (!state.semester)
              return state;

            return {
              semester: {
                ...state.semester,
                subjects:
                  state.semester.subjects.map(
                    (subject) => {
                      if (
                        subject.id !==
                        subjectId
                      ) {
                        return subject;
                      }

                      return {
                        ...subject,

                        attendedPeriods:
                          present
                            ? subject.attendedPeriods +
                              1
                            : subject.attendedPeriods,

                        absentPeriods:
                          !present
                            ? subject.absentPeriods +
                              1
                            : subject.absentPeriods,
                      };
                    }
                  ),
              },
            };
          }),

        getAttendancePercentage: (
          subjectId
        ) => {
          const semester =
            get().semester;

          if (!semester) return 0;

          const subject =
            semester.subjects.find(
              (s) =>
                s.id === subjectId
            );

          if (!subject) return 0;

          const totalClasses =
            subject.attendedPeriods +
            subject.absentPeriods;

          if (totalClasses === 0)
            return 0;

          return Number(
            (
              (subject.attendedPeriods /
                totalClasses) *
              100
            ).toFixed(1)
          );
        },

        resetSemester: () =>
          set({
            semester: null,
          }),
      }),
      {
        name: "attendx-storage",

        storage:
          createJSONStorage(
            () => AsyncStorage
          ),
      }
    )
  );