import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";

import { Subject } from "../../types/subject";

import { useSubjectStore } from "../../store/subjectStore";

import { useAuthStore } from "../../store/authStore";

import { useSemesterStore } from "../../store/semesterStore";

export default function SubjectScreen() {
  const semester =
    useSemesterStore(
      (state) => state.semester
    );

  const subjects =
    useSubjectStore(
      (state) => state.subjects
    );

  const createSubject =
    useSubjectStore(
      (state) =>
        state.createSubject
    );

  const user = useAuthStore(
    (state) => state.user
  );

  const [name, setName] =
    useState("");

  const [code, setCode] =
    useState("");

  const [
    targetAttendance,
    setTargetAttendance,
  ] = useState("75");

  const handleAdd =
    async () => {
      if (!user) return;

      if (!semester) {
        Alert.alert(
          "Error",
          "No active semester"
        );
        return;
      }

      if (!name.trim()) {
        Alert.alert(
          "Error",
          "Enter subject name"
        );
        return;
      }

      const subject: Subject = {
        id:
          Date.now().toString(),

        name,

        code,

        totalPeriods: 0,

        attendedPeriods: 0,

        targetAttendance:
          Number(
            targetAttendance
          ),

        isActive: true,

        createdAt:
          new Date().toISOString(),
      };

      try {
        await createSubject(
          subject,
          user.uid,
          semester.id
        );

        setName("");
        setCode("");

        Alert.alert(
          "Success",
          "Subject Added"
        );
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 12,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Add Subjects
      </Text>

      <TextInput
        placeholder="Subject Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <TextInput
        placeholder="Subject Code"
        value={code}
        onChangeText={setCode}
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <TextInput
        placeholder="Target Attendance %"
        value={targetAttendance}
        onChangeText={
          setTargetAttendance
        }
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <Button
        title="Add Subject"
        onPress={handleAdd}
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Subjects Added
      </Text>

      {subjects.map(
        (subject) => (
          <View
            key={subject.id}
            style={{
              borderWidth: 1,
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Text>
              {subject.name}
            </Text>

            <Text>
              Target:{" "}
              {
                subject.targetAttendance
              }
              %
            </Text>
          </View>
        )
      )}

      <Button
        title="Done Setup"
        onPress={() =>
          Alert.alert(
            "Next",
            "Dashboard coming next"
          )
        }
      />
    </ScrollView>
  );
}