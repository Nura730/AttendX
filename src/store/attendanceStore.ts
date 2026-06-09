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
    status: AttendanceStatus
  ) => void;
}

export const useAttendanceStore =
  create<AttendanceStore>()(
    persist(
      (set) => ({
        records: [],

        addAttendance: (
          subjectId,
          status
        ) =>
          set((state) => ({
            records: [
              ...state.records,
              {
                id: Date.now().toString(),

                subjectId,

                status,

                date:
                  new Date().toISOString(),
              },
            ],
          })),
      }),
      {
        name: "attendance-storage",

        storage:
          createJSONStorage(
            () => AsyncStorage
          ),
      }
    )
  );