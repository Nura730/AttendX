export type AttendanceStatus =
  | "PRESENT"
  | "ABSENT"
  | "CANCELLED";

export interface AttendanceRecord {
  id: string;

  subjectId: string;

  periodNumber: number;

  date: string;

  status: AttendanceStatus;
}