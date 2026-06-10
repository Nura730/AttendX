import { useState } from "react";
import DailyAttendanceScreen from "./DailyAttendanceScreen";
import { Button } from "react-native";
import AttendanceHistoryScreen from "./AttendanceHistoryScreen";


const [historyMode, setHistoryMode] =
  useState(false);

  <Button
  title={
    historyMode
      ? "Mark Attendance"
      : "View History"
  }
  onPress={() =>
    setHistoryMode(
      !historyMode
    )
  }
/>
  
export default function AttendanceScreen() {
  return historyMode ? (
  <AttendanceHistoryScreen />
) : (
  <DailyAttendanceScreen />
);
}