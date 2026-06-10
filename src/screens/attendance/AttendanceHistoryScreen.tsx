import {
  View,
  Text,
  FlatList,
} from "react-native";

import { useAttendanceStore } from "../../store/attendanceStore";

export default function AttendanceHistoryScreen() {
  const records = useAttendanceStore(
    (state) => state.records
  );

  return (
    <FlatList
      data={[...records].reverse()}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            borderWidth: 1,
            margin: 10,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text>
            Date: {item.date}
          </Text>

          <Text>
            Period: {item.periodNumber}
          </Text>

          <Text>
            Status: {item.status}
          </Text>
        </View>
      )}
    />
  );
}