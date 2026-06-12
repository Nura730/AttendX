import React from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useSemesterStore } from "../store/semesterStore";

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  const semester = useSemesterStore(
    (state) => state.semester
  );

  if (!semester) {
    return (
      <View style={styles.center}>
        <Text>No Semester Found</Text>
      </View>
    );
  }

  const totalPresent =
    semester.subjects.reduce(
      (sum, subject) =>
        sum + subject.attendedPeriods,
      0
    );

  const totalAbsent =
    semester.subjects.reduce(
      (sum, subject) =>
        sum + subject.absentPeriods,
      0
    );

    const resetSemester =
  useSemesterStore(
    (state) => state.resetSemester
  );

  const overallAttendance =
    totalPresent + totalAbsent === 0
      ? 0
      : (
          (totalPresent /
            (totalPresent +
              totalAbsent)) *
          100
        ).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {semester.name}
      </Text>

      <Text style={styles.overall}>
        Overall Attendance:
        {" "}
        {overallAttendance}%
      </Text>

      <Text>
  Subjects:
  {semester.subjects.length}
</Text>

<Text>
  Present:
  {totalPresent}
</Text>

<Text>
  Absent:
  {totalAbsent}
</Text>

      <FlatList
        data={semester.subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const total =
            item.attendedPeriods +
            item.absentPeriods;

          const percentage =
            total === 0
              ? 0
              : (
                  (item.attendedPeriods /
                    total) *
                  100
                ).toFixed(1);

          return (
            <View style={styles.card}>
              <Text style={styles.subject}>
                {item.name}
              </Text>

              <Text>
                Faculty:
                {" "}
                {item.facultyName}
              </Text>

              <Text>
                Present:
                {" "}
                {item.attendedPeriods}
              </Text>

              <Text>
                Absent:
                {" "}
                {item.absentPeriods}
              </Text>

              <Text>
  Total Classes:
  {total}
</Text>

<Text
  style={{
    color:
      Number(percentage) >= 75
        ? "green"
        : "red",
    fontWeight: "bold",
  }}
>
  Attendance: {percentage}%
</Text>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            "DailyAttendance"
          )
        }
      >
        <Text style={styles.buttonText}>
          Mark Today's Attendance
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={{
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  }}
  onPress={() => {
    resetSemester();
    navigation.replace(
      "SemesterSetup"
    );
  }}
>
  <Text
    style={{
      color: "white",
      textAlign: "center",
    }}
  >
    Reset Semester
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

    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    heading: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 10,
    },

    overall: {
      fontSize: 18,
      marginBottom: 20,
      fontWeight: "600",
    },

    card: {
      padding: 15,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      marginBottom: 12,
    },

    subject: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
    },

    button: {
      backgroundColor: "#2563eb",
      padding: 15,
      borderRadius: 10,
      marginTop: 10,
    },

    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
  });