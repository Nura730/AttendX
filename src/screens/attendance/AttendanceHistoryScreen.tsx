import { ScrollView, Text, View, Button } from "react-native";

import { useAttendanceStore } from "../../store/attendanceStore";
import { useSemesterStore } from "../../store/semesterStore";

export default function AttendanceHistoryScreen() {
  const records = useAttendanceStore((state) => state.records);

  const deleteAttendance = useAttendanceStore(
    (state) => state.deleteAttendance,
  );

  const semester = useSemesterStore((state) => state.semester);

  const getSubjectName = (subjectId: string) => {
    return (
      semester?.subjects.find((s) => s.id === subjectId)?.name || "Unknown"
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Attendance History
      </Text>

      {records.length === 0 && <Text>No attendance records found.</Text>}

      {records.map((record) => (
        <View
          key={record.id}
          style={{
            borderWidth: 1,
            padding: 12,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text>Date: {record.date}</Text>

          <Text>Period: {record.periodNumber}</Text>

          <Text>Subject: {getSubjectName(record.subjectId)}</Text>

          <Text>Status: {record.status}</Text>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteAttendance(record.id)}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
