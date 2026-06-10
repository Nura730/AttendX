import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";

import { BarChart } from "react-native-chart-kit";

import { useSemesterStore } from "../../store/semesterStore";


import { calculateAttendance } from "../../utils/attendance";

const screenWidth = Dimensions.get("window").width;

export default function AnalyticsScreen() {
  const semester = useSemesterStore(
    (state) => state.semester
  );

  const records: any[] = [];

  if (!semester) {
    return null;
  }

  const subjectData = semester.subjects.map(
    (subject) => {
      const stats = calculateAttendance(
        records,
        subject.id
      );

      return {
        name: subject.name,
        percentage: stats.percentage,
      };
    }
  );

  const chartData = {
    labels: subjectData.map((s) =>
      s.name.substring(0, 4)
    ),

    datasets: [
      {
        data: subjectData.map(
          (s) => s.percentage
        ),
      },
    ],
  };

  const bestSubject = [...subjectData].sort(
    (a, b) =>
      b.percentage - a.percentage
  )[0];

  const worstSubject = [...subjectData].sort(
    (a, b) =>
      a.percentage - b.percentage
  )[0];

  const overallAttendance =
    records.length === 0
      ? 0
      : (
          records.filter(
            (r) => r.status === "PRESENT"
          ).length /
          records.length
        ) *
        100;

  const projected =
    overallAttendance > 85
      ? "Excellent"
      : overallAttendance > 75
      ? "On Track"
      : "Critical";

  let streak = 0;

  for (let i = records.length - 1; i >= 0; i--) {
    if (records[i].status === "PRESENT") {
      streak++;
    } else {
      break;
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>
        📊 Analytics
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Overall Attendance
        </Text>

        <Text style={styles.bigText}>
          {overallAttendance.toFixed(1)}%
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Subject Comparison
        </Text>

        <BarChart
  data={chartData}
  width={screenWidth - 60}
  height={220}
  yAxisLabel=""
  yAxisSuffix="%"
          fromZero
          chartConfig={{
            backgroundGradientFrom:
              "#1E293B",

            backgroundGradientTo:
              "#1E293B",

            decimalPlaces: 1,

            color: (opacity = 1) =>
              `rgba(56,189,248,${opacity})`,

            labelColor: (
              opacity = 1
            ) =>
              `rgba(255,255,255,${opacity})`,
          }}
          style={{
            borderRadius: 12,
            marginTop: 10,
          }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          🏆 Insights
        </Text>

        <Text>
          Best Subject:{" "}
          {bestSubject?.name || "N/A"}
        </Text>

        <Text>
          Needs Attention:{" "}
          {worstSubject?.name || "N/A"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          🤖 Prediction
        </Text>

        <Text style={styles.bigText}>
          {projected}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          🔥 Current Streak
        </Text>

        <Text style={styles.bigText}>
          {streak} Classes
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },

  bigText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#38BDF8",
  },
});