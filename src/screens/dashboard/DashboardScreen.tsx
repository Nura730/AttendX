import { View, Text, ScrollView } from "react-native";

import { useSemesterStore } from "../../store/semesterStore";
import { useAttendanceStore } from "../../store/attendanceStore";

import {
  calculateAttendance,
  canMissClasses,
  classesNeededToReachTarget,
} from "../../utils/attendance";

export default function DashboardScreen() {
  const semester = useSemesterStore(
    (state) => state.semester
  );

  const records = useAttendanceStore(
    (state) => state.records
  );

  if (!semester) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {semester.name}
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Target Attendance:{" "}
        {semester.targetAttendance}%
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Subjects: {semester.subjects.length}
      </Text>

      {semester.subjects.map((subject) => {
        const stats = calculateAttendance(
          records,
          subject.id
        );

        const canMiss = canMissClasses(
          stats.attended,
          stats.total,
          semester.targetAttendance
        );

        const needed =
          classesNeededToReachTarget(
            stats.attended,
            stats.total,
            semester.targetAttendance
          );

        const isSafe =
          stats.percentage >=
          semester.targetAttendance;

        return (
          <View
            key={subject.id}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              {subject.name}
            </Text>

            <Text>
              Attendance:{" "}
              {stats.percentage.toFixed(1)}%
            </Text>

            <Text>
              Present: {stats.attended}
            </Text>

            <Text>
              Total Classes: {stats.total}
            </Text>

            <Text>
              Can Miss: {canMiss}
            </Text>

            <Text>
              Need To Attend: {needed}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: isSafe
                  ? "green"
                  : "red",
                fontWeight: "bold",
              }}
            >
              Status:{" "}
              {isSafe
                ? "SAFE ✅"
                : "DANGER ⚠️"}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}