export type AttendanceStatus =
  | "present"
  | "absent";

export interface AttendancePeriod {
  periodNumber: number;

  subjectId: string;

  status: AttendanceStatus;
}

export interface AttendanceDay {
  date: string;

  periods: AttendancePeriod[];
}