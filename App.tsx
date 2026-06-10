import BottomTabs from "./src/navigation/BottomTabs";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

useEffect(() => {
  async function initNotifications() {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status === "granted") {
      console.log("Notifications Enabled");
    }
  }

  initNotifications();
}, []);

export default function App() {
  return <BottomTabs />;
}




