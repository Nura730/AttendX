import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";

import BottomTabs from "./src/navigation/BottomTabs";

export default function App() {
  useEffect(() => {
    async function initNotifications() {
      const { status } =
        await Notifications.requestPermissionsAsync();

      if (status === "granted") {
        console.log(
          "Notifications Enabled"
        );
      }
    }

    initNotifications();
  }, []);

  return <BottomTabs />;
}