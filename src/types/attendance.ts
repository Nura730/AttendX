export type AttendanceStatus =
  | "present"
  | "absent"
  | "cancelled";

export interface AttendanceRecord {
  id: string;

  subjectId: string;

  date: string;

  status: AttendanceStatus;
}