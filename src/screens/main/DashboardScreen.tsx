import React from "react";

import {
  View,
  Text,
  ScrollView,
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
      ? "0"
      : (
          (totalAttended /
            totalConducted) *
          100
        ).toFixed(1);

  const calculateNeedToAttend =
    (
      attended: number,
      total: number,
      target: number
    ) => {
      let x = 0;

      while (
        ((attended + x) /
          (total + x)) *
          100 <
        target
      ) {
        x++;
      }

      return x;
    };

  const calculateCanMiss =
    (
      attended: number,
      total: number,
      target: number
    ) => {
      let x = 0;

      while (
        total + x > 0 &&
        (attended /
          (total + x)) *
          100 >=
          target
      ) {
        x++;
      }

      return Math.max(
        0,
        x - 1
      );
    };

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
          borderRadius: 15,
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
            fontSize: 36,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {overallAttendance}%
        </Text>

        <Text>
          {totalAttended} /{" "}
          {totalConducted}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Subject Analytics
      </Text>

      {subjects.map(
        (subject) => {
          const percentage =
            subject.totalPeriods ===
            0
              ? 0
              : Number(
                  (
                    (subject.attendedPeriods /
                      subject.totalPeriods) *
                    100
                  ).toFixed(1)
                );

          const safe =
            percentage >=
            subject.targetAttendance;

          const canMiss =
            calculateCanMiss(
              subject.attendedPeriods,
              subject.totalPeriods,
              subject.targetAttendance
            );

          const needToAttend =
            calculateNeedToAttend(
              subject.attendedPeriods,
              subject.totalPeriods,
              subject.targetAttendance
            );

          return (
            <View
              key={subject.id}
              style={{
                borderWidth: 1,
                borderRadius: 12,
                padding: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {subject.name}
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

              {safe ? (
                <>
                  <Text>
                    Status:
                    {" "}
                    ✅ Safe
                  </Text>

                  <Text>
                    Can Miss:
                    {" "}
                    {canMiss}
                    {" "}
                    classes
                  </Text>
                </>
              ) : (
                <>
                  <Text>
                    Status:
                    {" "}
                    ⚠️ At Risk
                  </Text>

                  <Text>
                    Need To Attend:
                    {" "}
                    {needToAttend}
                    {" "}
                    classes
                  </Text>
                </>
              )}
            </View>
          );
        }
      )}
    </ScrollView>
  );
}