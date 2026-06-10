import { create } from "zustand";

interface SettingsStore {
  notificationsEnabled: boolean;

  setNotificationsEnabled: (
    enabled: boolean
  ) => void;
}

export const useSettingsStore =
  create<SettingsStore>((set) => ({
    notificationsEnabled: false,

    setNotificationsEnabled: (
      enabled
    ) =>
      set({
        notificationsEnabled: enabled,
      }),
  }));