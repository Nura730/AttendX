import React from "react";

import {
  View,
  Text,
  ScrollView,
  Button,
  Alert,
} from "react-native";

import { useSubjectStore } from "../../store/subjectStore";

export default function DashboardScreen() {
  const subjects =
    useSubjectStore(
      (state) => state.subjects
    );

  const totalConducted =
    subjects.reduce(
      (sum, subject) =>
        sum + subject.totalPeriods,
      0
    );

  const totalAttended =
    subjects.reduce(
      (sum, subject) =>
        sum +
        subject.attendedPeriods,
      0
    );

  const overallAttendance =
    totalConducted === 0
      ? 0
      : (
          (totalAttended /
            totalConducted) *
          100
        ).toFixed(1);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 15,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Overall Attendance
        </Text>

        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          {overallAttendance}%
        </Text>

        <Text>
          {totalAttended} / {totalConducted}
        </Text>
      </View>

      <Button
        title="Mark Today's Attendance"
        onPress={() =>
          Alert.alert(
            "Next",
            "Attendance Screen"
          )
        }
      />

      <Button
        title="Attendance History"
        onPress={() =>
          Alert.alert(
            "Next",
            "History Screen"
          )
        }
      />

      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        Subjects
      </Text>

      {subjects.map(
        (subject) => {
          const percentage =
            subject.totalPeriods === 0
              ? 0
              : (
                  (subject.attendedPeriods /
                    subject.totalPeriods) *
                  100
                ).toFixed(1);

          return (
            <View
              key={subject.id}
              style={{
                borderWidth: 1,
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {subject.name}
              </Text>

              <Text>
                Attended:
                {" "}
                {
                  subject.attendedPeriods
                }
              </Text>

              <Text>
                Total:
                {" "}
                {
                  subject.totalPeriods
                }
              </Text>

              <Text>
                Attendance:
                {" "}
                {percentage}%
              </Text>

              <Text>
                Target:
                {" "}
                {
                  subject.targetAttendance
                }
                %
              </Text>
            </View>
          );
        }
      )}
    </ScrollView>
  );
}