import {
  View,
  Text,
  FlatList,
} from "react-native";

import { useArchiveStore } from "../../store/archiveStore";

export default function ArchiveScreen() {
  const archives =
    useArchiveStore(
      (state) =>
        state.archives
    );

  return (
    <FlatList
      data={archives}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            margin: 10,
            borderRadius: 10,
          }}
        >
          <Text>
            {item.name}
          </Text>

          <Text>
            Attendance:
            {item.attendance.toFixed(
              1
            )}
            %
          </Text>

          <Text>
            Subjects:
            {item.subjectCount}
          </Text>

          <Text>
            {item.completedAt}
          </Text>
        </View>
      )}
    />
  );
}