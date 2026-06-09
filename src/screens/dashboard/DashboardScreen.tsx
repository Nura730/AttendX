import SetupScreen from "../setup/SetupScreen";

import {
  View,
  Text,
} from "react-native";

import { useSemesterStore }
from "../../store/semesterStore";

import { useAttendanceStore }
from "../../store/attendanceStore";

import {
  calculateAttendance,
} from "../../utils/attendance";

export default function DashboardScreen() {
  const semester =
    useSemesterStore(
      (state) => state.semester
    );
const records =
  useAttendanceStore(
    (state) => state.records
  );
  if (!semester) {
    return <SetupScreen />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        {semester.name}
      </Text>

      <Text>
        Subjects:
        {" "}
        {semester.subjects.length}
      </Text>
    </View>
  );
  
}

