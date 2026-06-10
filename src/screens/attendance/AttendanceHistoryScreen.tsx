import {
  FlatList,
  View,
  Text,
  Button,
} from "react-native";

import { useAttendanceStore } from "../../store/attendanceStore";

export default function AttendanceHistoryScreen() {
  const deleteAttendance =
  useAttendanceStore(
    (state) => state.deleteAttendance
  );
  const records = useAttendanceStore(
    (state) => state.records
  );

  return (
    <FlatList
      data={[...records].reverse()}
      keyExtractor={(item, index) =>
  `${item.id}-${index}`
}
      renderItem={({ item }) => (
        <View
          style={{
            borderWidth: 1,
            margin: 10,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text>Date: {item.date}</Text>

          <Text>
            Period: {item.periodNumber}
          </Text>

          <Text>
            Status: {item.status}
          </Text>

          <Button
  title="Delete"
  color="red"
  onPress={() =>
    deleteAttendance(item.id)
  }
/>
        </View>
      )}
    />
  );
}