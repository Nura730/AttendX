import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

export default function SemesterScreen() {
  const [semesterName, setSemesterName] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [plannedPeriods, setPlannedPeriods] =
    useState("");

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

      <TextInput
        placeholder="Planned Total Periods"
        keyboardType="numeric"
        value={plannedPeriods}
        onChangeText={setPlannedPeriods}
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <Button
        title="Save Semester"
        onPress={() => {}}
      />
    </View>
  );
}