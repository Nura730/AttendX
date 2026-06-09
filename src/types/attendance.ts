export type AttendanceStatus =
  | "present"
  | "absent"
  | "cancelled";

export interface AttendanceRecord {
  id: string;

  subjectId: string;

  periodNumber: number;

  date: string;

  status: AttendanceStatus;
}