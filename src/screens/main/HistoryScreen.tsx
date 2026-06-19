import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Calendar } from "react-native-calendars";

import { useAuthStore } from "../../store/authStore";

import { useSemesterStore } from "../../store/semesterStore";

import { useAttendanceStore } from "../../store/attendanceStore";

export default function HistoryScreen() {
  const user = useAuthStore(
    (state) => state.user
  );

  const semester =
    useSemesterStore(
      (state) => state.semester
    );

  const attendanceHistory =
    useAttendanceStore(
      (state) =>
        state.attendanceHistory
    );

  const loadAttendanceHistory =
    useAttendanceStore(
      (state) =>
        state.loadAttendanceHistory
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadData =
      async () => {
        if (
          !user ||
          !semester
        ) {
          return;
        }

        await loadAttendanceHistory(
          user.uid,
          semester.id
        );

        setLoading(false);
      };

    loadData();
  }, []);

  const markedDates =
    attendanceHistory.reduce(
      (acc, attendance) => {
        acc[attendance.date] = {
          marked: true,
          selected: true,
        };

        return acc;
      },
      {} as any
    );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent:
            "center",
          alignItems:
            "center",
        }}
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  return (
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

      <Calendar
        markedDates={
          markedDates
        }
      />

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

      {attendanceHistory.length ===
      0 ? (
        <Text>
          No attendance
          records found
        </Text>
      ) : (
        attendanceHistory.map(
          (attendance) => (
            <TouchableOpacity
              key={
                attendance.date
              }
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 15,
                marginBottom: 10,
              }}
              onPress={() => {
                console.log(
                  attendance.date
                );
              }}
            >
              <Text
                style={{
                  fontWeight:
                    "bold",
                  fontSize: 16,
                }}
              >
                {
                  attendance.date
                }
              </Text>

              <Text>
                Periods:{" "}
                {
                  attendance
                    .periods
                    .length
                }
              </Text>
            </TouchableOpacity>
          )
        )
      )}
    </ScrollView>
  );
}