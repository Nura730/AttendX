import React from "react";

import { View, Text, Button, Alert } from "react-native";

import { signOut } from "firebase/auth";

import { auth } from "../../services/firebase";

import { useSemesterStore } from "../../store/semesterStore";

export default function SettingsScreen() {
  const semester = useSemesterStore((state) => state.semester);

  const semesters = useSemesterStore((state) => state.semesters);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        gap: 15,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Settings
      </Text>

      <Text>Current Semester</Text>

      <Text>{semester?.semesterName}</Text>

      <Text>Total Semesters: {semesters.length}</Text>

      <Button
        title="Semester History"
        onPress={() => Alert.alert("Next", "Semester History Screen")}
      />

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
