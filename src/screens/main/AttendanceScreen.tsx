import React, { useState } from "react";

import {
  View,
  Text,
  Button,
  ScrollView,
  Alert,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { useSubjectStore } from "../../store/subjectStore";

interface PeriodEntry {
  subjectId: string;
  status: "present" | "absent";
}

export default function AttendanceScreen() {
  const subjects =
    useSubjectStore(
      (state) => state.subjects
    );

  const [periodCount, setPeriodCount] =
    useState(5);

  const [entries, setEntries] =
    useState<PeriodEntry[]>(
      Array.from(
        { length: 5 },
        () => ({
          subjectId: "",
          status: "present",
        })
      )
    );

  const generatePeriods = (
    count: number
  ) => {
    setPeriodCount(count);

    setEntries(
      Array.from(
        { length: count },
        () => ({
          subjectId: "",
          status: "present",
        })
      )
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

      <Text>
        Periods Today
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent:
            "space-between",
        }}
      >
        <Button
          title="-"
          onPress={() =>
            generatePeriods(
              Math.max(
                1,
                periodCount - 1
              )
            )
          }
        />

        <Text
          style={{
            fontSize: 22,
          }}
        >
          {periodCount}
        </Text>

        <Button
          title="+"
          onPress={() =>
            generatePeriods(
              periodCount + 1
            )
          }
        />
      </View>

      {entries.map(
        (
          entry,
          index
        ) => (
          <View
            key={index}
            style={{
              borderWidth: 1,
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Text>
              Period {index + 1}
            </Text>

            <Picker
              selectedValue={
                entry.subjectId
              }
              onValueChange={(
                value
              ) => {
                const copy = [
                  ...entries,
                ];

                copy[index]
                  .subjectId =
                  value;

                setEntries(
                  copy
                );
              }}
            >
              <Picker.Item
                label="Select Subject"
                value=""
              />

              {subjects.map(
                (
                  subject
                ) => (
                  <Picker.Item
                    key={
                      subject.id
                    }
                    label={
                      subject.name
                    }
                    value={
                      subject.id
                    }
                  />
                )
              )}
            </Picker>

            <Button
              title={
                entry.status ===
                "present"
                  ? "Present"
                  : "Absent"
              }
              onPress={() => {
                const copy = [
                  ...entries,
                ];

                copy[index]
                  .status =
                  entry.status ===
                  "present"
                    ? "absent"
                    : "present";

                setEntries(
                  copy
                );
              }}
            />
          </View>
        )
      )}

      <Button
        title="Save Attendance"
        onPress={() =>
          Alert.alert(
            "Next",
            "Save Logic Next"
          )
        }
      />
    </ScrollView>
  );
}