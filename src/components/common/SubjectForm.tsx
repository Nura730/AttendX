import {
  View,
  TextInput,
  Button,
} from "react-native";

import { useState } from "react";

interface Props {
  onAdd: (
    name: string,
    facultyName: string
  ) => void;
}

export default function SubjectForm({
  onAdd,
}: Props) {
  const [name, setName] = useState("");

  const [faculty, setFaculty] =
    useState("");

  return (
    <View>
      <TextInput
        placeholder="Subject Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          marginVertical: 8,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="Faculty Name"
        value={faculty}
        onChangeText={setFaculty}
        style={{
          borderWidth: 1,
          marginVertical: 8,
          padding: 10,
        }}
      />

      <Button
        title="Add Subject"
        onPress={() => {
          onAdd(name, faculty);

          setName("");
          setFaculty("");
        }}
      />
    </View>
  );
}