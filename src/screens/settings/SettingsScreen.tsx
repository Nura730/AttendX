import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Button, Alert } from "react-native";

import { useSemesterStore } from "../../store/semesterStore";
import { useAttendanceStore } from "../../store/attendanceStore";

import { calculateAttendance } from "../../utils/attendance";
import { exportAttendancePDF } from "../../services/pdfService";

import { exportBackup, importBackup } from "../../services/backupService";
import { useArchiveStore } from "../../store/archiveStore";

export default function SettingsScreen() {
  const addArchive = useArchiveStore((state) => state.addArchive);

  const handleArchive = () => {
    if (!semester) return;

    const totalPresent = records.filter((r) => r.status === "PRESENT").length;

    const attendance =
      records.length === 0 ? 0 : (totalPresent / records.length) * 100;

    addArchive({
      id: Date.now().toString(),

      name: semester.name,

      completedAt: new Date().toLocaleDateString(),

      attendance,

      subjectCount: semester.subjects.length,
    });

    Alert.alert("Archived", "Semester saved.");
  };

  const [enabled, setEnabled] = useState(false);

  const semester = useSemesterStore((state) => state.semester);

  const restoreSemester = useSemesterStore((state) => state.restoreSemester);

  const records = useAttendanceStore((state) => state.records);

  const restoreRecords = useAttendanceStore((state) => state.restoreRecords);

  const backupData = {
    semester,
    records,
  };

  const handleExport = async () => {
    if (!semester) {
      Alert.alert("No Semester", "Please create a semester first.");
      return;
    }

    const data = semester.subjects.map((subject) => {
      const stats = calculateAttendance(records, subject.id);

      return {
        name: subject.name,
        percentage: stats.percentage,
      };
    });

    await exportAttendancePDF(semester.name, data, semester.targetAttendance);
  };

  const handleRestore = async () => {
    try {
      const backup = await importBackup();

      if (!backup) {
        return;
      }

      restoreSemester(backup.semester);

      restoreRecords(backup.records);

      Alert.alert("Success", "Backup restored successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to restore backup.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Daily Attendance Reminder</Text>

        <Switch
          value={enabled}
          onValueChange={async (value) => {
            setEnabled(value);

            if (value) {
              console.log("Notifications disabled in Expo Go");
            }
          }}
        />
      </View>

      <View style={styles.card}>
        <Button title="Export Attendance PDF" onPress={handleExport} />
      </View>

      <View style={styles.card}>
        <Button title="Backup Data" onPress={() => exportBackup(backupData)} />
      </View>

      <View style={styles.card}>
        <Button title="Restore Backup" onPress={handleRestore} />
      </View>

      <View style={styles.card}>
        <Button title="Archive Semester" onPress={handleArchive} />
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
