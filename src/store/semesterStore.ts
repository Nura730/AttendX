import { create } from "zustand";
import { Semester, Subject } from "../types/semester";

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
}

export const useSemesterStore =
  create<SemesterStore>((set) => ({
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
        if (!state.semester) return state;

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
              ...state.semester.subjects,
              newSubject,
            ],
          },
        };
      }),
  }));