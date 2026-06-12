import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { useAttendanceStore } from "../../store/attendanceStore";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native";

export default function CalendarScreen() {
  const records = useAttendanceStore(
    (state) => state.records
  );
  const [selectedDate, setSelectedDate] =
  useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );
  const markedDates: any = {};

  const selectedRecords = records.filter(
  (record) => record.date === selectedDate
);

  records.forEach((record) => {
  const color =
    record.status === "PRESENT"
      ? "green"
      : record.status === "ABSENT"
      ? "red"
      : "orange";

  if (!markedDates[record.date]) {
    markedDates[record.date] = {
      dots: [],
    };
  }

  markedDates[record.date].dots.push({
    key: record.id,
    color,
  });
});
if (selectedDate) {
  markedDates[selectedDate] = {
    ...(markedDates[selectedDate] || {}),
    selected: true,
    selectedColor: "#2563EB",
  };
}
  return (
  <ScrollView style={styles.container}>
    <Calendar
  markingType="multi-dot"
  markedDates={markedDates}
  onDayPress={(day) => {
    setSelectedDate(day.dateString);
  }}
/>

    <View style={styles.details}>
      <Text style={styles.title}>
        Attendance Records
      </Text>
      <Text>
  Selected Date: {selectedDate || "None"}
</Text>

      {selectedRecords.length === 0 ? (
  <Text>No attendance records found.</Text>
) : (
  selectedRecords.map((record) => (
    <View
  key={record.id}
  style={[
    styles.card,
    {
      borderLeftWidth: 5,
      borderLeftColor:
        record.status === "PRESENT"
          ? "#22C55E"
          : record.status === "ABSENT"
          ? "#EF4444"
          : "#F97316",
    },
  ]}
>
      <Text>
        Subject: {record.subjectId}
      </Text>

      <Text>
        Period: {record.periodNumber}
      </Text>

      <Text>
        Status: {record.status}
      </Text>

    </View>

    
  ))
)}
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "white",
},

  details: {
  padding: 16,
  backgroundColor: "#f3f3f3",
  minHeight: 200,
},

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#f3f3f3",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
});