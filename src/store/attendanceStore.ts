import { create } from "zustand";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

import {
  AttendanceDay,
} from "../types/attendance";

interface AttendanceState {
  loading: boolean;

  saveAttendance: (
    attendance: AttendanceDay,
    uid: string,
    semesterId: string
  ) => Promise<void>;
}

export const useAttendanceStore =
  create<AttendanceState>(() => ({
    loading: false,

    saveAttendance: async (
      attendance,
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
          "attendance",
          attendance.date
        ),
        attendance
      );
    },
  }));