import { View, Text, TextInput, Button } from "react-native";

import { useState } from "react";
import { useSemesterStore } from "../../store/semesterStore";

export default function SetupScreen() {
  const createSemester = useSemesterStore((state) => state.createSemester);

  const [semesterName, setSemesterName] = useState("");

  return (
    <View
      style={{
        padding: 20,
        marginTop: 60,
      }}
    >
      <Text>Semester Name</Text>

      <TextInput
        value={semesterName}
        onChangeText={setSemesterName}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
        }}
      />

      <Button
        title="Create Semester"
        onPress={() => createSemester(semesterName, 75)}
      />
    </View>
  );
}
