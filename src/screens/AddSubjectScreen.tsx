import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useSemesterStore } from "../store/semesterStore";

export default function AddSubjectScreen() {
  const navigation = useNavigation<any>();

  const semester = useSemesterStore(
    (state) => state.semester
  );

  const addSubject = useSemesterStore(
    (state) => state.addSubject
  );

  const [subjectName, setSubjectName] =
    useState("");

  const [facultyName, setFacultyName] =
    useState("");

  const [totalPeriods, setTotalPeriods] =
    useState("");

    console.log("SEMESTER:", semester);
    console.log(
  "ADD SUBJECT SCREEN:",
  semester
);

  const handleAddSubject = () => {
    if (
      !subjectName.trim() ||
      !facultyName.trim() ||
      !totalPeriods.trim()
    ) {
      Alert.alert(
        "Error",
        "Fill all fields"
      );
      return;
    }

    addSubject(
      subjectName,
      facultyName,
      Number(totalPeriods)
    );

    setSubjectName("");
    setFacultyName("");
    setTotalPeriods("");
  };

  const handleContinue = () => {
    if (
      !semester ||
      semester.subjects.length === 0
    ) {
      Alert.alert(
        "Error",
        "Add at least one subject"
      );
      return;
    }

    navigation.replace("Dashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Add Subjects
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Subject Name"
        value={subjectName}
        onChangeText={setSubjectName}
      />

      <TextInput
        style={styles.input}
        placeholder="Faculty Name"
        value={facultyName}
        onChangeText={setFacultyName}
      />

      <TextInput
        style={styles.input}
        placeholder="Total Periods"
        keyboardType="numeric"
        value={totalPeriods}
        onChangeText={setTotalPeriods}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddSubject}
      >
        <Text style={styles.buttonText}>
          Add Subject
        </Text>
      </TouchableOpacity>

      <FlatList
        data={semester?.subjects ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.subjectCard}>
            <Text>
              {item.name}
            </Text>

            <Text>
              {item.facultyName}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
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
      padding: 20,
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
    },

    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
    },

    addButton: {
      backgroundColor: "#22c55e",
      padding: 14,
      borderRadius: 10,
      marginBottom: 20,
    },

    continueButton: {
      backgroundColor: "#2563eb",
      padding: 14,
      borderRadius: 10,
      marginTop: 20,
    },

    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },

    subjectCard: {
      padding: 12,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      marginBottom: 10,
    },
  });

