import { Switch } from "react-native";
import * as Notifications from "expo-notifications";
import { useState } from "react";
import { scheduleDailyReminder } from "../../services/notificationService";

const [enabled, setEnabled] =
  useState(false);

<Switch
  value={enabled}
  onValueChange={async (value) => {
    setEnabled(value);

    if (value) {
      await scheduleDailyReminder();
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  }}
/>