import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useSemesterStore } from "../store/semesterStore";

export default function SemesterSetupScreen() {
  const navigation = useNavigation<any>();

  const createSemester =
    useSemesterStore(
      (state) =>
        state.createSemester
    );

  const [semesterName, setSemesterName] =
    useState("");

  const [
    targetAttendance,
    setTargetAttendance,
  ] = useState("");

  const [
    totalPeriods,
    setTotalPeriods,
  ] = useState("");

  const handleCreate = () => {
    if (
      !semesterName ||
      !targetAttendance ||
      !totalPeriods
    ) {
      Alert.alert(
        "Error",
        "Fill all fields"
      );
      return;
    }

    createSemester(
      semesterName,
      Number(targetAttendance),
      Number(totalPeriods)
    );

    navigation.replace(
      "AddSubject"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Semester Setup
      </Text>

      <TextInput
        placeholder="Semester Name"
        value={semesterName}
        onChangeText={
          setSemesterName
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Target Attendance (%)"
        value={targetAttendance}
        onChangeText={
          setTargetAttendance
        }
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Total Semester Periods"
        value={totalPeriods}
        onChangeText={
          setTotalPeriods
        }
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreate}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 25,
      textAlign: "center",
    },

    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 14,
      marginBottom: 15,
    },

    button: {
      backgroundColor: "#2563eb",
      padding: 15,
      borderRadius: 10,
    },

    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "600",
      fontSize: 16,
    },
  });