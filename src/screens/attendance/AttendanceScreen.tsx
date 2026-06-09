import { View, Text, Button } from "react-native";

import { useSemesterStore } from "../../store/semesterStore";

import { useAttendanceStore } from "../../store/attendanceStore";

export default function AttendanceScreen() {
  const semester = useSemesterStore((state) => state.semester);

  const addAttendance = useAttendanceStore((state) => state.addAttendance);

  const records = useAttendanceStore((state) => state.records);

  console.log("ATTENDANCE RECORDS:", records);

  if (!semester) return null;

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      {semester.subjects.map((subject) => (
        <View
          key={subject.id}
          style={{
            marginBottom: 20,
          }}
        >
          <Text>{subject.name}</Text>

          <Button
            title="Present"
            onPress={() => addAttendance(subject.id,1, "present")}
          />

          <Button
            title="Absent"
            onPress={() => addAttendance(subject.id,1,   "absent")}
          />
        </View>
      ))}
    </View>
  );
}
