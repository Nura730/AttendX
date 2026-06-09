import {
  View,
  Text,
  Button,
} from "react-native";

import {
  useSemesterStore,
} from "../../store/semesterStore";

import {
  useAttendanceStore,
} from "../../store/attendanceStore";

export default function AttendanceScreen() {
  const semester =
    useSemesterStore(
      (state) => state.semester
    );

  const addAttendance =
    useAttendanceStore(
      (state) => state.addAttendance
    );

  if (!semester)
    return null;

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      {semester.subjects.map(
        (subject) => (
          <View
            key={subject.id}
            style={{
              marginBottom: 20,
            }}
          >
            <Text>
              {subject.name}
            </Text>

            <Button
              title="Present"
              onPress={() =>
                addAttendance(
                  subject.id,
                  "present"
                )
              }
            />

            <Button
              title="Absent"
              onPress={() =>
                addAttendance(
                  subject.id,
                  "absent"
                )
              }
            />
          </View>
        )
      )}
    </View>
  );
  const records =
  useAttendanceStore(
    (state) => state.records
  );

console.log(records);
}