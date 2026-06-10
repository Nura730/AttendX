import React, { useState } from "react";

import DailyAttendanceScreen from "./DailyAttendanceScreen";
import AttendanceHistoryScreen from "./AttendanceHistoryScreen";

export default function AttendanceScreen() {
  const [historyMode, setHistoryMode] =
    useState(false);

  return historyMode ? (
    <AttendanceHistoryScreen />
  ) : (
    <DailyAttendanceScreen />
  );
}