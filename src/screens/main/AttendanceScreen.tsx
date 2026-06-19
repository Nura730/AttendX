import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Button,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";

import {
  Calendar,
} from "react-native-calendars";

import { useAuthStore } from "../../store/authStore";

import { useSemesterStore } from "../../store/semesterStore";

import { useAttendanceStore } from "../../store/attendanceStore";

export default function AttendanceScreen() {
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

  const loadAttendanceByDate =
    useAttendanceStore(
      (state) =>
        state.loadAttendanceByDate
    );

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const [selectedDate, setSelectedDate] =
    useState(today);

  const [calendarVisible, setCalendarVisible] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] =
    useState(false);

  useEffect(() => {
    if (
      !user ||
      !semester
    ) {
      return;
    }

    loadAttendanceHistory(
      user.uid,
      semester.id
    );
  }, []);

  useEffect(() => {
    checkAttendance(
      selectedDate
    );
  }, [selectedDate]);

  const checkAttendance =
    async (
      date: string
    ) => {
      if (
        !user ||
        !semester
      ) {
        return;
      }

      const attendance =
        await loadAttendanceByDate(
          date,
          user.uid,
          semester.id
        );

      setIsEditing(
        !!attendance
      );
    };

  const markedDates =
    attendanceHistory.reduce(
      (acc, item) => {
        acc[item.date] = {
          marked: true,
          selected:
            item.date ===
            selectedDate,
        };

        return acc;
      },
      {} as any
    );

  markedDates[selectedDate] = {
    selected: true,
  };

  const handleDateSelect =
    (
      date: string
    ) => {
      const todayDate =
        new Date(
          today
        );

      const selected =
        new Date(
          date
        );

      if (
        selected >
        todayDate
      ) {
        Alert.alert(
          "Error",
          "Future dates are not allowed"
        );

        return;
      }

      if (
        hasUnsavedChanges
      ) {
        Alert.alert(
          "Unsaved Changes",
          "Changes will be lost",
          [
            {
              text: "Cancel",
              style:
                "cancel",
            },
            {
              text:
                "Continue",
              onPress:
                () => {
                  setSelectedDate(
                    date
                  );

                  setHasUnsavedChanges(
                    false
                  );

                  setCalendarVisible(
                    false
                  );
                },
            },
          ]
        );

        return;
      }

      setSelectedDate(
        date
      );

      setCalendarVisible(
        false
      );
    };

  return (
    <ScrollView
      contentContainerStyle={{
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
        Attendance
      </Text>

      <Button
        title="📅 Select Date"
        onPress={() =>
          setCalendarVisible(
            true
          )
        }
      />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        Selected Date:
      </Text>

      <Text
        style={{
          fontSize: 18,
        }}
      >
        {selectedDate}
      </Text>

      <View
        style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {isEditing
            ? "Editing Attendance"
            : "Creating Attendance"}
        </Text>

        <Text>
          {selectedDate}
        </Text>
      </View>

      <Modal
        visible={
          calendarVisible
        }
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            paddingTop: 60,
          }}
        >
          <Calendar
            markedDates={
              markedDates
            }
            onDayPress={(
              day
            ) =>
              handleDateSelect(
                day.dateString
              )
            }
          />

          <TouchableOpacity
            style={{
              margin: 20,
            }}
            onPress={() =>
              setCalendarVisible(
                false
              )
            }
          >
            <Text
              style={{
                textAlign:
                  "center",
                fontSize: 18,
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}