import { useState } from "react";

import { View, Text, TextInput, Button, ScrollView } from "react-native";

import { Picker } from "@react-native-picker/picker";

import { useSemesterStore } from "../../store/semesterStore";

import { useAttendanceStore } from "../../store/attendanceStore";

export default function DailyAttendanceScreen() {
  const [periodCount, setPeriodCount] = useState("");

  const [periods, setPeriods] = useState<number[]>([]);

  const semester = useSemesterStore((state) => state.semester);

  const [dailyEntries, setDailyEntries] = useState<any[]>([]);

  const addAttendance = useAttendanceStore((state) => state.addAttendance);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      {!periods.length ? (
        <>
          <Text>Number of Periods Today</Text>

          <TextInput
            keyboardType="numeric"
            value={periodCount}
            onChangeText={setPeriodCount}
            style={{
              borderWidth: 1,
              padding: 10,
              marginVertical: 10,
            }}
          />

          <Button
            title="Generate"
            onPress={() => {
              const count = Number(periodCount);

              const generatedPeriods = Array.from(
                { length: count },
                (_, i) => ({
                  periodNumber: i + 1,

                  subjectId: semester?.subjects[0]?.id || "",

                  status: "present",
                }),
              );

              setPeriods(Array.from({ length: count }, (_, i) => i + 1));

              setDailyEntries(generatedPeriods);
            }}
          />
        </>
      ) : (
        <View>
          {dailyEntries.map((entry, index) => (
            <View
              key={index}
              style={{
                marginBottom: 20,
                borderWidth: 1,
                padding: 10,
              }}
            >
              <Text>Period {entry.periodNumber}</Text>

              <Text>Subject</Text>

              <Picker
                selectedValue={entry.subjectId}
                onValueChange={(value) => {
                  const updated = [...dailyEntries];

                  updated[index].subjectId = value;

                  setDailyEntries(updated);
                }}
              >
                {semester?.subjects.map((subject) => (
                  <Picker.Item
                    key={subject.id}
                    label={subject.name}
                    value={subject.id}
                  />
                ))}
              </Picker>

              <Text>Status</Text>

              <Picker
                selectedValue={entry.status}
                onValueChange={(value) => {
                  const updated = [...dailyEntries];

                  updated[index].status = value;

                  setDailyEntries(updated);
                }}
              >
                <Picker.Item label="Present" value="present" />

                <Picker.Item label="Absent" value="absent" />

                <Picker.Item label="Cancelled" value="cancelled" />
              </Picker>
            </View>
          ))}
        </View>
      )}
      <Button
        title="Save Day"
        onPress={() => {
          dailyEntries.forEach((entry) => {
            addAttendance(entry.subjectId, entry.periodNumber, entry.status);
          });

          <Button
  title="Save Day"
  onPress={() => {
    dailyEntries.forEach(
      (entry) => {
        addAttendance(
          entry.subjectId,
          entry.periodNumber,
          entry.status
        );
      }
    );

    alert(
      "Attendance Saved"
    );
  }}
/>
        }}
      />
    </ScrollView>
  );
}
