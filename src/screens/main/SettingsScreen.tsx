import React from "react";

import { View, Text, Button, Alert } from "react-native";

import { signOut } from "firebase/auth";

import { auth } from "../../services/firebase";

import { useAuthStore } from "../../store/authStore";

import { useSemesterStore } from "../../store/semesterStore";

import { Semester } from "../../types/semester";

export default function SettingsScreen() {
  const user = useAuthStore((state) => state.user);

  const semester = useSemesterStore((state) => state.semester);

  const createNewSemester = useSemesterStore(
    (state) => state.createNewSemester,
  );

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCreateSemester = async () => {
    if (!user) {
      return;
    }

    Alert.alert(
      "Create New Semester",
      "Current semester will be archived and a new semester will become active.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Create",
          onPress: async () => {
            const newSemester: Semester = {
              id: Date.now().toString(),

              semesterName: "New Semester",

              startDate: new Date().toISOString().split("T")[0],

              endDate: "",

              conductedPeriods: 0,

              isActive: true,

              setupCompleted: false,

              createdAt: new Date().toISOString(),
            };

            await createNewSemester(newSemester, user.uid);

            Alert.alert("Success", "New semester created. Complete setup.");
          },
        },
      ],
    );
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
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Settings
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 15,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Current Semester
        </Text>

        <Text>{semester?.semesterName}</Text>
      </View>

      <Button title="Create New Semester" onPress={handleCreateSemester} />

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
