import { create } from "zustand";

import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  AttendanceRecord,
  AttendanceStatus,
} from "../types/attendance";

interface AttendanceStore {
  records: AttendanceRecord[];

  addAttendance: (
    subjectId: string,
    periodNumber: number,
    status: AttendanceStatus
  ) => void;

  clearAttendance: () => void;
}

export const useAttendanceStore =
  create<AttendanceStore>()(
    persist(
      (set) => ({
        records: [],

        addAttendance: (
          subjectId,
          periodNumber,
          status
        ) =>
          set((state) => ({
            records: [
              ...state.records,
              {
                id: Date.now().toString(),

                subjectId,

                periodNumber,

                status,

                date:
                  new Date()
                    .toISOString()
                    .split("T")[0],
              },
            ],
          })),

        clearAttendance: () =>
          set({
            records: [],
          }),
      }),
      {
        name: "attendance-storage",

        storage: createJSONStorage(
          () => AsyncStorage
        ),
      }
    )
  );