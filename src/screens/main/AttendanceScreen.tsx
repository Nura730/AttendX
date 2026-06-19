import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";

import {
  Calendar,
} from "react-native-calendars";

import { useAuthStore } from "../../store/authStore";
import { useSemesterStore } from "../../store/semesterStore";
import { useAttendanceStore } from "../../store/attendanceStore";
import { useSubjectStore } from "../../store/subjectStore";

import {
  AttendancePeriod,
} from "../../types/attendance";

export default function AttendanceScreen() {
  const user = useAuthStore(
    (state) => state.user
  );

  const semester =
    useSemesterStore(
      (state) => state.semester
    );

  const subjects =
    useSubjectStore(
      (state) => state.subjects
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

  const [
    selectedDate,
    setSelectedDate,
  ] = useState(today);

  const [
    calendarVisible,
    setCalendarVisible,
  ] = useState(false);

  const [
    isEditing,
    setIsEditing,
  ] = useState(false);

  const [
    hasUnsavedChanges,
    setHasUnsavedChanges,
  ] = useState(false);

  const [periods, setPeriods] =
    useState<
      AttendancePeriod[]
    >([]);

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
    loadAttendance(
      selectedDate
    );
  }, [selectedDate]);

  const loadAttendance =
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

      if (attendance) {
        setIsEditing(true);

        setPeriods(
          attendance.periods
        );
      } else {
        setIsEditing(false);

        setPeriods([
          {
            periodNumber: 1,
            subjectId: "",
            status: "present",
          },
        ]);
      }
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
      const selected =
        new Date(date);

      const todayDate =
        new Date(today);

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

      setSelectedDate(date);

      setCalendarVisible(
        false
      );
    };

  const addPeriod = () => {
    setPeriods([
      ...periods,
      {
        periodNumber:
          periods.length + 1,
        subjectId: "",
        status: "present",
      },
    ]);

    setHasUnsavedChanges(
      true
    );
  };

  const deletePeriod = (
    index: number
  ) => {
    const updated =
      periods
        .filter(
          (_, i) =>
            i !== index
        )
        .map(
          (
            period,
            idx
          ) => ({
            ...period,
            periodNumber:
              idx + 1,
          })
        );

    setPeriods(updated);

    setHasUnsavedChanges(
      true
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

      <Text>
        {selectedDate}
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
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {isEditing
            ? "Editing Attendance"
            : "Creating Attendance"}
        </Text>
      </View>

      {periods.map(
        (
          period,
          index
        ) => (
          <View
            key={index}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 15,
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight:
                  "bold",
              }}
            >
              Period{" "}
              {
                period.periodNumber
              }
            </Text>

            <Text>
              Subject
            </Text>

            <View
              style={{
                flexDirection:
                  "row",
                flexWrap:
                  "wrap",
                gap: 8,
              }}
            >
              {subjects.map(
                (
                  subject
                ) => (
                  <TouchableOpacity
                    key={
                      subject.id
                    }
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor:
                        period.subjectId ===
                        subject.id
                          ? "#2563eb"
                          : "#e5e7eb",
                    }}
                    onPress={() => {
                      const copy =
                        [
                          ...periods,
                        ];

                      copy[
                        index
                      ].subjectId =
                        subject.id;

                      setPeriods(
                        copy
                      );

                      setHasUnsavedChanges(
                        true
                      );
                    }}
                  >
                    <Text
                      style={{
                        color:
                          period.subjectId ===
                          subject.id
                            ? "white"
                            : "black",
                      }}
                    >
                      {
                        subject.name
                      }
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <Text>
              Status
            </Text>

            <View
              style={{
                flexDirection:
                  "row",
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor:
                    period.status ===
                    "present"
                      ? "green"
                      : "#e5e7eb",
                }}
                onPress={() => {
                  const copy =
                    [
                      ...periods,
                    ];

                  copy[
                    index
                  ].status =
                    "present";

                  setPeriods(
                    copy
                  );

                  setHasUnsavedChanges(
                    true
                  );
                }}
              >
                <Text
                  style={{
                    textAlign:
                      "center",
                    color:
                      period.status ===
                      "present"
                        ? "white"
                        : "black",
                  }}
                >
                  Present
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor:
                    period.status ===
                    "absent"
                      ? "red"
                      : "#e5e7eb",
                }}
                onPress={() => {
                  const copy =
                    [
                      ...periods,
                    ];

                  copy[
                    index
                  ].status =
                    "absent";

                  setPeriods(
                    copy
                  );

                  setHasUnsavedChanges(
                    true
                  );
                }}
              >
                <Text
                  style={{
                    textAlign:
                      "center",
                    color:
                      period.status ===
                      "absent"
                        ? "white"
                        : "black",
                  }}
                >
                  Absent
                </Text>
              </TouchableOpacity>
            </View>

            {periods.length >
              1 && (
              <Button
                title="Delete Period"
                onPress={() =>
                  deletePeriod(
                    index
                  )
                }
              />
            )}
          </View>
        )
      )}

      <Button
        title="+ Add Period"
        onPress={addPeriod}
      />

      <Button
        title="Save Attendance"
        onPress={() =>
          Alert.alert(
            "Next",
            "Save Logic Phase 3"
          )
        }
      />

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

          <Button
            title="Close"
            onPress={() =>
              setCalendarVisible(
                false
              )
            }
          />
        </View>
      </Modal>
    </ScrollView>
  );
}