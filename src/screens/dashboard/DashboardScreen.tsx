import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import { useSemesterStore } from "../../store/semesterStore";
import { useAttendanceStore } from "../../store/attendanceStore";

import {
  calculateAttendance,
  canMissClasses,
  classesNeededToReachTarget,
} from "../../utils/attendance";

export default function DashboardScreen() {
  const semester = useSemesterStore(
    (state) => state.semester
  );

  const records = useAttendanceStore(
    (state) => state.records
  );

  if (!semester) {
    return null;
  }

  const totalPresent = records.filter(
    (r) => r.status === "PRESENT"
  ).length;

  const totalClasses = records.length;

  const overallAttendance =
    totalClasses === 0
      ? 0
      : (totalPresent / totalClasses) * 100;

  const subjectStats = semester.subjects.map(
    (subject) => ({
      subject,
      stats: calculateAttendance(
        records,
        subject.id
      ),
    })
  );

  const bestSubject = [...subjectStats].sort(
    (a, b) =>
      b.stats.percentage -
      a.stats.percentage
  )[0];

  const dangerSubjects = subjectStats.filter(
    (s) =>
      s.stats.percentage <
      semester.targetAttendance
  );

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text style={styles.title}>
        {semester.name}
      </Text>

      <Text style={styles.target}>
        Target Attendance:{" "}
        {semester.targetAttendance}%
      </Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>
          Overall Attendance
        </Text>

        <Text style={styles.heroPercentage}>
          {overallAttendance.toFixed(1)}%
        </Text>
      </View>

      <Text style={styles.subjectCount}>
        Subjects: {semester.subjects.length}
      </Text>

      {bestSubject && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🏆 Best Subject
          </Text>

          <Text>
            {bestSubject.subject.name}
          </Text>

          <Text>
            {bestSubject.stats.percentage.toFixed(
              1
            )}
            %
          </Text>
        </View>
      )}

      {dangerSubjects.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            ⚠️ Attention Required
          </Text>

          {dangerSubjects.map((item) => (
            <Text key={item.subject.id}>
              {item.subject.name} -{" "}
              {item.stats.percentage.toFixed(
                1
              )}
              %
            </Text>
          ))}
        </View>
      )}

      {semester.subjects.map((subject) => {
        const stats =
          calculateAttendance(
            records,
            subject.id
          );

        const canMiss = canMissClasses(
          stats.attended,
          stats.total,
          semester.targetAttendance
        );

        const needed =
          classesNeededToReachTarget(
            stats.attended,
            stats.total,
            semester.targetAttendance
          );

        const isSafe =
          stats.percentage >=
          semester.targetAttendance;

        return (
          <View
            key={subject.id}
            style={styles.subjectCard}
          >
            <Text style={styles.subjectName}>
              {subject.name}
            </Text>

            <View style={styles.progressBg}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(
                      stats.percentage,
                      100
                    )}%`,
                    backgroundColor: isSafe
                      ? "#22C55E"
                      : "#EF4444",
                  },
                ]}
              />
            </View>

            <Text>
              Attendance:{" "}
              {stats.percentage.toFixed(1)}%
            </Text>

            <Text>
              Present: {stats.attended}
            </Text>

            <Text>
              Total Classes: {stats.total}
            </Text>

            <Text>
              Can Miss: {canMiss}
            </Text>

            <Text>
              Need To Attend: {needed}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: isSafe
                  ? "green"
                  : "red",
                fontWeight: "bold",
              }}
            >
              {isSafe
                ? "SAFE ✅"
                : "DANGER ⚠️"}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  target: {
    marginBottom: 20,
  },

  subjectCount: {
    marginBottom: 20,
  },

  heroCard: {
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
  },

  heroTitle: {
    color: "#fff",
    fontSize: 18,
  },

  heroPercentage: {
    color: "#38BDF8",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 10,
  },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },

  subjectCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  subjectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  progressBg: {
    height: 8,
    backgroundColor: "#CBD5E1",
    borderRadius: 10,
    marginBottom: 12,
  },

  progressFill: {
    height: 8,
    borderRadius: 10,
  },
});