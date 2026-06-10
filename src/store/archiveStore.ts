import { create } from "zustand";

import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ArchivedSemester } from "../types/archive";

interface ArchiveStore {
  archives: ArchivedSemester[];

  addArchive: (
    archive: ArchivedSemester
  ) => void;
}

export const useArchiveStore =
  create<ArchiveStore>()(
    persist(
      (set) => ({
        archives: [],

        addArchive: (
          archive
        ) =>
          set((state) => ({
            archives: [
              archive,
              ...state.archives,
            ],
          })),
      }),
      {
        name: "archive-storage",

        storage:
          createJSONStorage(
            () => AsyncStorage
          ),
      }
    )
  );