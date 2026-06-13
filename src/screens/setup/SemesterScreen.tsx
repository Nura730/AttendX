import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";

import { useAuthStore } from "../../store/authStore";

import { useSemesterStore } from "../../store/semesterStore";

import { Semester } from "../../types/semester";

export default function SemesterScreen() {
  const [semesterName, setSemesterName] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const user = useAuthStore(
    (state) => state.user
  );

  const createSemester =
    useSemesterStore(
      (state) => state.createSemester
    );

  const handleSave =
    async () => {
      if (!user) {
        return;
      }

      if (
        !semesterName ||
        !startDate ||
        !endDate
      ) {
        Alert.alert(
          "Error",
          "Fill all fields"
        );
        return;
      }

      const semester: Semester = {
        id: Date.now().toString(),

        semesterName,

        startDate,

        endDate,

        conductedPeriods: 0,

        isActive: true,

        setupCompleted: false,

        createdAt:
          new Date().toISOString(),
      };

      try {
        await createSemester(
          semester,
          user.uid
        );

        Alert.alert(
          "Success",
          "Semester Saved"
        );
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
        Semester Setup
      </Text>

      <TextInput
        placeholder="Semester Name"
        value={semesterName}
        onChangeText={setSemesterName}
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <TextInput
        placeholder="Start Date"
        value={startDate}
        onChangeText={setStartDate}
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <TextInput
        placeholder="End Date"
        value={endDate}
        onChangeText={setEndDate}
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <Button
        title="Save Semester"
        onPress={handleSave}
      />
    </View>
  );
}