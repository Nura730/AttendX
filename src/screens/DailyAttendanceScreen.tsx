import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useSemesterStore } from "../store/semesterStore";

export default function DailyAttendanceScreen() {
  const navigation = useNavigation<any>();

  const semester = useSemesterStore(
    (state) => state.semester
  );

  console.log(
  "DAILY SCREEN SEMESTER:",
  semester
);
  const markAttendance =
    useSemesterStore(
      (state) =>
        state.markAttendance
    );

  if (!semester) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Mark Attendance
      </Text>

<FlatList
  data={semester.subjects}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text style={styles.subject}>
        {item.name}
      </Text>

      <Text>
        Faculty: {item.facultyName}
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.presentBtn}
          onPress={() =>
            markAttendance(
              item.id,
              true
            )
          }
        >
          <Text>
            Present
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.absentBtn}
          onPress={() =>
            markAttendance(
              item.id,
              false
            )
          }
        >
          <Text>
            Absent
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
/>
      
      <TouchableOpacity
        style={styles.doneBtn}
        onPress={() =>
          navigation.goBack()
        }
      >
        <Text style={styles.doneText}>
          Done
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

    heading: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
    },

    card: {
      padding: 15,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      marginBottom: 15,
    },

    subject: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },

    row: {
      flexDirection: "row",
      justifyContent:
        "space-between",
    },

    presentBtn: {
      backgroundColor: "#22c55e",
      padding: 12,
      borderRadius: 10,
      width: "45%",
      alignItems: "center",
    },

    absentBtn: {
      backgroundColor: "#ef4444",
      padding: 12,
      borderRadius: 10,
      width: "45%",
      alignItems: "center",
    },

    doneBtn: {
      backgroundColor: "#2563eb",
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
    },

    doneText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
  });