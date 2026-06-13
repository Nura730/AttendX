import { create } from "zustand";

import { Semester } from "../types/semester";

interface SemesterState {
  semester: Semester | null;

  loading: boolean;

  setSemester: (
    semester: Semester | null
  ) => void;
}

export const useSemesterStore =
  create<SemesterState>((set) => ({
    semester: null,

    loading: false,

    setSemester: (semester) =>
      set({ semester }),
  }));