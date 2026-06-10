import { View, Text, TextInput, Button, ScrollView } from "react-native";

import { useState } from "react";

import SubjectForm from "../../components/common/SubjectForm";

import { useSemesterStore } from "../../store/semesterStore";

import { Alert } from "react-native";

export default function SetupScreen() {
  const createSemester = useSemesterStore((state) => state.createSemester);

  const addSubject = useSemesterStore((state) => state.addSubject);

  const semester = useSemesterStore((state) => state.semester);

  const [semesterName, setSemesterName] = useState("");

  const [created, setCreated] = useState(false);

  const resetSemester = useSemesterStore((state) => state.resetSemester);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        marginTop: 50,
      }}
    >
      {!created ? (
        <>
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
            onPress={() => {
              createSemester(semesterName, 75);

              setCreated(true);
            }}
          />
          <Button
            title="Reset Semester"
            color="red"
            onPress={() =>
              Alert.alert("Reset", "Delete all semester data?", [
                {
                  text: "Cancel",
                },
                {
                  text: "Delete",
                  onPress: () => resetSemester(),
                },
              ])
            }
          />
        </>
      ) : (
        <>
          <Text
            style={{
              fontSize: 24,
              marginBottom: 20,
            }}
          >
            {semester?.name}
          </Text>

          <SubjectForm onAdd={addSubject} />

          {semester?.subjects.map((subject) => (
            <Text
              key={subject.id}
              style={{
                marginTop: 10,
              }}
            >
              {subject.name}
              {" - "}
              {subject.facultyName}
            </Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}
