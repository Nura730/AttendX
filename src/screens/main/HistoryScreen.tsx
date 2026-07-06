import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Button,
} from "react-native";

import { Calendar } from "react-native-calendars";

import { useAuthStore } from "../../store/authStore";
import { useSemesterStore } from "../../store/semesterStore";
import { useAttendanceStore } from "../../store/attendanceStore";
import { useSubjectStore } from "../../store/subjectStore";

import { AttendanceDay } from "../../types/attendance";

export default function HistoryScreen() {
  const user = useAuthStore((state) => state.user);

  const semester = useSemesterStore((state) => state.semester);

  const attendanceHistory = useAttendanceStore(
    (state) => state.attendanceHistory,
  );

  const subjects = useSubjectStore((state) => state.subjects);

  const loadAttendanceHistory = useAttendanceStore(
    (state) => state.loadAttendanceHistory,
  );

  const [loading, setLoading] = useState(true);

  const [selectedAttendance, setSelectedAttendance] =
    useState<AttendanceDay | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!user || !semester) {
        return;
      }

      await loadAttendanceHistory(user.uid, semester.id);

      setLoading(false);
    };

    loadData();
  }, []);

  const markedDates = attendanceHistory.reduce((acc, attendance) => {
    acc[attendance.date] = {
      marked: true,
      selected: true,
    };

    return acc;
  }, {} as any);

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId);

    return subject?.name || "Unknown Subject";
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Attendance History
        </Text>

        <Calendar markedDates={markedDates} />

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Recorded Days
        </Text>

        {attendanceHistory.length === 0 ? (
          <Text>No attendance records found</Text>
        ) : (
          attendanceHistory.map((attendance) => (
            <TouchableOpacity
              key={attendance.date}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 15,
                marginBottom: 10,
              }}
              onPress={() => {
                setSelectedAttendance(attendance);

                setModalVisible(true);
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {attendance.date}
              </Text>

              <Text>Periods: {attendance.periods.length}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView
          contentContainerStyle={{
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            Attendance Details
          </Text>

          {selectedAttendance && (
            <>
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                Date: {selectedAttendance.date}
              </Text>

              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 15,
                }}
              >
                Total Periods: {selectedAttendance.periods.length}
              </Text>

              {selectedAttendance.periods.map((period) => (
                <View
                  key={period.periodNumber}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 10,
                  }}
                >
                  <Text>Period {period.periodNumber}</Text>

                  <Text>Subject: {getSubjectName(period.subjectId)}</Text>

                  <Text>Status: {period.status}</Text>
                </View>
              ))}

              <Text
                style={{
                  marginTop: 15,
                  fontWeight: "bold",
                }}
              >
                Present:{" "}
                {
                  selectedAttendance.periods.filter(
                    (p) => p.status === "present",
                  ).length
                }
              </Text>

              <Text
                style={{
                  marginBottom: 20,
                  fontWeight: "bold",
                }}
              >
                Absent:{" "}
                {
                  selectedAttendance.periods.filter(
                    (p) => p.status === "absent",
                  ).length
                }
              </Text>
            </>
          )}

          <Button title="Close" onPress={() => setModalVisible(false)} />
        </ScrollView>
      </Modal>
    </>
  );
}
