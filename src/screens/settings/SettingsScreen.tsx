import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Button,
  Alert,
} from "react-native";

import * as Notifications from "expo-notifications";

import { useSemesterStore } from "../../store/semesterStore";
import { useAttendanceStore } from "../../store/attendanceStore";

import { calculateAttendance } from "../../utils/attendance";

import { scheduleDailyReminder } from "../../services/notificationService";
import { exportAttendancePDF } from "../../services/pdfService";

export default function SettingsScreen() {
  const [enabled, setEnabled] = useState(false);

  const semester = useSemesterStore(
    (state) => state.semester
  );

  const records = useAttendanceStore(
    (state) => state.records
  );

  const handleExport = async () => {
    if (!semester) {
      Alert.alert(
        "No Semester",
        "Please create a semester first."
      );
      return;
    }

    const data = semester.subjects.map(
      (subject) => {
        const stats = calculateAttendance(
          records,
          subject.id
        );

        return {
          name: subject.name,
          percentage: stats.percentage,
        };
      }
    );

    await exportAttendancePDF(
      semester.name,
      data,
      semester.targetAttendance
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ⚙️ Settings
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Daily Attendance Reminder
        </Text>

        <Switch
          value={enabled}
          onValueChange={async (value) => {
            setEnabled(value);

            if (value) {
              await scheduleDailyReminder();
            } else {
              await Notifications.cancelAllScheduledNotificationsAsync();
            }
          }}
        />
      </View>

      <View style={styles.card}>
        <Button
          title="Export Attendance PDF"
          onPress={handleExport}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});