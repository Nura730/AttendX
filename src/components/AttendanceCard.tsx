import {
  View,
  Text,
  Button,
} from "react-native";

export default function AttendanceCard({
  subject,
  onPresent,
  onAbsent,
}: any) {
  return (
    <View>
      <Text>{subject.name}</Text>

      <Button
        title="Present"
        onPress={onPresent}
      />

      <Button
        title="Absent"
        onPress={onAbsent}
      />
    </View>
  );
}