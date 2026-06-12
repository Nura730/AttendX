import {
  View,
  Text,
} from "react-native";

export default function SubjectCard({
  subject,
}: any) {
  const total =
    subject.attendedPeriods +
    subject.absentPeriods;

  const percentage =
    total === 0
      ? 0
      : (
          (subject.attendedPeriods /
            total) *
          100
        ).toFixed(1);

  return (
    <View>
      <Text>
        {subject.name}
      </Text>

      <Text>
        Faculty:
        {subject.facultyName}
      </Text>

      <Text>
        Present:
        {subject.attendedPeriods}
      </Text>

      <Text>
        Absent:
        {subject.absentPeriods}
      </Text>

      <Text>
        Attendance:
        {percentage}%
      </Text>
    </View>
  );
}