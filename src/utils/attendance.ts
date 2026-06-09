import { AttendanceRecord } from "../types/attendance";

export const calculateAttendance = (
  records: AttendanceRecord[],
  subjectId: string
) => {
  const subjectRecords =
    records.filter(
      (record) =>
        record.subjectId === subjectId
    );

  const attended =
    subjectRecords.filter(
      (record) =>
        record.status === "present"
    ).length;

  const total =
    subjectRecords.filter(
      (record) =>
        record.status !== "cancelled"
    ).length;

  const percentage =
    total === 0
      ? 0
      : (attended / total) * 100;

  return {
    attended,
    total,
    percentage,
  };
};