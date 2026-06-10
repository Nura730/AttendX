import { AttendanceRecord } from "../types/attendance";

export const calculateAttendance = (
  records: AttendanceRecord[],
  subjectId: string,
) => {
  const subjectRecords = records.filter(
    (record) => record.subjectId === subjectId,
  );

  const attended = subjectRecords.filter(
    (record) => record.status === "present",
  ).length;

  const total = subjectRecords.filter(
    (record) => record.status !== "cancelled",
  ).length;

  const percentage = total === 0 ? 0 : (attended / total) * 100;

  return {
    attended,
    total,
    percentage,
  };
};

export const canMissClasses = (
  attended: number,
  total: number,
  target: number,
) => {
  let missed = 0;

  while (attended / (total + missed + 1) >= target / 100) {
    missed++;
  }

  return missed;
};

export const classesNeededToReachTarget = (
  attended: number,
  total: number,
  target: number,
) => {
  let required = 0;

  while (((attended + required) / (total + required)) * 100 < target) {
    required++;
  }

  return required;
};
