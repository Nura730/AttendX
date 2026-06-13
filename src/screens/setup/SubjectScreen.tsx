import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
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

  
  const [name, setName] =
    useState("");

  const [code, setCode] =
    useState("");

  const [targetAttendance,
    setTargetAttendance] =
    useState("75");

  const user = useAuthStore(
    (state) => state.user
  );

  const createSubject =
    useSubjectStore(
      (state) =>
        state.createSubject
    );

  const handleAdd =
    async () => {
      if (!user) return;

      const subject: Subject = {
        id: Date.now().toString(),

        name,

        code,

        totalPeriods: 0,

        attendedPeriods: 0,

        targetAttendance:
          Number(targetAttendance),

        isActive: true,

        createdAt:
          new Date().toISOString(),
      };

      try {
        await createSubject(
          subject,
          user.uid,
          "REPLACE_SEMESTER_ID"
        );

        Alert.alert(
          "Success",
          "Subject Added"
        );

        setName("");
        setCode("");
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Add Subject
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
    </View>
  );
}